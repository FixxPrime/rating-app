using rating_api.Models;

namespace rating_api.Interfaces.Infrastructure
{
    public interface IJwtProvider
    {
        string GenerateToken(User user);
    }
}