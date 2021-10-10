using DailyPlanner.Common.Model.Entities;
using DailyPlanner.Common.Model.Entities.Base;
using DailyPlanner.Common.ViewModels;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DailyPlanner.Common.Interfaces
{
    public interface INotebooksDataProvider :IDataProvider
    {
        public Task <List<NotebookViewModel>> GetNotebooksAsync(Guid userId);
        public Task<bool> RemoveById(Guid Id);
    }
}
