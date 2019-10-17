using Microsoft.EntityFrameworkCore;
namespace TaskNetAngular.Models
{
    public class TaskContext:DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options):base(options)
        {
            
        }
        public DbSet<TaskItem> TaskItems { get; set; }
    }
}