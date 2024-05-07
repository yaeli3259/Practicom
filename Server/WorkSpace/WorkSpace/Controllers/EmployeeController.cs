using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WorkSpace.API.Models;
using WorkSpace.Core.DTOs;
using WorkSpace.Core.Models;
using WorkSpace.Core.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkSpace.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService,IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }
        // GET: api/<EmlpyeeController>
        [HttpGet]
        public async Task<ActionResult> Get() {

            var employe = await _employeeService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDto>>(employe));
        }


        // GET api/<EmlpyeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id) {

            var employee = await _employeeService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }


        // POST api/<EmlpyeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Models.EmployeePostModel value)
        {
            //return Ok(await _employeeService.AddAsync(_mapper.Map<Employee>(value)));
            var newEmployee = await _employeeService.AddAsync(_mapper.Map<Employee>(value));
            return Ok(_mapper.Map<EmployeeDto>(newEmployee));

        }    


        // PUT api/<EmlpyeeController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Models.EmployeePostModel value)
        {      
            var employee = await _employeeService.GetByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            _mapper.Map(value, employee);
            await _employeeService.UpdateAsync(employee);
            employee = await _employeeService.GetByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDto>(employee));
        }

        // DELETE api/<EmlpyeeController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _employeeService.DeleteAsync(id);
            return NoContent();
            

        }
    }
}
