using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using rating_api.Contracts.Departments;
using rating_api.Interfaces.Services;
using rating_api.Models;
using rating_api.Services;

namespace rating_api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DepartmentsController : Controller
    {
        private readonly IDepartmentsService _departmentsService;

        public DepartmentsController(IDepartmentsService departmentsService)
        {
            _departmentsService = departmentsService;
        }

        [HttpGet]
        public async Task<ActionResult<List<DepartmentsResponse>>> GetDepartments()
        {
            var departments = await _departmentsService.GetAllDepartments();

            var response = departments.Select(c => new DepartmentsResponse(c.Id, c.Name));

            return Ok(response);
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<ActionResult<DepartmentsResponse>> GetDepartment([FromRoute] Guid id)
        {
            var department = await _departmentsService.GetDepartment(id);

            var response = new DepartmentsResponse(
                department.Id,
                department.Name
            );

            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Guid>> CreateDepartment([FromBody] DepartmentRequest request)
        {
            var (department, error) = Department.CreateWithValidation(
                Guid.NewGuid(),
                request.Name);

            if (error != null)
            {
                return BadRequest(error);
            }

            var departmentId = await _departmentsService.CreateDepartment(department);

            return Ok(departmentId);
        }
    }
}
