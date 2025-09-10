using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SmartInventoryBin.Models
{
    public class User
    {
        [Key]
        public int UserId { get; set; }
        [Required]
        [StringLength(100)]
        public string UserName { get; set; }
        [Required]
        [StringLength(255)]
        public string PasswordHash { get; set; }
        [Column(TypeName ="nvarchar(24)")]
        public Role Role { get; set; }
        public int? AssignedZoneId { get; set; }
        [Required]
        [StringLength(100)]
        [EmailAddress]
        public string Email { get; set; }
        [ForeignKey("AssignedZoneId")]
        public Zone Zone { get; set; }
    }
}

