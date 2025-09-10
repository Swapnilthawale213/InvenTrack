using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartInventoryBin.Data;
using SmartInventoryBin.DTO;
using SmartInventoryBin.Models;

namespace SmartInventoryBin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ZoneAdditionController:ControllerBase
    {
        private readonly SmartDbContext _context;
        public ZoneAdditionController(SmartDbContext context)
        {
            _context = context;
        }
        [HttpPost("add")]
        public async Task<IActionResult> AddZone([FromBody] AddZoneDto dto)
        {
            // Check if username already exists (case-sensitive)
            var existingUser = await _context.Users
                .FirstOrDefaultAsync(u => u.UserName == dto.Username);

            if (existingUser != null)
                return BadRequest("Username already exists");

            // Create new zone
            var newZone = new Zone
            {
                ZoneName = dto.Zonename,
                Description = dto.Zonedescription,
                Budget = dto.Zonebudget,
                AmountUsed = 0, // Initial value
                Location = string.Empty,
                ZoneType = string.Empty
            };

            _context.Zones.Add(newZone);
            await _context.SaveChangesAsync(); // Save to get ZoneId

            // Create new user assigned to the zone
            var newUser = new User
            {
                UserName = dto.Username,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = Role.user,
                AssignedZoneId = newZone.ZoneId
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Zone and user created successfully",
                zoneId = newZone.ZoneId,
                userId = newUser.UserId
            });
        }
    }
}
