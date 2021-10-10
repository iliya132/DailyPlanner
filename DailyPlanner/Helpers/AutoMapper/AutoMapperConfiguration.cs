using AutoMapper;

namespace DailyPlanner.Helpers.AutoMapper
{
    public static class AutoMapperConfiguration
    {
        private static MapperConfiguration ConfigureMappings()
        {
            return new MapperConfiguration(mc =>
            {
                mc.AddProfile(new NotebooksMapperProfile());
            });
        }

        public static IMapper GetConfiguredMapper()
        {
            return ConfigureMappings().CreateMapper();
        }
    }
}
