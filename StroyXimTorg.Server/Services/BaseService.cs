using StroyXimTorg.Server.DataBase;
using StroyXimTorg.Server.DataBase.Entities;
using StroyXimTorg.Server.Models;
using StroyXimTorg.Server.Services.Interfaces;

namespace StroyXimTorg.Server.Services;

public class BaseService : IBaseService
{
    private readonly AppDbContext _dbContext;
    
    public BaseService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }
    
    public List<ProductEntity> GetProducts()
    {
        var res = _dbContext.ProductEntities.ToList();
        return res;
    }

    public ServiceResult<ProductEntity> GetProduct(int id)
    {
        var res = _dbContext.ProductEntities.FirstOrDefault(x => x.Id == id);
        if (res == null)
        {
            return new();
        }

        return new()
        {
            isCorrect = true,
            Value = res
        };
    }
}