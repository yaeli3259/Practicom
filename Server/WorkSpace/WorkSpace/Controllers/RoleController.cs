using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using WorkSpace.Core.Models;
using WorkSpace.Core.Services;
using WorkSpace.Service;
using WorkSpace.API.Models;
using WorkSpace.Core.DTOs;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkSpace.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {

            private readonly IRoleService _roleService;
        private readonly IMapper _mapper;
        public RoleController(IRoleService roleService, IMapper mapper)
            {
                _roleService = roleService;
                _mapper = mapper;
            }
        // GET: api/<RoleController>
        [HttpGet]
        public async Task<ActionResult> Get() {

            var role = await _roleService.GetAllAsync();
            return Ok(_mapper.Map<IEnumerable<RoleDto>>(role));
        }


        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id) {

            var role = await _roleService.GetByIdAsync(id);
            return Ok(_mapper.Map<RoleDto>(role));
        }


        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] RolePostModel value)
        {
            return Ok(await _roleService.AddAsync(_mapper.Map<Role>(value)));
        }

            // PUT api/<RoleController>/5
            [HttpPut("{id}")]
            public async Task<ActionResult> Put(int id, [FromBody] RolePostModel value)
            {
            var role = await _roleService.GetByIdAsync(id);
            if (role is null)
            {
                return NotFound();
            }
            _mapper.Map(value, role);//להסביר!!
            await _roleService.UpdateAsync(role);
            role = await _roleService.GetByIdAsync(id);
            return Ok(_mapper.Map<RoleDto>(role));
           }

            // DELETE api/<RoleController>/5
            [HttpDelete("{id}")]
            public async Task<ActionResult> Delete(int id)
            {
                await _roleService.DeleteAsync(id);
                return NoContent();

            }
        }
    }

