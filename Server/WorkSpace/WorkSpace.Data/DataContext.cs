using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkSpace.Core.Models;

using System.Linq;


namespace WorkSpace.Data
{
    public class DataContext : DbContext
    {
        public DbSet<Role> Roles { get; set; }
        public DbSet<Employee> Employees { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //optionsBuilder.UseSqlServer("Server=DESKTOP-SI8MC0H;Database=worker_db;TrustServerCertificate=true;trusted_connection=true;");
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=allEmployees_db");

        }
        public Employee FindEmployeeById(int employeeId)
        {
            // Query the Employees DbSet for the employee with the specified ID
            return Employees.FirstOrDefault(e => e.Id == employeeId);
        }

     

    }
}
   //public static void LoadEmployees(this DataContext context)
        //{
        //    if (!context.Employees.Any())
        //    {
        //        context.Employees.AddRange(context.Employees.ToList());
        //        context.SaveChanges();
        //    }
        //}
