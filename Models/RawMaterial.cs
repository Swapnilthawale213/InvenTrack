using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartInventoryBin.Models
{
    public class RawMaterial
    {
        [Key] 
        public int MaterialId{ get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Range(0, int.MaxValue)]
        public int MinQuantity { get; set; }
        [Range(0, int.MaxValue)]
        public int CurrentQuantity { get; set; }
        [Range(0, float.MaxValue)]
        public float UnitCost { get; set; }
        [Required]
        public int ZoneId { get; set; }
        [StringLength(255)]
        public string MaterialImage {  get; set; }
        [ForeignKey("ZoneId")]
        public Zone Zone { get; set; }
        public ICollection<InventoryTransaction> InventoryTransactions { get; set; }
    }
}
