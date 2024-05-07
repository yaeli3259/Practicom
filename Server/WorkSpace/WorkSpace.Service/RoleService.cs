using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkSpace.Core.Models;
using WorkSpace.Core.Repositories;
using WorkSpace.Core.Services;

namespace WorkSpace.Service
{
    public class RoleService : IRoleService

    {
        private readonly IRoleRepository _roleRepository;
        public RoleService(IRoleRepository roleRepository)
        {
            _roleRepository = roleRepository;
        }
        public async Task<Role> AddAsync(Role role)
        {
            return await _roleRepository.AddAsync(role);
        }

        public async Task DeleteAsync(int id)
        {
            await _roleRepository.DeleteAsync(id);
        }

        public async Task<List<Role>> GetAllAsync()
        {
           return await _roleRepository.GetAllAsync();
        }

        public async Task<Role> GetByIdAsync(int id)
        {
            return await _roleRepository.GetByIdAsync(id);
        }

        public async Task<Role> UpdateAsync(Role role)
        {
            return await _roleRepository.UpdateAsync(role);
        }
    }
}
