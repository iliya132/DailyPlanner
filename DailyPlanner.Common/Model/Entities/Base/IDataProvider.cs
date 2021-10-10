using System.Threading.Tasks;

namespace DailyPlanner.Common.Model.Entities.Base
{
    public interface IDataProvider
    {
        public Task<TEntity> Add<TEntity>(TEntity entity) where TEntity : class;
        public Task Remove<TEntity>(TEntity entity) where TEntity : class;
        public Task Update<TEntity>(TEntity entity) where TEntity : class;
        public Task SaveChangesAsync();
    }
}
