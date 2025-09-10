using Microsoft.EntityFrameworkCore;
using SmartInventoryBin.Models;

namespace SmartInventoryBin.Data
{
    public class SmartDbContext:DbContext
    {
        public SmartDbContext(DbContextOptions<SmartDbContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<InventoryTransaction> InventoryTransactions { get; set; }
        public DbSet<Zone> Zones { get; set; }
        public DbSet<RawMaterial> RawMaterials { get; set; }
    }
}
