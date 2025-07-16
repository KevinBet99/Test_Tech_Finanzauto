using AuthApi.Models;
using AuthApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class ImageVehicleController : ControllerBase
    {
        private readonly ImageVehicleService _service;

        public ImageVehicleController(ImageVehicleService service)
        {
            _service = service;
        }

        [HttpGet]
        
        public IActionResult GetAll()
        {
            return Ok(_service.GetAll());
        }

        [HttpGet("by-vehicle/{vehicleId}")]
        
        public IActionResult GetByVehicleId(int vehicleId)
        {
            var images = _service.GetByVehicleId(vehicleId);

            if (!images.Any())
            {
                return NotFound(new { message = "No images found for this vehicle." });
            }

            return Ok(images);
        }

        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetById(int id)
        {
            var result = _service.GetById(id);
            return result != null ? Ok(result) : NotFound();
        }

        [HttpPost]
        [Authorize]
        public IActionResult Create([FromBody] ImageVehicle image)
        {
            _service.Create(image);
            return Ok(new { message = "Image created" });
        }

        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Update(int id, [FromBody] ImageVehicle image)
        {
            image.Id = id;
            _service.Update(image);
            return Ok(new { message = "Image updated" });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            _service.Delete(id);
            return Ok(new { message = "Image deleted" });
        }





    }
}
