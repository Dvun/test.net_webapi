using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using test.net_webapi.Context;
using test.net_webapi.Data;

namespace test.net_webapi
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            // Create connection to host
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();
            var services = scope.ServiceProvider;

            try
            {
                // Try data auto migration if have no database
                var context = services.GetRequiredService<DataContext>();
                await context.Database.MigrateAsync();
                await context.AddAsync(Seed.SeedData(context));
            }
            catch (Exception ex)
            {
                // If some Error with migration
                var logger = services.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex, "An error with migration!");
            }

            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}