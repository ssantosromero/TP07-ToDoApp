using Microsoft.AspNetCore.Mvc;
using TP07_ToDoApp.ToDo.Api.Controllers;
using TP07_ToDoApp.ToDo.Api.Models;
using Xunit;

namespace TP07_ToDoApp.ToDo.Api.Tests
{
    public class ToDoControllerTests
    {
        [Fact]
        public void Get_ReturnsListOfTasks()
        {
            var controller = new TasksController();

            var result = controller.Get().Result as OkObjectResult;

            Assert.NotNull(result);
            var tasks = Assert.IsType<List<ToDoItem>>(result!.Value);
            Assert.True(tasks.Count >= 3);
        }

        [Fact]
        public void Add_AddsNewTask()
        {
            var controller = new TasksController();

            var result = controller.Add("Estudiar para el parcial").Result as OkObjectResult;

            Assert.NotNull(result);

            var tasks = Assert.IsType<List<ToDoItem>>(result!.Value);

            Assert.Contains(tasks, t => t.Title == "Estudiar para el parcial");
        }

        [Fact]
        public void Toggle_ChangesDoneState()
        {
            var controller = new TasksController();

            // GET inicial
            var initialResult = controller.Get().Result as OkObjectResult;
            var initialTasks = initialResult!.Value as List<ToDoItem>;
            var first = initialTasks![0];

            // Guardamos el valor original ANTES de que la lista estática cambie
            bool originalDone = first.Done;

            // Ejecutamos el toggle
            var toggleResult = controller.Toggle(first.Id).Result as OkObjectResult;
            var updated = Assert.IsType<ToDoItem>(toggleResult!.Value);

            // Ahora comparamos contra el valor original (que ya es distinto)
            Assert.NotEqual(originalDone, updated.Done);
        }
    }
}
