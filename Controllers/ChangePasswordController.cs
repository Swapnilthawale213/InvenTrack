using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartInventoryBin.Data;
using SmartInventoryBin.DTO;

namespace SmartInventoryBin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChangePasswordController : ControllerBase
    {
        private readonly SmartDbContext _context;
        public ChangePasswordController(SmartDbContext context) => _context = context;

        [HttpPost("update")]
        public async Task<IActionResult> UpdatePassword([FromBody] ChangePasswordDto dto, [FromQuery] string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);
            if (user == null)
                return NotFound("User not found");

            if (!BCrypt.Net.BCrypt.Verify(dto.Currentpassword, user.PasswordHash))
                return BadRequest("Incorrect current password");

            if (dto.Newpassword != dto.Confirmnewpassword)
                return BadRequest("New password and confirmation do not match");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Newpassword);
            await _context.SaveChangesAsync();

            return Ok("Password updated successfully");
        }
    }
}
