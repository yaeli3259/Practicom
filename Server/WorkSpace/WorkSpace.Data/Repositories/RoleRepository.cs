using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkSpace.Core.Models;
using WorkSpace.Core.Repositories;

namespace WorkSpace.Data.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly DataContext _context;

        public RoleRepository(DataContext dataContext)
        {
            _context = dataContext;
        }
        public async Task<Role> AddAsync(Role role)
        {
            _context.Roles.Add(role);
            await _context.SaveChangesAsync();
            return role;
        }

        public async Task DeleteAsync(int id)
        {
            Role role = _context.Roles.FirstOrDefault(x => x.Id == id);
            if (role != null)
            {
                _context.Roles.Remove(role);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Role>> GetAllAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role> GetByIdAsync(int id)
        {

            return await _context.Roles.FirstAsync(r => r.Id == id);
        }

        public async Task<Role> UpdateAsync(Role role)
        {
            var existRole = await GetByIdAsync(role.Id);
            _context.Entry(existRole).CurrentValues.SetValues(role);
            await _context.SaveChangesAsync();
            return existRole;
        }
    }
}
