using rating_api.Interfaces.Repositories;
using rating_api.Interfaces.Services;
using rating_api.Models;
using rating_api.Repositories;

namespace rating_api.Services
{
    public class DepartmentsService : IDepartmentsService
    {
        private readonly IDepartmentsRepository _departmentsRepository;

        public DepartmentsService(IDepartmentsRepository departmentsRepository)
        {
            _departmentsRepository = departmentsRepository;
        }

        public async Task<List<Department>> GetAllDepartments()
        {
            return await _departmentsRepository.GetAll();
        }

        public async Task<Department> GetDepartment(Guid id)
        {
            return await _departmentsRepository.Get(id);
        }

        public async Task<Guid> CreateDepartment(Department department)
        {
            return await _departmentsRepository.Add(department);
        }
    }
}
