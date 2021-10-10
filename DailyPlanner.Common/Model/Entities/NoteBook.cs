using DailyPlanner.Common.Model.Entities.Base;
using DailyPlanner.Common.Utils;

using System;
using System.Collections.Generic;

namespace DailyPlanner.Common.Model.Entities
{
    public record NoteBook : IDbEntity, IIdentifiedEntity, INamedEntity, ICreationFixedDateTime
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Name { get; set; } = string.Empty;
        public string Color { get; set; } = ColorUtils.GetRandomColor();
        public DateTime CreatedAt { get; set; }
        public Guid CreatedBy { get; set; }
        public virtual List<Note> Notes { get; set; } = new();
    }
}