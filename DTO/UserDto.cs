using SmartInventoryBin.Models;
using System.ComponentModel.DataAnnotations;

namespace SmartInventoryBin.DTO
{
    public class UserDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public Role Role { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public int? ZoneId { get; set; }
        [Required]
        [StringLength(25)]
        public string Password { get; set; }
    }
}
