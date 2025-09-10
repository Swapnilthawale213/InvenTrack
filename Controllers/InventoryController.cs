using Microsoft.AspNetCore.Mvc;
using SmartInventoryBin.Data;
using SmartInventoryBin.DTO;
using SmartInventoryBin.Models;

namespace SmartInventoryBin.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly SmartDbContext _context;
        public InventoryController(SmartDbContext context) => _context = context;

        [HttpPost("update")]
        public async Task<IActionResult> UpdateInventory([FromBody] InventoryActionDto dto)
        {
            var material = await _context.RawMaterials.FindAsync(dto.MaterialId);
            if (material == null)
                return NotFound("Material not found");

            if (dto.Action == "dispatch" && dto.Quantity > material.CurrentQuantity)
                return BadRequest("Not enough stock to dispatch");

            // Update quantity
            material.CurrentQuantity = dto.Action == "restock"
                ? material.CurrentQuantity + dto.Quantity
                : material.CurrentQuantity - dto.Quantity;

            // Create transaction
            var transaction = new InventoryTransaction
            {
                MaterialId = dto.MaterialId,
                Quantity = dto.Quantity,
                TransactionType = dto.Action == "restock" ? Transaction.restock : Transaction.dispatch,
                Date = DateTime.UtcNow.Date
            };

            _context.InventoryTransactions.Add(transaction);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                message = $"Material {dto.Action}ed successfully",
                materialId = material.MaterialId,
                newQuantity = material.CurrentQuantity
            });
        }
    }
}
