using System.ComponentModel.DataAnnotations;

namespace rating_api.Contracts.Users
{
    public record RegisterUserRequest(
        [Required] string Username,
        [Required] string Login,
        [Required] string Password
        );
}
