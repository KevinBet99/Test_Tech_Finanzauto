using System.Data;
using AuthApi.Models;
using Dapper;
using MySql.Data.MySqlClient;

namespace AuthApi.Services
{
    public class ImageVehicleService
    {
        private readonly IConfiguration _configuration;

        public ImageVehicleService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private IDbConnection Connection => new MySqlConnection(_configuration.GetConnectionString("DefaultConnection"));

        public IEnumerable<ImageVehicle> GetAll()
        {
            using var db = Connection;
            return db.Query<ImageVehicle>("SELECT * FROM images_vehicles");
        }

         public IEnumerable<ImageVehicle> GetByVehicleId(int vehicleId)
        {
            using var db = Connection;
            return db.Query<ImageVehicle>(
                "SELECT * FROM images_vehicles WHERE VehicleId = @VehicleId",
                new { VehicleId = vehicleId });
        }

        public ImageVehicle? GetById(int id)
        {
            using var db = Connection;
            return db.QueryFirstOrDefault<ImageVehicle>("SELECT * FROM images_vehicles WHERE Id = @Id", new { Id = id });
        }

        public void Create(ImageVehicle image)
        {
            using var db = Connection;
            db.Execute(@"INSERT INTO images_vehicles (VehicleId, ImageUrl, CreatedAt)
                         VALUES (@VehicleId, @ImageUrl, NOW())", image);
        }

        public void Update(ImageVehicle image)
        {
            using var db = Connection;
            db.Execute(@"UPDATE images_vehicles 
                         SET VehicleId = @VehicleId, ImageUrl = @ImageUrl
                         WHERE Id = @Id", image);
        }
        

        public void Delete(int id)
        {
            using var db = Connection;
            db.Execute("DELETE FROM images_vehicles WHERE Id = @Id", new { Id = id });
        }




    }
}
