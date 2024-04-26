using System.ComponentModel.DataAnnotations;

namespace rating_api.Contracts.Departments
{
    public record DepartmentRequest(
        [Required] string Name
        );
}
