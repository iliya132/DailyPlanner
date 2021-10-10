using DailyPlanner.Common.Interfaces.ViewModels;

using System;
using System.Collections.Generic;

namespace DailyPlanner.Common.ViewModels
{
    public class NotebookViewModel :IBaseViewModel
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; }
        public List<NoteViewModel> Records { get; set; } = new();
        public string? Name { get; set; }
        public string Color { get; set; } = "orange";

    }
}
