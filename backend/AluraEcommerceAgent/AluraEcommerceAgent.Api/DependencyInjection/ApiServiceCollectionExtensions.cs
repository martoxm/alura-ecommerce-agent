using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Application.DTOs;
using AluraEcommerceAgent.Application.UseCases;
using AluraEcommerceAgent.Application.Validators;

using FluentValidation;

namespace AluraEcommerceAgent.Api.DependencyInjection;

public static class ApiServiceCollectionExtensions
{
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        services.AddApplicationUseCases();
        services.AddApplicationValidators();

        return services;
    }

    private static IServiceCollection AddApplicationUseCases(this IServiceCollection services)
    {
        services.AddScoped<IChatUseCase, SendMessageUseCase>();
        return services;
    }

    private static IServiceCollection AddApplicationValidators(this IServiceCollection services)
    {
        services.AddScoped<IValidator<ChatRequestDto>, ChatRequestDtoValidator>();
        return services;
    }
}