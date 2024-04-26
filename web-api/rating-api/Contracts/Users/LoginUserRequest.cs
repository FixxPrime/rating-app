using System.ComponentModel.DataAnnotations;

namespace rating_api.Contracts.Users
{
    public record LoginUserRequest(
        [Required] string Login,
        [Required] string Password
        );
}
