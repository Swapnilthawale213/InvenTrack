using System.ComponentModel.DataAnnotations;

namespace SmartInventoryBin.DTO
{
    public class ChangePasswordDto
    {
        [Required]
        public string Currentpassword { get; set; }
        [Required]
        public string Newpassword { get; set; }
        [Required]
        public string Confirmnewpassword { get; set; }
    }
}
