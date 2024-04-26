using rating_api.Models;

namespace rating_api.Interfaces.Services
{
    public interface IUsersService
    {
        Task<Guid> Register(User user);
        Task<string> Login(string login, string password);
        Task<User> GetInformation(Guid id);
    }
}