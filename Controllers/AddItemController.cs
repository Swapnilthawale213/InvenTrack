using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SmartInventoryBin.Data;
using SmartInventoryBin.DTO;
using SmartInventoryBin.Models;

namespace SmartInventoryBin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AddItemController:ControllerBase
    {
        private readonly SmartDbContext _context;
        public AddItemController(SmartDbContext smartDbContext)
        {
            _context=smartDbContext;
        }
        [HttpPost("add")]
        public async Task<IActionResult> AddItem([FromBody] AddItemDto dto)
        {
            var newMaterial = new RawMaterial
            {
                Name = dto.Name,
                MinQuantity = dto.Minquantity,
                CurrentQuantity = dto.Currentquantity,
                UnitCost = dto.Unitcost,
                ZoneId = dto.ZoneId,
                MaterialImage = ""
            };

            _context.RawMaterials.Add(newMaterial);
            await _context.SaveChangesAsync();

            // Create initial restock transaction
            var transaction = new InventoryTransaction
            {
                MaterialId = newMaterial.MaterialId,
                Quantity = newMaterial.CurrentQuantity,
                TransactionType = Transaction.restock, // Assuming enum
                Date = DateTime.UtcNow.Date
            };

            _context.InventoryTransactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok("Item added and initial restock recorded");
        }
    }
}
