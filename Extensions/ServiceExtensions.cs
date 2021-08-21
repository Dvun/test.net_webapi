using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.OpenApi.Models;
using test.net_webapi.Application.Activities;
using test.net_webapi.Application.Core;
using test.net_webapi.Context;

namespace test.net_webapi.Extensions
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            // Database connection
            services.AddDbContext<DataContext>(opt =>
                opt.UseSqlite(config.GetConnectionString("DefaultConnection")));
            // Add Cors Policy 
            services.AddCors(opt => opt.AddPolicy("CorsPolicy",
                policy => policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000")));
            // Add MediatR 
            services.AddMediatR(typeof(List.Handler).Assembly);
            // Map Packet for editing all columns in Model automatically 
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddSwaggerGen(c =>
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "test.net_webapi", Version = "v1"}));

            return services;
        }
    }
}