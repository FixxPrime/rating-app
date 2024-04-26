using Microsoft.EntityFrameworkCore;
using rating_api.Data;
using rating_api.Entities;
using rating_api.Interfaces.Repositories;
using rating_api.Models;
using System.Diagnostics.Eventing.Reader;

namespace rating_api.Repositories
{
    public class CardsRepository : ICardsRepository
    {
        private readonly DatabaseContext _dbContext;
        public CardsRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Card>> GetAll()
        {
            var cardEntities = await _dbContext.Cards
                .AsNoTracking()
                .OrderBy(x => x.Position)
                .ToListAsync();

            var cards = cardEntities
                .Select(c => Card.Create(c.Id, c.Surname, c.Name, c.Patronymic, c.Phone, c.Birthday, c.Position, c.DepartmentID))
                .ToList();

            return cards;
        }

        public async Task<Card> Get(Guid id)
        {
            var cardEntity = await _dbContext.Cards
                .AsNoTracking()
                .FirstOrDefaultAsync(c => c.Id == id)
                    ?? throw new Exception();

            var card = Card.Create(cardEntity.Id, cardEntity.Surname, cardEntity.Name, cardEntity.Patronymic, cardEntity.Phone, cardEntity.Birthday, cardEntity.Position, cardEntity.DepartmentID);

            return card;
        }

        public async Task<Guid> Add(Card card)
        {
            var cardEntity = new CardEntity
            {
                Id = card.Id,
                Surname = card.Surname,
                Name = card.Name,
                Patronymic = card.Patronymic,
                Phone = card.Phone,
                Birthday = card.Birthday,
                Position = card.Position,
                DepartmentID = card.DepartmentID
            };

            await _dbContext.Cards.AddAsync(cardEntity);
            await _dbContext.SaveChangesAsync();

            return card.Id;
        }

        public async Task<Guid> Update(Guid id, Card updatedCard)
        {
            await _dbContext.Cards
                .Where(c => c.Id == id)
                .ExecuteUpdateAsync(s => s
                    .SetProperty(c => c.Surname, c => updatedCard.Surname)
                    .SetProperty(c => c.Name, c => updatedCard.Name)
                    .SetProperty(c => c.Patronymic, c => updatedCard.Patronymic)
                    .SetProperty(c => c.Phone, c => updatedCard.Phone)
                    .SetProperty(c => c.Birthday, c => updatedCard.Birthday)
                    .SetProperty(c => c.Position, c => updatedCard.Position)
                    .SetProperty(c => c.DepartmentID, c => updatedCard.DepartmentID));

            return updatedCard.Id;
        }

        public async Task<Guid> Delete(Guid id)
        {
            await _dbContext.Cards
                .Where(c => c.Id == id)
                .ExecuteDeleteAsync();

            return id;
        }

        public async Task<List<Card>> GetByFilter(string[] searchTerms, Guid idDepartment)
        {
            var query = _dbContext.Cards.AsNoTracking();

            if (!(idDepartment == Guid.Empty))
            {
                query = query.Where(c => c.DepartmentID == idDepartment);
            }

            if (searchTerms.Length > 0)
            {
                foreach (var term in searchTerms)
                {
                    string searchTerm = term.ToLower(); // приводим к нижнему регистру для сравнения
                    query = query.Where(c =>
                        c.Name.ToLower().Contains(searchTerm) ||
                        c.Surname.ToLower().Contains(searchTerm) ||
                        c.Patronymic.ToLower().Contains(searchTerm)
                    );
                }
            }

            var cardEntities = await query.OrderBy(x => x.Position).ToListAsync();

            var cards = cardEntities
                .Select(c => Card.Create(c.Id, c.Surname, c.Name, c.Patronymic, c.Phone, c.Birthday, c.Position, c.DepartmentID))
                .ToList();

            return cards;
        }
    }
}
