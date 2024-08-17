using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using StroyXimTorg.Server.Models;
using StroyXimTorg.Server.Services.Interfaces;

namespace StroyXimTorg.Server.Controllers
{
    public class MainController : ControllerBase
    {
        private readonly IApplicationService _applicationService;
        private readonly IBaseService _baseService;
        
        public MainController(IApplicationService applicationService, IBaseService baseService)
        {
            _applicationService = applicationService;
            _baseService = baseService;
        }


        [HttpPost("application")]
        public async Task<IActionResult> CreateApplication([FromBody]ApplicationInput applicationInput)
        {
            await _applicationService.SendApplicationToTelegramAsync(new()
            {
                PhoneNumber = applicationInput.PhoneNumber,
                Name = applicationInput.Name
            });

            await _applicationService.SendApplicationToEmailAsync(new()
            {
                PhoneNumber = applicationInput.PhoneNumber,
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
        public IActionResult GetProduct([FromBody]int id)
        {
            var res = _baseService.GetProduct(id);
            if (res.isCorrect)
            {
                return Ok(res.Value);
            }

            return NotFound();
        }

    }
}
