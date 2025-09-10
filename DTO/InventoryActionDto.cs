using System.ComponentModel.DataAnnotations;

namespace SmartInventoryBin.DTO
{
    public class InventoryActionDto
    {
        [Required]
        public int MaterialId { get; set; }

        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }

        [Required]
        [RegularExpression("restock|dispatch", ErrorMessage = "Action must be 'restock' or 'dispatch'")]
        public string Action { get; set; }
    }
}
