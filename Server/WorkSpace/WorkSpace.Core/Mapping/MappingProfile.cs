using AutoMapper;
using WorkSpace.Core.DTOs;
using WorkSpace.Core.Models;

namespace WorkSpace.Core.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap< Employee, EmployeeDto > ().ReverseMap();
            CreateMap<Role,RoleDto >().ReverseMap();
        }
    }
}
