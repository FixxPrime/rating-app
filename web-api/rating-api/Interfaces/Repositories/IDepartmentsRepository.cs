using rating_api.Models;

namespace rating_api.Interfaces.Repositories
{
    public interface IDepartmentsRepository
    {
        Task<List<Department>> GetAll();
        Task<Department> Get(Guid id);
        Task<Guid> Add(Department department);
    }
}