using DailyPlanner.Common.Interfaces;

using System;
using System.Collections.Generic;

namespace DailyPlanner.Data.DataProviders
{
    public class DailyPlannerDataProvider : IDailyPlannerDataProvider
    {
        private Dictionary<Type, object> _providers { get; set; } = new Dictionary<Type, object>();
        public DailyPlannerDataProvider(INotebooksDataProvider notebooksDataProvider)
        {
            _providers.Add(typeof(INotebooksDataProvider), notebooksDataProvider);
        }

        public IDataProvider GetProvider<IDataProvider>() where IDataProvider: class
        {
            var result = _providers.TryGetValue(typeof(IDataProvider), out object ? provider);
            if (!result || provider == null)
            {
                throw new InvalidOperationException($"no provider was found for type {typeof(IDataProvider)}");
            }
            return (IDataProvider)provider;
        }
    }
}
