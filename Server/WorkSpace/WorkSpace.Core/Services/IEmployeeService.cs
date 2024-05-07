using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkSpace.Core.Models;

namespace WorkSpace.Core.Services
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetAllAsync();
        Task<Employee> GetByIdAsync(int id);
        Task<Employee> UpdateAsync(Employee employee);
        Task DeleteAsync(int id);
        Task<Employee> AddAsync(Employee employee);
    }
}
