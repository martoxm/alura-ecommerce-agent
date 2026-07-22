using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Application.DTOs;
using AluraEcommerceAgent.Application.UseCases;
using AluraEcommerceAgent.Application.Validators;

using FluentValidation;

using Microsoft.Extensions.DependencyInjection;

namespace AluraEcommerceAgent.Api.DependencyInjection;

public static class ApiServiceCollectionExtensions
{
    public static IServiceCollection AddApiServices(this IServiceCollection services)
    {
        services.AddScoped<IChatUseCase, SendMessageUseCase>();
        services.AddScoped<IValidator<ChatRequestDto>, ChatRequestDtoValidator>();

        return services;
    }
}