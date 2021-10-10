using DailyPlanner.Common.Interfaces.ViewModels;

using System;

namespace DailyPlanner.Common.ViewModels
{
    public record NoteViewModel : IBaseViewModel
    {
        public string? Name { get; init; }
        public string? Body { get; init; }
        public Guid Id { get; init; }
        public DateTime CreatedAt { get; init; }
        public Guid ParentNoteBookId { get; init; }
    }
}