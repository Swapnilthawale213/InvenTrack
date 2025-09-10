using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartInventoryBin.Data;
using SmartInventoryBin.DTO;
using SmartInventoryBin.Models;
using System;

namespace SmartInventoryBin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SmartDbContext _context;
        public UserController(SmartDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _context.Users.Include(r=>r.Zone).ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] UserDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            if (dto.Role == Role.user)
            {
                if (dto.ZoneId == null)
                    return BadRequest("ZoneId is required for users.");
                if (!await _context.Zones.AnyAsync(z => z.ZoneId == dto.ZoneId))
                    return BadRequest($"ZoneId {dto.ZoneId} does not exist.");
            }
            else if (dto.Role == Role.admin && dto.ZoneId != null)
            {
                return BadRequest("ZoneId must be null for admins.");
            }

            var hashedPassword = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            var user = new User
            {
                UserName = dto.Name,
                Role = dto.Role,
                Email = dto.Email,
                AssignedZoneId = dto.ZoneId,
                PasswordHash = hashedPassword
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] UserDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();

            if (dto.Role == Role.user)
            {
                if (dto.ZoneId == null)
                    return BadRequest("ZoneId is required for users.");
                if (!await _context.Zones.AnyAsync(z => z.ZoneId == dto.ZoneId))
                    return BadRequest($"ZoneId {dto.ZoneId} does not exist.");
            }
            else if (dto.Role == Role.admin && dto.ZoneId != null)
            {
                return BadRequest("ZoneId must be null for admins.");
            }

            user.UserName = dto.Name;
            user.Email = dto.Email;
            user.Role = dto.Role;
            user.AssignedZoneId = dto.ZoneId;

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            await _context.SaveChangesAsync();
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return NotFound();
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
