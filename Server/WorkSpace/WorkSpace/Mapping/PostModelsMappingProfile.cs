using AutoMapper;
using WorkSpace.API.Models;
using WorkSpace.Core.Models;

namespace WorkSpace.API.Mapping
{
    public class PostModelsMappingProfile : Profile
    {
        public PostModelsMappingProfile()
        {
            CreateMap<RolePostModel, Role>().ReverseMap();
            CreateMap<EmployeePostModel, Employee>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ReverseMap(); 
            CreateMap<Role, RolePostModel>().ReverseMap();
        }
    }
}



