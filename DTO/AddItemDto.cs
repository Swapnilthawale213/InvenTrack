using System.ComponentModel.DataAnnotations;

namespace SmartInventoryBin.DTO
{
    public class AddItemDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int Minquantity { get; set; }
        [Required]
        public int Currentquantity { get; set; }
        [Required]
        public float Unitcost { get; set; }

        [Required]
        public int ZoneId { get; set; }
    }
}
