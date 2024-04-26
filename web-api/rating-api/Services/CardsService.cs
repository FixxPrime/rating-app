using rating_api.Interfaces.Repositories;
using rating_api.Interfaces.Services;
using rating_api.Models;

namespace rating_api.Services
{
    public class CardsService : ICardsService
    {
        private readonly ICardsRepository _cardsRepository;

        public CardsService(ICardsRepository cardsRepository)
        {
            _cardsRepository = cardsRepository;
        }

        public async Task<List<Card>> GetAllCards()
        {
            return await _cardsRepository.GetAll();
        }

        public async Task<Card> GetCard(Guid id)
        {
            return await _cardsRepository.Get(id);
        }

        public async Task<Guid> AddCard(Card card)
        {
            return await _cardsRepository.Add(card);
        }

        public async Task<Guid> UpdateCard(Guid id, Card card)
        {
            return await _cardsRepository.Update(id, card);
        }

        public async Task<Guid> DeleteCard(Guid id)
        {
            return await _cardsRepository.Delete(id);
        }

        public async Task<List<Card>> GetByFilter(string[] terms, Guid id)
        {
            return await _cardsRepository.GetByFilter(terms, id);
        }
    }
}
