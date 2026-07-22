using AluraEcommerceAgent.Api.DependencyInjection;
using AluraEcommerceAgent.Api.Extensions;
using AluraEcommerceAgent.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddApiDocumentation()
    .AddApiServices()
    .AddCorsPolicy(builder.Configuration)
    .AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseApiPipeline();

app.Run();