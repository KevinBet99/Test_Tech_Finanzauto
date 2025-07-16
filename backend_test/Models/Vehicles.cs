namespace AuthApi.Models
{
    public class Vehicles
    {
        public int Id { get; set; }
        public string Plate { get; set; } = string.Empty;
        public string Color { get; set; } = string.Empty;
        public string Brand { get; set; } = string.Empty;
        public string Model { get; set; }  = string.Empty;
        public int Year { get; set; }
        public int Km { get; set; }
        public float Value { get; set; }
        public string Observations { get; set; }= string.Empty;
        public  string Stage { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }

    }
}