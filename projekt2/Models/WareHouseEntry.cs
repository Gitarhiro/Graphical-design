using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Warehouse.Models
{
    public class WareHouseEntry
    {
        [Required]
        public int Id { get; set; } // up to 8 

        [MaxLength(16)]
        public string Name { get; set; } //max 16 chars
        public string? Description { get; set; } //unlimited

        public string Category { get; set; } //can be chosen from a category list
        
        public string Unit { get; set; } //chosen from kg/pcs/litre
         
        public int price { get; set; } //has universal currency

    }
}
