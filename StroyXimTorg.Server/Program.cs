using Microsoft.EntityFrameworkCore;
using StroyXimTorg.Server.DataBase;
using StroyXimTorg.Server.Services;
using StroyXimTorg.Server.Services.Interfaces;

namespace StroyXimTorg.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddDbContext<AppDbContext>(options =>
            {
                var dbPath = Path.Combine(builder.Environment.ContentRootPath, "base_db");
                options.UseSqlite($"Data Source={dbPath}");
            });
            builder.Services.AddScoped<IBaseService, BaseService>();
            builder.Services.AddScoped<IApplicationService, ApplicationService>();
            builder.Services.AddCors();
            builder.Services.AddSession();
            builder.Services.AddDistributedMemoryCache();



            var app = builder.Build();

            app.UseCors(options =>
            {
                options.WithOrigins("https://0.0.0.0:5173/")
                    .AllowAnyHeader()
                    .AllowAnyOrigin();
            });

            app.UseSession();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
