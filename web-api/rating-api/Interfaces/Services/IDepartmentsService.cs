using rating_api.Models;

namespace rating_api.Interfaces.Services
{
    public interface IDepartmentsService
    {
        Task<List<Department>> GetAllDepartments();
        Task<Department> GetDepartment(Guid id);
        Task<Guid> CreateDepartment(Department department);
    }
}