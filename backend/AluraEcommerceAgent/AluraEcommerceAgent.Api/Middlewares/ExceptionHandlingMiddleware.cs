using System.Net;
using System.Text.Json;

using FluentValidation;

namespace AluraEcommerceAgent.Api.Middlewares;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(
        RequestDelegate next,
        ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (ValidationException ex)
        {
            _logger.LogWarning(ex, "Validation error");

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

            var response = new
            {
                message = "Validation failed.",
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

            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new
            {
                message = "An unexpected error occurred."
            };

            await context.Response.WriteAsync(JsonSerializer.Serialize(response));
        }
    }
}