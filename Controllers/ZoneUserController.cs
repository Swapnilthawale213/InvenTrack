using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartInventoryBin.Data;
using SmartInventoryBin.DTO;
using SmartInventoryBin.Models;

namespace SmartInventoryBin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ZoneUserController:ControllerBase
    {
        private readonly SmartDbContext _context;
        public ZoneUserController(SmartDbContext context) => _context = context;

        [HttpPost("create")]
        public async Task<IActionResult> CreateZoneWithUser([FromBody] AddZoneDto dto)
        {
            // Check if username already exists
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == dto.Username);

            if (existingUser != null)
                return BadRequest("Username already exists");

            // Create new zone
            var zone = new Zone
            {
                ZoneName = dto.Zonename,
                Description = dto.Zonedescription,
                Budget = dto.Zonebudget,
                AmountUsed = 0, // Initial value
                Location = string.Empty, // Default
                ZoneType = string.Empty  // Default
            };

            _context.Zones.Add(zone);
            await _context.SaveChangesAsync(); // Save to get ZoneId

            // Create new user assigned to the zone
            var user = new User
            {
                UserName = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = Role.user, // Admin is creating a user
                AssignedZoneId = zone.ZoneId,
                Email = dto.Email
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Zone and user created successfully",
                zoneId = zone.ZoneId,
                userId = user.UserId
            });
        }
    }
}
