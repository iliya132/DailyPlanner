using System;

namespace DailyPlanner.Common.Interfaces
{
    public interface IDailyPlannerDataProvider
    {
        public IDataProvider GetProvider<IDataProvider>() where IDataProvider:class;
    }
}
