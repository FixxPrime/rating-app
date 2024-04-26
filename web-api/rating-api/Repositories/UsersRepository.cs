using Microsoft.EntityFrameworkCore;
using rating_api.Data;
using rating_api.Entities;
using rating_api.Interfaces.Repositories;
using rating_api.Models;

namespace rating_api.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly DatabaseContext _dbContext;
        public UsersRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Guid> Add(User user)
        {
            var userEntity = new UserEntity
            {
                Id = user.Id,
                Username = user.Username,
                Login = user.Login,
                Password = user.Password,
                DateOfCreate = user.DateOfCreate,
            };

            await _dbContext.Users.AddAsync(userEntity);
            await _dbContext.SaveChangesAsync();

            return user.Id;
        }

        public async Task<User> GetByLogin(string login)
        {
            var userEntity = await _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Login == login)
                    ?? throw new Exception();

            var user = User.Create(userEntity.Id, userEntity.Username, userEntity.Login, userEntity.Password, userEntity.DateOfCreate);

            return user;
        }

        public async Task<User> GetById(Guid id)
        {
            var userEntity = await _dbContext.Users
                .AsNoTracking()
                .FirstOrDefaultAsync(u => u.Id == id)
                    ?? throw new Exception();

            var user = User.Create(userEntity.Id, userEntity.Username, userEntity.Login, userEntity.Password, userEntity.DateOfCreate);

            return user;
        }
    }
}
