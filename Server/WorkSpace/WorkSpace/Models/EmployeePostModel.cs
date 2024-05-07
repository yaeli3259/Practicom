using WorkSpace.Core.Models;

namespace WorkSpace.API.Models
{
    public class EmployeePostModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string IdNumber { get; set; }
        public bool IsActive { get; set; }
        public DateTime DateStartingWork { get; set; } 
        public DateTime DateOfBirth { get; set; }
        public Gender Gender { get; set; }
        public List<RolePostModel> Roles { get; set; }
    }
}
