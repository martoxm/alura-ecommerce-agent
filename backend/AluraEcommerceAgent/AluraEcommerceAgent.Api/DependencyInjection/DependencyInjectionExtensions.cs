using Microsoft.Extensions.DependencyInjection;

namespace AluraEcommerceAgent.Api.DependencyInjection;

public static class DependencyInjectionExtensions
{
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();

        return services;
    }
}