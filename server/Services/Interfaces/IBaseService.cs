using StroyXimTorg.Server.DataBase.Entities;
using StroyXimTorg.Server.Models;

namespace StroyXimTorg.Server.Services.Interfaces;

public interface IBaseService
{
    List<ProductEntity> GetProducts();

    ServiceResult<ProductEntity> GetProduct(int id);
    ServiceResult<List<ProductEntity>> GetProductByCategory(int categoryId);
    List<CategoryEntity> GetAllCategories();
}