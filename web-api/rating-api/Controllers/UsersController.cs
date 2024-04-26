using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rating_api.Contracts.Users;
using rating_api.Interfaces.Services;
using rating_api.Models;
using rating_api.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace rating_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly IUsersService _usersService;

        public UsersController(IUsersService usersService)
        {
            _usersService = usersService;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult> Register([FromBody] RegisterUserRequest request)
        {
            var (user, error) = Models.User.CreateWithValidation(
                Guid.NewGuid(),
                request.Username,
                request.Login,
                request.Password);

            if (error != null)
            {
                return BadRequest(error);
            }

            await _usersService.Register(user);

            return Ok();
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult> Login([FromBody] LoginUserRequest request)
        {
            var token = await _usersService.Login(request.Login, request.Password);

            return Ok(token);
        }

        [HttpGet("getInformation")]
        [Authorize]
        public async Task<ActionResult<UserResponse>> GetInformation()
        {
            var userIdClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "userId")?.Value;

            var user = await _usersService.GetInformation(new Guid(userIdClaim));

            var response = new UserResponse(
                    user.Username,
                    user.DateOfCreate
                );

            return Ok(response);
        }
    }
}
