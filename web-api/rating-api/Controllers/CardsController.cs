using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rating_api.Contracts.Cards;
using rating_api.Entities;
using rating_api.Interfaces.Services;
using rating_api.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace rating_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CardsController : Controller
    {
        private readonly ICardsService _cardsService;

        public CardsController(ICardsService cardsService)
        {
            _cardsService = cardsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<CardsResponse>>> GetCards()
        {
            var cards = await _cardsService.GetAllCards();

            var response = cards.Select(c => new CardsResponse(c.Id, c.Surname, c.Name, c.Patronymic, c.Phone, c.Birthday, c.Position, c.DepartmentID));

            return Ok(response);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<ActionResult<CardsResponse>> GetCard([FromRoute] Guid id)
        {
            var card = await _cardsService.GetCard(id);

            var response = new CardsResponse(
                card.Id,
                card.Surname,
                card.Name,
                card.Patronymic,
                card.Phone,
                card.Birthday,
                card.Position,
                card.DepartmentID
            );

            return Ok(response);
        }

        [HttpGet]
        [Route("filter")]
        public async Task<ActionResult<List<CardsResponse>>> GetCardsByFilter([FromQuery] CardsFilterRequest request)
        {
            var searchTerms = !string.IsNullOrEmpty(request.Query)
                ? request.Query.Split(" ", StringSplitOptions.RemoveEmptyEntries)
                : Array.Empty<string>();

            Guid idDepartment = request.IdDepartment.HasValue ? request.IdDepartment.Value : Guid.Empty;

            var cards = await _cardsService.GetByFilter(searchTerms, idDepartment);

            var response = cards.Select(c => new CardsResponse(c.Id, c.Surname, c.Name, c.Patronymic, c.Phone, c.Birthday, c.Position, c.DepartmentID));

            return Ok(response);
        }

        [HttpPut]
        [Route("{id:Guid}")]
        [Authorize]
        public async Task<ActionResult<Guid>> UpdateCard(Guid id, [FromBody] CardsRequest request)
        {
            var (card, error) = Card.CreateWithValidation(
                id,
                request.Surname,
                request.Name,
                request.Patronymic,
                request.Phone,
                request.Birthday,
                request.Position,
                request.DepartmentID);

            if (error != null)
            {
                return BadRequest(error);
            }

            var cardId = await _cardsService.UpdateCard(id, card);

            return Ok(cardId);
        }

        [HttpPut]
        [Route("up/{id:Guid}")]
        [Authorize]
        public async Task<ActionResult<Guid>> UpCard(Guid id)
        {
            var card = await _cardsService.GetCard(id);

            var cardModel = Card.UpPositionCard(card);

            var cardId = await _cardsService.UpdateCard(id, cardModel);

            return Ok(cardId);
        }

        [HttpPut]
        [Route("down/{id:Guid}")]
        [Authorize]
        public async Task<ActionResult<Guid>> DownCard(Guid id)
        {
            var card = await _cardsService.GetCard(id);

            var (cardModel, error) = Card.DownPositionCard(card);

            if (error != null)
            {
                return BadRequest(error);
            }

            var cardId = await _cardsService.UpdateCard(id, cardModel);

            return Ok(cardId);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Guid>> CreateCard([FromBody] CardsRequest request)
        {
            var (card, error) = Card.CreateWithValidation(
                Guid.NewGuid(),
                request.Surname,
                request.Name,
                request.Patronymic,
                request.Phone,
                request.Birthday,
                request.Position,
                request.DepartmentID);

            if(error != null)
            {
                return BadRequest(error);
            }

            var cardId = await _cardsService.AddCard(card);

            return Ok(cardId);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        [Authorize]
        public async Task<ActionResult<Guid>> DeleteCard([FromRoute] Guid id)
        {
            var cardId = await _cardsService.DeleteCard(id);

            return Ok(cardId);
        }
    }
}
