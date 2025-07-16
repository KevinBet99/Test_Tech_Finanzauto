using AuthApi.Models;
using AuthApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AuthApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersLoginController : ControllerBase
    {
        private readonly IUserLoginService _userLoginService;

        public UsersLoginController(IUserLoginService userLoginService)
        {
            _userLoginService = userLoginService;
        }

        // GET: api/userslogin
        [HttpGet]
        [Authorize]
        public IActionResult GetAll()
        {
            var users = _userLoginService.GetAll();
            return Ok(users);
        }

        // GET: api/userslogin/5
        [HttpGet("{id}")]
        [Authorize]
        public IActionResult GetById(int id)
        {
            var user = _userLoginService.GetById(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        // POST: api/userslogin
        [HttpPost]
        public IActionResult Create([FromBody] UserLogin user)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            _userLoginService.Create(user);
            return Ok(new { message = "Usuario creado correctamente." });
        }

        // PUT: api/userslogin/5
        [HttpPut("{id}")]
        [Authorize]
        public IActionResult Update(int id, [FromBody] UserLogin user)
        {
            if (id != user.Id)
                return BadRequest("El ID no coincide con el objeto.");

            var existingUser = _userLoginService.GetById(id);
            if (existingUser == null)
                return NotFound();

            _userLoginService.Update(user);
            return Ok(new { message = "Usuario actualizado correctamente." });
        }

        // DELETE: api/userslogin/5
        [HttpDelete("{id}")]
        [Authorize]
        public IActionResult Delete(int id)
        {
            var user = _userLoginService.GetById(id);
            if (user == null)
                return NotFound();

            _userLoginService.Delete(id);
            return Ok(new { message = "Usuario eliminado correctamente." });
        }
        // POST: api/userslogin/authenticate
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] LoginRequest request)
        {
            var result = _userLoginService.Authenticate(request);

            Console.WriteLine($"Request: {request.UsernameOrEmail}, {request.Password}");
            Console.WriteLine($"Result: {result}");

            if (result == null)
            {
                return Unauthorized(new { message = "Credenciales inválidas o usuario inactivo." });
            }
            
            return Ok(result);
        }
        
    }
}
