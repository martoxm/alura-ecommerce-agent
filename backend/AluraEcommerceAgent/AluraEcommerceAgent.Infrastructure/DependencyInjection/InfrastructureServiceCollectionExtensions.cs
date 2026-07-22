using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Domain.Interfaces;
using AluraEcommerceAgent.Infrastructure.Options;
using AluraEcommerceAgent.Infrastructure.Services;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace AluraEcommerceAgent.Infrastructure.DependencyInjection;

public static class InfrastructureServiceCollectionExtensions
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services
            .AddOptions<N8nOptions>()
            .Bind(configuration.GetSection(N8nOptions.SectionName))
            .Validate(options =>
                !string.IsNullOrWhiteSpace(options.BaseUrl) &&
                !string.IsNullOrWhiteSpace(options.ChatWebhookPath),
                "N8n configuration is invalid.")
            .ValidateOnStart();

        services.AddHttpClient<IChatService, N8nChatService>((serviceProvider, client) =>
        {
            var options = serviceProvider
                .GetRequiredService<Microsoft.Extensions.Options.IOptions<N8nOptions>>()
                .Value;

            client.BaseAddress = new Uri(options.BaseUrl);
            client.Timeout = TimeSpan.FromSeconds(60);
        });

        return services;
    }
}