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
    public class ZoneController:ControllerBase
    {
        private readonly SmartDbContext _context;
        public ZoneController(SmartDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll() => Ok(await _context.Zones.ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] ZoneDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var zone = new Zone
            {
                ZoneName = dto.Name,
                Description = dto.Description,
                AmountUsed = dto.AmountUsed,
                Budget = dto.Budget,
                Location = dto.Location,
                ZoneType = dto.ZoneType,
            };
            _context.Zones.Add(zone);
            await _context.SaveChangesAsync();
            return Ok(zone);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] ZoneDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var zone = await _context.Zones.FindAsync(id);
            if (zone == null) return NotFound();
            zone.ZoneName = dto.Name;
            zone.Description = dto.Description;
            zone.AmountUsed = dto.AmountUsed;
            zone.Budget = dto.Budget;
            zone.Location = dto.Location;
            zone.ZoneType = dto.ZoneType;
            await _context.SaveChangesAsync();
            return Ok(zone);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var zone = await _context.Zones.FindAsync(id);
            if (zone == null) return NotFound();
            _context.Zones.Remove(zone);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
