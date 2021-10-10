using DailyPlanner.Common.Model.Entities.Base;

using System;

namespace DailyPlanner.Common.Model.Entities
{
    public record Note : IDbEntity, IIdentifiedEntity, INamedEntity, ICreationFixedDateTime
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public Guid ParentNoteBookId { get; set; }
        public virtual NoteBook? ParentNoteBook { get; set; }
    }
}