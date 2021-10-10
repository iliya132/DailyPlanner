using DailyPlanner.Common.Model.Entities;

using Microsoft.EntityFrameworkCore;

namespace DailyPlanner.Data
{
    public class NotebooksDbContext :DbContext
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public NotebooksDbContext(DbContextOptions<NotebooksDbContext> options) : base(options)
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {

        }

        public DbSet<NoteBook> Notebooks { get; set; }
        public DbSet<Note> Notes { get; set; }
    }
}
