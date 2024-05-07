using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkSpace.Core.Models
{
    public enum Name { Lecturer, Developer, Bookeeper, Designer };
    public class Role
    {
        public int Id { get; set; }
        public Name Name { get; set; }
        public bool IsAdministrative { get; set; }
        public DateTime StartDate { get; set; }

    }
}


