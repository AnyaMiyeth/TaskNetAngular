using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskNetAngular.Models;
namespace TaskNetAngular___Copy.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskContext _context;
        public TaskController(TaskContext context)
        {
            _context = context;
            if (_context.TaskItems.Count() == 0)
            {
                // Crea un nuevo item si la coleccion esta vacia,
                // lo que significa que no puedes borrar todos los Items. Esto solo se hace como prueba.
                TaskItem taskItem = new TaskItem
                {
                    Id = 1,
                    Title = "Desarrollo",
                    Description = "Tarea de Desarrollo",
                    Priority = true
                };
                  TaskItem taskItem2 = new TaskItem
                {
                    Id = 2,
                    Title = "Analisis",
                    Description = "Definir los Requerimientos",
                    Priority = true
                };

                _context.TaskItems.Add(taskItem);
                _context.TaskItems.Add(taskItem2);
                _context.SaveChanges();
            }
        }
        [HttpPost]
        public async Task<ActionResult<TaskItem>> Post(TaskItem taskItem)
        {
            _context.TaskItems.Add(taskItem);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetTaskItem), new { id = taskItem.Id }, taskItem);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<TaskItem>> GetTaskItem(int id)
        {
            TaskItem taskItem = await _context.TaskItems.FindAsync(id);
            if (taskItem != null)
            {
                return taskItem;
            }
            return NotFound();
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TaskItem>>> GetItems()
        {
            return await _context.TaskItems.ToListAsync();

        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var taskItem = await _context.TaskItems.FindAsync(id);
            if (taskItem != null)
            {
                _context.TaskItems.Remove(taskItem);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            return NotFound();

        }


[HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, TaskItem taskItem)
        {
            if (id != taskItem.Id)
            {
                return BadRequest();
            }

            _context.TaskItems.Update(taskItem);
             await _context.SaveChangesAsync();
             return NoContent();

        }
    }
}