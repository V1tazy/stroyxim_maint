namespace StroyXimTorg.Server.DataBase.Entities;

public class ProductEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Container { get; set; }
    public string Massa { get; set; }
    public string? Description { get; set; }
    public string Price { get; set; }
    public string Image { get; set; }
    public int TypeId { get; set; }
}