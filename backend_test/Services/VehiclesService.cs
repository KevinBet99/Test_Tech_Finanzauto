using AuthApi.Models;
using System.Data;
using Dapper;
using MySql.Data.MySqlClient;

namespace AuthApi.Services
{
    public interface IVehicleService
    {
        IEnumerable<Vehicles> GetAll();
        Vehicles? GetById(int id);
        void Create(Vehicles vehicle);
        void Update(Vehicles vehicle);
        void Delete(int id);
    }

    public class VehicleService : IVehicleService
    {
        private readonly IConfiguration _configuration;

        public VehicleService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private IDbConnection Connection =>
            new MySqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        public IEnumerable<Vehicles> GetAll()
        {
            using var db = Connection;
            return db.Query<Vehicles>("SELECT * FROM vehicles");
        }

        public Vehicles? GetById(int id)
        {
            using var db = Connection;
            return db.QueryFirstOrDefault<Vehicles>(
                "SELECT * FROM vehicles WHERE Id = @Id", new { Id = id });
        }

        public void Create(Vehicles vehicle)
        {
            using var db = Connection;
            var id = db.ExecuteScalar<int>(
                @"INSERT INTO vehicles 
            (Plate, Color, Brand, Model, Year, Km, Value, Observations, Stage)
          VALUES
            (@Plate, @Color, @Brand, @Model, @Year, @Km, @Value, @Observations, @Stage);
          SELECT LAST_INSERT_ID();",
                vehicle
            );
            vehicle.Id = id;
        }
        public void Update(Vehicles vehicle)
        {
            using var db = Connection;
            db.Execute(@"UPDATE vehicles SET
                         Plate = @Plate, Color = @Color, Brand = @Brand, Model = @Model, Year = @Year,
                         Km = @Km, Value = @Value, Observations = @Observations, Stage = @Stage
                         WHERE Id = @Id", vehicle);
        }

        public void Delete(int id)
        {
            using var db = Connection;
            db.Execute("DELETE FROM vehicles WHERE Id = @Id", new { Id = id });
        }
    }
}
