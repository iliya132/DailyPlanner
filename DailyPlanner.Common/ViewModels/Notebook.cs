using DailyPlanner.Common.Interfaces.ViewModels;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DailyPlanner.Common.ViewModels
{
    public class NotebookViewModel :IBaseViewModel
    {
        public string? Name { get; set; }
        public string Color { get; set; } = "orange";

    }
}
