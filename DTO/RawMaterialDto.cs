using SmartInventoryBin.Utility;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace SmartInventoryBin.DTO
{
    public class RawMaterialDto
    {
        [Required]
        [StringLength(100)]
        public string MaterialName { get; set; }
        [Range(0, int.MaxValue)]
        public int MinQuantity { get; set; }
        [Range(0, int.MaxValue)]
        public int CurrentQuantity { get; set; }
        [Range(0, float.MaxValue)]
        public float UnitCost { get; set; }
        [Required]
        public int ZoneId { get; set; }
        [StringLength(255)]
        public string MaterialImage { get; set; }
    }
}
