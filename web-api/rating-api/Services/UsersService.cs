using rating_api.Interfaces.Infrastructure;
using rating_api.Interfaces.Repositories;
using rating_api.Interfaces.Services;
using rating_api.Models;

namespace rating_api.Services
{
    public class UsersService : IUsersService
    {
        private readonly IUsersRepository _usersRepository;
        private readonly IPasswordHasher _passwordHasher;
        private readonly IJwtProvider _jwtProvider;

        public UsersService(IUsersRepository usersRepository, IPasswordHasher passwordHasher, IJwtProvider jwtProvider)
        {
            _usersRepository = usersRepository;
            _passwordHasher = passwordHasher;
            _jwtProvider = jwtProvider;
        }

        public async Task<Guid> Register(User user)
        {
            var hashedPassword = _passwordHasher.Generate(user.Password);

            var userPassWithHash = User.Create(user.Id, user.Username, user.Login, hashedPassword, user.DateOfCreate);

            return await _usersRepository.Add(userPassWithHash);
        }

        public async Task<string> Login(string login, string password)
        {
            var user = await _usersRepository.GetByLogin(login);

            var result = _passwordHasher.Verify(password, user.Password);

            if (!result)
            {
                throw new Exception("Failed to login");
            }

            var token = _jwtProvider.GenerateToken(user);

            return token;
        }

        public async Task<User> GetInformation(Guid id)
        {
            var user = await _usersRepository.GetById(id);

            return user;
        }
    }
}
