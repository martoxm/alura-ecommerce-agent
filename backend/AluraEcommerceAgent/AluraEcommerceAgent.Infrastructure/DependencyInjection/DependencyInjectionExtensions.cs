using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Infrastructure.Options;
using AluraEcommerceAgent.Infrastructure.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AluraEcommerceAgent.Infrastructure.DependencyInjection;

public static class DependencyInjectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<N8nOptions>(configuration.GetSection(N8nOptions.SectionName));

        services.AddHttpClient<IChatUseCase, N8nChatService>();

        return services;
    }
}