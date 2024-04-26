using System.ComponentModel.DataAnnotations;

namespace rating_api.Contracts.Cards
{
    public record CardsFilterRequest(
        string? Query,
        Guid? IdDepartment
        );
}
