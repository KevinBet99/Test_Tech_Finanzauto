using AuthApi.Models;
using AuthApi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace AuthApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
    public class VehiclesController : ControllerBase
    {
        private readonly IVehicleService _vehicleService;

        public VehiclesController(IVehicleService vehicleService)
        {
            _vehicleService = vehicleService;
        }

        [HttpGet]
        
        public IActionResult GetAll() => Ok(_vehicleService.GetAll());

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var vehicle = _vehicleService.GetById(id);
            if (vehicle == null)
                return NotFound();
            return Ok(vehicle);
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create([FromBody] Vehicles vehicle)
        {
            _vehicleService.Create(vehicle);
            // Asegúrate de que vehicle.Id tenga el valor generado por la base de datos
            return Ok(new { id = vehicle.Id, data = vehicle });
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Update(int id, [FromBody] Vehicles vehicle)
        {
            var existing = _vehicleService.GetById(id);
            if (existing == null)
                return NotFound();

            vehicle.Id = id;
            _vehicleService.Update(vehicle);
            return Ok(new { message = "Vehicle updated successfully" });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var existing = _vehicleService.GetById(id);
            if (existing == null)
                return NotFound();

            _vehicleService.Delete(id);
            return Ok(new { message = "Vehicle deleted successfully" });
        }
    }
}
