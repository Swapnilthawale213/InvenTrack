using Microsoft.AspNetCore.Http.Json;
using Microsoft.EntityFrameworkCore;
using SmartInventoryBin.Data;
using SmartInventoryBin.Utility;
using System.Text.Json.Serialization;

namespace SmartInventoryBin
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<SmartDbContext>(options =>
                options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
                new MySqlServerVersion(new Version(8, 0, 42))
                )
            );

            

            builder.Services.AddControllers()
                .AddJsonOptions(options=>
                {
                    options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
                });
            builder.Services.Configure<JsonOptions>(options =>
            {
                options.SerializerOptions.Converters.Add(new DateOnlyJsonConverter());
            });
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(options=>
            {
                options.AddPolicy("ReactPolicy", policy =>
                {
                    policy.WithOrigins("http://localhost:3000", "http://localhost:5173", "http://localhost:5174", "http://localhost:5175")
                    .AllowAnyHeader()
                    .AllowAnyMethod();
                });
            });

            
            
            var app = builder.Build();
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            
            //app.UseMiddleware<TokenAuthMiddleware>();

            
            app.UseCors("ReactPolicy");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
