using Microsoft.AspNetCore.Mvc;
using TP07_ToDoApp.ToDo.Api.Models;

namespace TP07_ToDoApp.ToDo.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static readonly List<ToDoItem> Tasks = new()
    {
        new(1, "Estudiar", false),
        new(2, "Correr", false),
        new(3, "Cocinar", true)
    };

    [HttpGet]
    public ActionResult<IEnumerable<ToDoItem>> Get() => Ok(Tasks);

    [HttpPost]
    public ActionResult<IEnumerable<ToDoItem>> Add([FromBody] string title)
    {
        var nextId = Tasks.Any() ? Tasks.Max(t => t.Id) + 1 : 1;
        Tasks.Add(new(nextId, title, false));
        return Ok(Tasks);
    }

    [HttpPut("{id}/toggle")]
    public ActionResult<ToDoItem> Toggle(int id)
    {
        var idx = Tasks.FindIndex(t => t.Id == id);
        if (idx < 0) return NotFound();

        var t = Tasks[idx];
        var updated = t with { Done = !t.Done };
        Tasks[idx] = updated;

        return Ok(updated);
    }
}
