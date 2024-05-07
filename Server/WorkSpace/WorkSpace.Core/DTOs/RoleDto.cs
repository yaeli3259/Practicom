using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkSpace.Core.Models;

namespace WorkSpace.Core.DTOs
{
    public class RoleDto
    {
        public int Id { get; set; }
        public Name Name { get; set; }
        public bool IsAdministrative { get; set; }
        public DateTime StartDate { get; set; }
      
    }
}
