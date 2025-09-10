using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartInventoryBin.Data;
using SmartInventoryBin.DTOs;
using SmartInventoryBin.Models;

namespace SmartInventoryBin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly SmartDbContext _context;
        public AuthController(SmartDbContext context) => _context = context;

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _context.Users
                .Include(u => u.Zone)
                .FirstOrDefaultAsync(u => u.UserName == dto.UserName);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid username or password");

            var response = new Dictionary<string, object>
            {
                [user.UserName.ToLower()] = new
                {
                    role = user.Role.ToString(),
                    zoneId = user.AssignedZoneId,
                    name = user.UserName,
                    assignedZones = user.AssignedZoneId != null ? new List<int> { user.AssignedZoneId.Value } : new List<int>(),
                    email = user.Email
                }
            };

            return Ok(response);
        }
    }

}