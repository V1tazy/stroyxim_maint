namespace StroyXimTorg.Server.Models;

public class ApplicationModel
{
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Description { get; set; }
    public string? Product { get; set; }

    public override string ToString()
    {
        return "Новая заявка!\n" +
               $"От: {Name}\n" +
               $"Номер телефона: {PhoneNumber}\n" +
               $"Дополнительно: {Description}"; 
    }
}