using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartInventoryBin.Data;
using SmartInventoryBin.DTO;
using SmartInventoryBin.Models;

namespace SmartInventoryBin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SummaryController : ControllerBase
    {
        private readonly SmartDbContext _context;
        public SummaryController(SmartDbContext context) => _context = context;

        [HttpGet("rawmaterials")]
        public async Task<IActionResult> GetRawMaterialSummaries()
        {
            var materials = await _context.RawMaterials
                .Include(r => r.InventoryTransactions)
                .Select(r => new RawMaterialSummaryDto
                {
                    Material_id = r.MaterialId,
                    Name = r.Name,
                    Min_quantity = r.MinQuantity,
                    Current_quantity = r.CurrentQuantity,
                    Unit_cost = r.UnitCost,
                    Zone_id = r.ZoneId,
                    Materialimage=r.MaterialImage,
                    Last_restock = r.InventoryTransactions
                        .Where(t => t.TransactionType == Transaction.restock)
                        .OrderByDescending(t => t.Date)
                        .Select(t => t.Date.ToString("dd-MM-yyyy"))
                        .FirstOrDefault(),
                    Last_dispatch = r.InventoryTransactions
                        .Where(t => t.TransactionType == Transaction.dispatch)
                        .OrderByDescending(t => t.Date)
                        .Select(t => t.Date.ToString("dd-MM-yyyy"))
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(materials);
        }

        [HttpGet("zones")]
        public async Task<IActionResult> GetZoneSummaries()
        {
            var zones = await _context.Zones
                .Include(z => z.RawMaterials)
                .ThenInclude(r => r.InventoryTransactions)
                .Select(z => new ZoneSummaryDto
                {
                    ZoneId = z.ZoneId,
                    ZoneName = z.ZoneName,
                    Description = z.Description,
                    BudgetAllocated = z.Budget,
                    BudgetUsed = z.RawMaterials.Sum(r=>r.CurrentQuantity*r.UnitCost),
                    DispatchCount = z.RawMaterials
                        .SelectMany(r => r.InventoryTransactions)
                        .Count(t => t.TransactionType == Transaction.dispatch),
                    TotalItems = z.RawMaterials.Count,
                    TotalQuantity = z.RawMaterials.Sum(r => r.CurrentQuantity),
                    ZoneCategory = z.ZoneType
                })
                .ToListAsync();

            return Ok(zones);
        }
    }
}
