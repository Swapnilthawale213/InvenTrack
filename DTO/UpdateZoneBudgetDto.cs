using System.ComponentModel.DataAnnotations;

namespace SmartInventoryBin.DTO
{
    public class UpdateZoneBudgetDto
    {
        [Required]
        public int ZoneId { get; set; }

        [Required]
        [Range(0.01, float.MaxValue, ErrorMessage = "Amount must be greater than zero")]
        public float Amount { get; set; }

        [Required]
        [RegularExpression("add|subtract", ErrorMessage = "Action must be 'add' or 'subtract'")]
        public string Action { get; set; }
    }
}
