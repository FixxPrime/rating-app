using rating_api.Models;

namespace rating_api.Interfaces.Repositories
{
    public interface IUsersRepository
    {
        Task<Guid> Add(User user);
        Task<User> GetByLogin(string login);
        Task<User> GetById(Guid login);
    }
}