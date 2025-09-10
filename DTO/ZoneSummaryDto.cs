namespace SmartInventoryBin.DTO
{
    public class ZoneSummaryDto
    {
        public int ZoneId { get; set; }
        public string ZoneName { get; set; }
        public string Description { get; set; }
        public float BudgetAllocated { get; set; }
        public float BudgetUsed { get; set; }
        public int DispatchCount { get; set; }
        public int TotalItems { get; set; }
        public int TotalQuantity { get; set; }
        public string ZoneCategory { get; set; }
    }
}
