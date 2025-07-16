using System.Data;
using Dapper;
using AuthApi.Models;
using Microsoft.AspNetCore.Identity;
using MySql.Data.MySqlClient;
using AuthApi.Security;

namespace AuthApi.Services
{
    public interface IUserLoginService
    {
        IEnumerable<UserLogin> GetAll();
        UserLogin? GetById(int id);
        void Create(UserLogin user);
        void Update(UserLogin user);
        void Delete(int id);
        LoginResponse? Authenticate(LoginRequest request);
    }

    public class UserLoginService : IUserLoginService
    {
        private readonly IConfiguration _configuration;
        private readonly PasswordHasher<UserLogin> _hasher;

        public UserLoginService(IConfiguration configuration)
        {
            _configuration = configuration;
            _hasher = new PasswordHasher<UserLogin>();
        }

        private IDbConnection Connection =>
            new MySqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        public IEnumerable<UserLogin> GetAll()
        {
            using var db = Connection;

            return db.Query<UserLogin>("SELECT * FROM users_login");
        }

        public UserLogin? GetById(int id)
        {
            using var db = Connection;
            return db.QueryFirstOrDefault<UserLogin>(
                "SELECT * FROM users_login WHERE Id = @Id", new { Id = id });
        }

        public void Create(UserLogin user)
        {
            user.Password = _hasher.HashPassword(user, user.Password);
            using var db = Connection;
            db.Execute(@"INSERT INTO users_login (Username, Email, Password, created_at, is_active)
                         VALUES (@Username, @Email, @Password, NOW(), @IsActive)", user);
        }

        public void Update(UserLogin user)
        {
            if (!string.IsNullOrWhiteSpace(user.Password))
            {
                user.Password = _hasher.HashPassword(user, user.Password);
            }

            using var db = Connection;
            db.Execute(@"UPDATE users_login 
                         SET Username = @Username, Email = @Email, Password = @Password, is_active = @IsActive
                         WHERE Id = @Id", user);
        }

        public void Delete(int id)
        {
            using var db = Connection;
            db.Execute("DELETE FROM users_login WHERE Id = @Id", new { Id = id });
        }

        public LoginResponse? Authenticate(LoginRequest request)
        {
            using var db = Connection;

            var user = db.QueryFirstOrDefault<UserLogin>(
                "SELECT * FROM users_login WHERE Username = @ue OR Email = @ue",
                new { ue = request.UsernameOrEmail });

            if (user == null )
                return null;

            var result = _hasher.VerifyHashedPassword(user, user.Password, request.Password);

            Console.WriteLine($"Password verification result: {result}");
            Console.WriteLine($"User: {user.Username}, Active: {user.IsActive}");
            
            if (result != PasswordVerificationResult.Success)
                return null;


            db.Execute("UPDATE users_login SET last_login = NOW() WHERE Id = @Id", new { user.Id });

            var token = JwtTokenGenerator.GenerateToken(user.Username, "user");

            return new LoginResponse
            {
                Token = token,
                Username = user.Username,
                Email = user.Email
            };
        }

    }
}
