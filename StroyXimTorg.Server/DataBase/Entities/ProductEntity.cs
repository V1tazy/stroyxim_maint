namespace StroyXimTorg.Server.DataBase.Entities;

public class ProductEntity
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public string Price { get; set; }
    public byte[] Image { get; set; }
    public string Type { get; set; }
    public string TypeId { get; set; }
}