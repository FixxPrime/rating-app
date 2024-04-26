using rating_api.Models;

namespace rating_api.Interfaces.Repositories
{
    public interface ICardsRepository
    {
        Task<Guid> Add(Card card);
        Task<Guid> Delete(Guid id);
        Task<Card> Get(Guid id);
        Task<List<Card>> GetAll();
        Task<Guid> Update(Guid id, Card updatedCard);
        Task<List<Card>> GetByFilter(string[] searchTerms, Guid idDepartment);
    }
}