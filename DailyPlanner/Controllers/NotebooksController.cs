using DailyPlanner.Common.Interfaces;
using DailyPlanner.Common.ViewModels;
using DailyPlanner.Controllers.Base;

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using System;
using System.Threading.Tasks;

namespace DailyPlanner.Controllers;
[Route("Notebooks")]
[Authorize]
public class NotebooksController : BaseDailyPlannercontroller
{
    public NotebooksController() : base()
    {
    }

    [HttpGet]
    [Route("GetNotebooks")]
    public async Task<JsonResult> GetNotebooks()
    {
        var result = await DataProvider<INotebooksDataProvider>().GetNotebooksAsync(GetUserId());
        return Json(result);
    }

    [HttpPost]
    [Route("AddNotebook")]
    public async Task<NotebookViewModel> AddNotebook(NotebookViewModel notebook)
    {
        var result = await DataProvider<INotebooksDataProvider>().Add(notebook);
        return result;
    }

    [HttpDelete]
    [Route("RemoveNotebook")]
    public async Task<ActionResult> RemoveNotebook(Guid Id)
    {
        var removeResult = await DataProvider<INotebooksDataProvider>().RemoveById(Id);
        if (removeResult)
        {
            return Ok();
        }
        else
        {
            logger.Log(LogLevel.Information, message: "Не найдена записная книжка для удаления.", Id);
            return BadRequest();
        }
    }

    [HttpPost]
    [Route("AddNote")]
    public async Task<NoteViewModel> AddNote(NoteViewModel note)
    {
        try
        {
            var result = await DataProvider<INotebooksDataProvider>().Add(note);
            return result;
        }
        catch(Exception ex)
        {
            logger.Log(logLevel: LogLevel.Error, message: "Не удалось добавить заметку", new { ex, note});
            throw;
        }
    }

    [HttpDelete]
    [Route("RemoveNote")]
    public async Task<ActionResult> RemoveNote(NoteViewModel note)
    {
        try
        {
            await DataProvider<INotebooksDataProvider>().Remove(note);
        }
        catch(Exception ex)
        {
            logger.Log(logLevel: LogLevel.Error, message: "Не удалось удалить запись", new { ex, note });
            return BadRequest();
        }
        return Ok();
    }

    [HttpPut]
    [Route("UpdateNote")]
    public async Task<ActionResult> UpdateNote(NoteViewModel note)
    {
        try
        {
            await DataProvider<INotebooksDataProvider>().Update(note);
        }
        catch(Exception ex)
        {
            logger.Log(logLevel: LogLevel.Error, message:"Не удалось обновить запись", new { ex, note });
            return BadRequest();
        }
        return Ok();
    }
}
