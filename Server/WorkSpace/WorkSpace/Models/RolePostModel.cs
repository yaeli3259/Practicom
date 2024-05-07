using System.Security.Principal;
using WorkSpace.Core.Models;

namespace WorkSpace.API.Models
{
    public class RolePostModel
    {
        public Name Name { get; set; }
        public bool IsAdministrative { get; set; }
        public DateTime StartDate { get; set; }
        
    }
}
