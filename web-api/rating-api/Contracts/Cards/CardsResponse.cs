using rating_api.Models;
using System.Numerics;
using System.Xml.Linq;

namespace rating_api.Contracts.Cards
{
    public record CardsResponse(
        Guid Id,
        string Surname,
        string Name,
        string Patronymic,
        string Phone,
        DateTime Birthday,
        uint Position,
        Guid DepartmentId
        );
}