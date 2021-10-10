using AutoMapper;

using DailyPlanner.Common.Interfaces;
using DailyPlanner.Common.Model.Entities;
using DailyPlanner.Common.ViewModels;

using Microsoft.EntityFrameworkCore;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DailyPlanner.Data.DataProviders
{
    public class NotebooksDataProvider : BaseDataProvider<NotebooksDbContext>, INotebooksDataProvider
    {
        private readonly NotebooksDbContext notebooksContext;
        private readonly IMapper mapper;

        public NotebooksDataProvider(NotebooksDbContext notebooksContext, IMapper mapper) :base(notebooksContext)
        {
            this.notebooksContext = notebooksContext;
            this.mapper = mapper;
        }

        public Task<List<NotebookViewModel>> GetNotebooksAsync(Guid userId)
        {
            return notebooksContext.Notebooks.Where(i => i.CreatedBy == userId).Include(i => i.Notes).Select(i=> mapper.Map<NotebookViewModel>(i)).ToListAsync();
        }

        public async Task<bool> RemoveById(Guid Id)
        {
            if (Id == Guid.Empty)
                return false;

            var notebookToDelete = await notebooksContext.Notebooks.FirstOrDefaultAsync(i => i.Id == Id);
            if(notebookToDelete == null)
            {
                return false;
            }

            await Remove(notebookToDelete);
            return true;
        }
    }
}
