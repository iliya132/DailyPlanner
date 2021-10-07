using Microsoft.AspNetCore.Mvc.RazorPages;

namespace DailyPlanner.Pages;

public class NotesModel : PageModel
{
    public string? NoteBody { get; set; }
    public void OnGet()
    {
    }
}
