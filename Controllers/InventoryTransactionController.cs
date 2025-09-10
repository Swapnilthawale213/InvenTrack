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
    public class InventoryTransactionController : ControllerBase
    {
        private readonly SmartDbContext _context;
        public InventoryTransactionController(SmartDbContext context) => _context = context; 

        [HttpGet]
        public async Task<IActionResult> GetAll() =>
            Ok(await _context.InventoryTransactions
                .Include(t => t.RawMaterial)
                .ToListAsync());

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] InventoryTransactionDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            if (!await _context.RawMaterials.AnyAsync(r => r.MaterialId == dto.RawMaterialId))
                return BadRequest($"RawMaterialId {dto.RawMaterialId} does not exist.");

            var tx = new InventoryTransaction
            {
                MaterialId = dto.RawMaterialId,
                Date = dto.Date.ToDateTime(TimeOnly.MinValue),
                Quantity = dto.Quantity,
                TransactionType=dto.TransactionType
            };

            _context.InventoryTransactions.Add(tx);
            await _context.SaveChangesAsync();
            return Ok(tx);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] InventoryTransactionDto dto)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            var tx = await _context.InventoryTransactions.FindAsync(id);
            if (tx == null) return NotFound();
            if (!await _context.RawMaterials.AnyAsync(r => r.MaterialId == dto.RawMaterialId))
                return BadRequest($"RawMaterialId {dto.RawMaterialId} does not exist.");

            tx.MaterialId = dto.RawMaterialId;
            tx.TransactionType = dto.TransactionType;
            tx.Date = dto.Date.ToDateTime(TimeOnly.MinValue);
            tx.Quantity = dto.Quantity;
            await _context.SaveChangesAsync();
            return Ok(tx);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var tx = await _context.InventoryTransactions.FindAsync(id);
            if (tx == null) return NotFound();
            _context.InventoryTransactions.Remove(tx);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }
}
