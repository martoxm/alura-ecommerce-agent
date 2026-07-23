using System.Net;
using System.Text.Json;

using FluentValidation;

namespace AluraEcommerceAgent.Api.Middlewares;

public class ExceptionHandlingMiddleware(
    RequestDelegate next,
    ILogger<ExceptionHandlingMiddleware> logger)
{
    private readonly RequestDelegate _next = next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            _logger.LogWarning(ex, "Validation error");

            if (context.Response.HasStarted)
                throw;

            context.Response.Clear();
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
            context.Response.ContentType = "application/json; charset=utf-8";

            var response = new
            {
                message = "Não foi possível processar sua solicitação no momento.",
                errors = ex.Errors.Select(x => new
                {
                    field = x.PropertyName,
                    error = x.ErrorMessage
                })
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled error");

            if (context.Response.HasStarted)
                throw;

            context.Response.Clear();
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
            context.Response.ContentType = "application/json; charset=utf-8";

            var response = new
            {
                message = "Ocorreu um erro inesperado."
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}