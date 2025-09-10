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
    public class RawMaterialController:ControllerBase
    {
        private readonly SmartDbContext _context;
        public RawMaterialController(SmartDbContext context) => _context = context;

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.RawMaterials.Include(r => r.Zone).ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] RawMaterialDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!await _context.Zones.AnyAsync(z => z.ZoneId == dto.ZoneId))
                return BadRequest($"ZoneId {dto.ZoneId} does not exist.");

            var raw = new RawMaterial
            {
                Name = dto.MaterialName,
                MinQuantity = dto.MinQuantity,
                CurrentQuantity = dto.CurrentQuantity,
                UnitCost = dto.UnitCost,
                ZoneId = dto.ZoneId,
                MaterialImage = dto.MaterialImage
            };
            _context.RawMaterials.Add(raw);
            await _context.SaveChangesAsync();
            return Ok(raw);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] RawMaterialDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var raw = await _context.RawMaterials.FindAsync(id);
            if (raw == null) return NotFound();
            if (!await _context.Zones.AnyAsync(z => z.ZoneId == dto.ZoneId))
                return BadRequest($"ZoneId {dto.ZoneId} does not exist.");

            raw.Name = dto.MaterialName;
            raw.MinQuantity = dto.MinQuantity;
            raw.CurrentQuantity = dto.CurrentQuantity;
            raw.UnitCost = dto.UnitCost;
            raw.ZoneId = dto.ZoneId;
            raw.MaterialImage = dto.MaterialImage;
            await _context.SaveChangesAsync();
            return Ok(raw);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var raw = await _context.RawMaterials.FindAsync(id);
            if (raw == null) return NotFound();
            _context.RawMaterials.Remove(raw);
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
