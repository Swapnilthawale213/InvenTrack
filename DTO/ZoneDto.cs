using System.ComponentModel.DataAnnotations;

namespace SmartInventoryBin.DTO
{
    public class ZoneDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }
        [StringLength(500)]
        public string Description { get; set; }
        [Range(0, float.MaxValue)]
        [Required]
        public float AmountUsed { get; set; }
        [Range(0, float.MaxValue)]
        [Required]
        public float Budget { get; set; }
        [StringLength(100)]
        public string Location { get; set; }
        [StringLength(100)]
        public string ZoneType { get; set; }
    }
}
