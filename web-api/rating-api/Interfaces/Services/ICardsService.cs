using rating_api.Models;

namespace rating_api.Interfaces.Services
{
    public interface ICardsService
    {
        Task<Guid> AddCard(Card card);
        Task<Guid> DeleteCard(Guid id);
        Task<List<Card>> GetAllCards();
        Task<Card> GetCard(Guid id);
        Task<Guid> UpdateCard(Guid id, Card card);
        Task<List<Card>> GetByFilter(string[] terms, Guid id);
    }
}