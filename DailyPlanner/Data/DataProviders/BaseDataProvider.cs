using AutoMapper;

using DailyPlanner.Common.Interfaces.ViewModels;
using DailyPlanner.Common.Model.Entities.Base;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using System.Web.Mvc;

namespace DailyPlanner.Data.DataProviders
{
    public abstract class BaseDataProvider<TContext> : IDataProvider where TContext : DbContext 
    {
        private readonly TContext context;
        IMapper mapper;
        public BaseDataProvider(TContext context)
        {
            this.context = context;
            mapper = DependencyResolver.Current.GetService<IMapper>();
        }

        public async Task<TEntity> Add<TEntity>(TEntity entity) where TEntity : class
        {
            var entry = await context.AddAsync(entity);
            await SaveChangesAsync();
            return entry.Entity;
        }

        public Task<TDbEntity> Add<TViewModel, TDbEntity>(TViewModel entity) 
            where TViewModel : IBaseViewModel
            where TDbEntity : class 
        {
            return Add(mapper.Map<TDbEntity>(entity));
        }

        public Task Remove<TDbEntity, TViewModelEntity>(TViewModelEntity entity)
            where TDbEntity : class
            where TViewModelEntity : IBaseViewModel
        {
            return Remove(mapper.Map<TDbEntity>(entity));
        }

        public Task Remove<TEntity>(TEntity entity) where TEntity : class
        {
            context.Remove(entity);
            return SaveChangesAsync();
        }

        public Task Update<TDbEntity, TViewModelEntity>(TViewModelEntity entity)
            where TDbEntity : class
            where TViewModelEntity : IBaseViewModel
        {
            return Update(mapper.Map<TDbEntity>(entity));
        }

        public Task Update<TEntity>(TEntity entity) where TEntity : class
        {
            context.Update(entity);
            return SaveChangesAsync();
        }

        public Task SaveChangesAsync()
        {
            return context.SaveChangesAsync();
        }
    }
}
