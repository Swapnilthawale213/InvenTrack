using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartInventoryBin.Data;
using SmartInventoryBin.DTO;

namespace SmartInventoryBin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UpdateZoneBudget:ControllerBase
    {
        private readonly SmartDbContext _context;
        public UpdateZoneBudget(SmartDbContext context)
        {
            _context = context;
        }
        [HttpPost("zone/update-budget")]
        public async Task<IActionResult> UpdateZBudget([FromBody] UpdateZoneBudgetDto dto)
        {
            var zone = await _context.Zones.FindAsync(dto.ZoneId);

            if (zone == null)
                return NotFound("Zone not found");

            float updatedBudget = dto.Action == "add"
                ? zone.Budget + dto.Amount
                : zone.Budget - dto.Amount;

            if (updatedBudget < 0)
                return BadRequest("Budget cannot be negative");

            zone.Budget = updatedBudget;
            _context.Entry(zone).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = "Zone budget updated successfully",
                zoneId = zone.ZoneId,
                newBudget = zone.Budget
            });
        }
    }
}
