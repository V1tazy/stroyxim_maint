namespace StroyXimTorg.Server.Models;

public class ServiceResult<T>
{
    public bool isCorrect { get; set; } = false;
    public T Value { get; set; }
}