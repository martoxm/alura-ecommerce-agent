using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Infrastructure.Options;
using AluraEcommerceAgent.Infrastructure.Services;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AluraEcommerceAgent.Api.DependencyInjection;

public static class DependencyInjectionExtensions
{
    public static IServiceCollection AddPresentation(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        services.AddCors(options =>
        {
            options.AddPolicy("AllowFrontend", policy =>
            {
                policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    .WithOrigins(
                        configuration["Cors:Origin"] ?? "http://localhost:5173");
            });
        });

        return services;
    }
}