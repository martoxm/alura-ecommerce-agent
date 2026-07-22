using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Application.DTOs;

using FluentValidation;

using Microsoft.AspNetCore.Mvc;

namespace AluraEcommerceAgent.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController(IChatUseCase chatUseCase) : ControllerBase
{
    private readonly IChatUseCase _chatUseCase = chatUseCase;

    [HttpPost]
    [ProducesResponseType(typeof(ChatResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Post(
        [FromBody] ChatRequestDto request,
        CancellationToken cancellationToken)
    {
        try
        {
            var response = await _chatUseCase.ExecuteAsync(request, cancellationToken);
            return Ok(response);
        }
        catch (ValidationException ex)
        {
            var errors = ex.Errors.Select(x => new
            {
                Field = x.PropertyName,
                Error = x.ErrorMessage
            });

            return BadRequest(new
            {
                Message = "Validation failed.",
                Errors = errors
            });
        }
    }
}