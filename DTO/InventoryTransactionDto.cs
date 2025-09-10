using SmartInventoryBin.Models;
using System.ComponentModel.DataAnnotations;

namespace SmartInventoryBin.DTO
{
    public class InventoryTransactionDto
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int RawMaterialId { get; set; }
        [Required]
        public Transaction TransactionType { get; set; }
        public DateOnly Date { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
    }
}
