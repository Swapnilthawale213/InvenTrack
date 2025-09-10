using System.ComponentModel.DataAnnotations;

namespace SmartInventoryBin.DTO
{
    public class AddZoneDto
    {
        [Required]
        public string Zonename { get; set; }
        [Required]
        public string Zonedescription { get; set; }
        [Required]
        public float Zonebudget { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
