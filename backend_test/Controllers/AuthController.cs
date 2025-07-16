using Microsoft.AspNetCore.Mvc;
using AuthApi.Models;
using AuthApi.Security;

namespace AuthApi.Controllers
{
    [ApiController]
    [Route("api")]
    public class AuthController : ControllerBase
    {
        [HttpPost("auth")]
        public IActionResult Login([FromBody] LoginApiRequest request)
{
    var envUser = Environment.GetEnvironmentVariable("LOGIN_USER");
    var envPass = Environment.GetEnvironmentVariable("LOGIN_PASS");

    if (request.Username == envUser && request.Password == envPass)
    {
        var token = JwtTokenGenerator.GenerateToken(request.Username, "Admin");
        return Ok(new { token });
    }

    return Unauthorized(new {
        success = false,
         message = "Invalid Credentials" });
}
    }
}
