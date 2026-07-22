using AluraEcommerceAgent.Api.DependencyInjection;
using AluraEcommerceAgent.Infrastructure.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPresentation(builder.Configuration);
builder.Services.AddInfrastructure(builder.Configuration);

var app = builder.Build();

app.UseApplicationPipeline();

app.Run();