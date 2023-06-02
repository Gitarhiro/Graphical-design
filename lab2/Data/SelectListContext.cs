using Microsoft.EntityFrameworkCore;
using Warehouse.Models;

namespace Warehouse.Data
{
    public class SelectListContext: DbContext
    {
        public SelectListContext(DbContextOptions<SelectListContext> options) : base()
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseSqlite(@"Data Source =C:\Users\sbede\Desktop\mvc\Warehouse\products.db");
        public virtual DbSet<WareHouseEntry> products { get; set;}

    }
}
