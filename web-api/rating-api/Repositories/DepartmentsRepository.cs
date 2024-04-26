using Microsoft.EntityFrameworkCore;
using rating_api.Data;
using rating_api.Entities;
using rating_api.Interfaces.Repositories;
using rating_api.Models;

namespace rating_api.Repositories
{
    public class DepartmentsRepository : IDepartmentsRepository
    {
        private readonly DatabaseContext _dbContext;
        public DepartmentsRepository(DatabaseContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<Department>> GetAll()
        {
            var departmentEntities = await _dbContext.Departments
                .AsNoTracking()
                .ToListAsync();

            var departments = departmentEntities
                .Select(d => Department.Create(d.Id, d.Name))
                .ToList();

            return departments;
        }

        public async Task<Department> Get(Guid id)
        {
            var departmentEntity = await _dbContext.Departments
                .AsNoTracking()
                .FirstOrDefaultAsync(d => d.Id == id)
                    ?? throw new Exception();

            var department = Department.Create(departmentEntity.Id, departmentEntity.Name);

            return department;
        }

        public async Task<Guid> Add(Department department)
        {
            var departmentEntity = new DepartmentEntity
            {
                Id = department.Id,
                Name = department.Name
            };

            await _dbContext.Departments.AddAsync(departmentEntity);
            await _dbContext.SaveChangesAsync();

            return department.Id;
        }
    }
}
