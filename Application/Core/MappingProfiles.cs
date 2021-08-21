using AutoMapper;
using test.net_webapi.Models;

namespace test.net_webapi.Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<ActivityModel, ActivityModel>();
        }
    }
}