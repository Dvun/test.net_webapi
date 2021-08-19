using Microsoft.EntityFrameworkCore;
using test.net_webapi.Models;

// Context file, where need put all Models for Database

namespace test.net_webapi.Context
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options) {}
        
        public DbSet<ActivityModel> Activities { get; set; }
    }
}