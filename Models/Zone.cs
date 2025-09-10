using System.ComponentModel.DataAnnotations;

namespace SmartInventoryBin.Models
{
    public class Zone
    {
        [Key]
        public int ZoneId { get; set; }
        [Required]
        [StringLength(200)]
        public string ZoneName { get; set; }
        [Required]
        [StringLength(500)]
        public string Description { get; set; }
        [Range(0, float.MaxValue)]
        public float AmountUsed { get; set; }
        [Range(0, float.MaxValue)]
        public float Budget { get; set; }
        [StringLength(100)]
        public string Location { get; set; }
        [StringLength(100)]
        public string ZoneType { get; set; }
        public ICollection<RawMaterial> RawMaterials { get; set; }
    }
}
