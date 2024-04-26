using System.ComponentModel.DataAnnotations;

namespace rating_api.Contracts.Cards
{
    public record CardsRequest(
        [Required] string Surname,
        [Required] string Name,
        string Patronymic,
        [Required] string Phone,
        [Required] DateTime Birthday,
        [Required] uint Position,
        [Required] Guid DepartmentID
        );
}
