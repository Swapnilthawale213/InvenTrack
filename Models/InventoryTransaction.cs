using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace SmartInventoryBin.Models
{
    public class InventoryTransaction
    {
        [Key]
        public int TransactionId { get; set; }
        [Required]
        public int MaterialId { get; set; }
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
        [Column(TypeName ="nvarchar(24)")]
        public Transaction TransactionType{get;set;}
        [Column(TypeName = "date")]
        public DateTime Date { get; set; }
        [ForeignKey("MaterialId")]
        public RawMaterial RawMaterial { get; set; }
    }
}
