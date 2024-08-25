using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using StroyXimTorg.Server.DataBase;
using StroyXimTorg.Server.Models;
using StroyXimTorg.Server.Services.Interfaces;
using static System.Net.Mime.MediaTypeNames;

namespace StroyXimTorg.Server.Controllers
{
    public class MainController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly IBaseService _baseService;
        private readonly AppDbContext _dbContext;

        public MainController(IApplicationService applicationService, IBaseService baseService, AppDbContext dbContext)
        {
            _applicationService = applicationService;
            _baseService = baseService;
            _dbContext = dbContext;
        }


        [HttpPost("application")]
        public async Task<IActionResult> CreateApplication([FromBody] ApplicationInput applicationInput)
        {

            await _applicationService.SendApplicationToTelegramAsync(new()
            {
                PhoneNumber = applicationInput.Tel,
                Name = applicationInput.Name
            });

            await _applicationService.SendApplicationToEmailAsync(new()
            {
                PhoneNumber = applicationInput.Tel,
                Name = applicationInput.Name
            });

            return Ok();
        }

        [HttpGet("Products")]
        public IActionResult GetProducts()
        {
            var res = _baseService.GetProducts();
            return Ok(res);
        }

        [HttpGet("Product")]
        public IActionResult GetProduct([FromHeader] int id)
        {
            var res = _baseService.GetProduct(id);
            if (res.isCorrect)
            {
                return Ok(res.Value);
            }

            return NotFound();
        }

        [HttpGet("Categories")]
        public IActionResult GetCategories()
        {
            var res = _baseService.GetAllCategories();
            return Ok(res);
        }

        [HttpGet("ProductCategory")]
        public IActionResult GetProductByCategory([FromQuery] int categoryId)
        {
            var res = _baseService.GetProductByCategory(categoryId);
            if (res.isCorrect)
            {
                return Ok(res.Value);
            }

            return BadRequest();
        }

    }
}
