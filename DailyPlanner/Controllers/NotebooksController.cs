using Microsoft.AspNetCore.Mvc;
using DailyPlanner.Common.ViewModels;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace DailyPlanner.Controllers;
[Route("Notebooks")]
public class NotebooksController : Controller
{
    [HttpGet]
    [Route("GetNotebooks")]
    public Task<JsonResult> GetNotebooks()
    {
        var result = new
        {
            notebooks = new List<NotebookViewModel>
            {
                new NotebookViewModel
                {
                    Color="orange",
                    Name = "Моя записная книжка"
                },
                new NotebookViewModel
                {
                    Color = "red",
                    Name = "Мой коллективчик"
                }
            },
            SelectedIndex = 0
        };
        return Task.FromResult(Json(result));
    }
}
