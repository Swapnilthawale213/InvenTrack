namespace SmartInventoryBin.DTO
{
    public class RawMaterialSummaryDto
    {
        public int Material_id { get; set; }
        public string Name { get; set; }
        public int Min_quantity { get; set; }
        public int Current_quantity { get; set; }
        public float Unit_cost { get; set; }
        public int Zone_id { get; set; }
        public string Last_restock { get; set; }
        public string Last_dispatch { get; set; }
        public string Materialimage { get; set; }
    }
}
