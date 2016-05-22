using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.OptionsModel;
using Multipli.Infrastructure.Storage;
namespace Multipli.Api
{
    public class Startup
    {
        private IConfiguration _configuration;

        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json");

            builder.AddEnvironmentVariables();
            _configuration = builder.Build();
        }
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddOptions();
            ConfigureOptions(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            app.UseIISPlatformHandler();

            app.Run(async (context) =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        }

        private void ConfigureOptions(IServiceCollection services)
        {
            try
            {
                services.Configure<StorageOptions>(connection =>
                {
                    connection.Provider =
                        (ProviderType) Enum.Parse(typeof (ProviderType), _configuration["Data:Provider"]);

                    connection.EndpointUrl = _configuration["Data:DocumentDb:EndpointUrl"] ?? string.Empty;
                    connection.AuthorizationKey = _configuration["Data:DocumentDb:AuthorizationKey"] ?? string.Empty;
                    connection.ConnectionString = _configuration["Data:Sql:ConnectionString"] ?? string.Empty;
                });
            }
            catch (Exception exc)
            {
                //TODO: Add error message/handling.
            }
        }

        // Entry point for the application.
        public static void Main(string[] args) => WebApplication.Run<Startup>(args);
    }
}
