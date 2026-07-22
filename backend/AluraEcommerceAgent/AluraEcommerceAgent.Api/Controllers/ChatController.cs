using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Application.DTOs;

using Microsoft.AspNetCore.Mvc;

namespace AluraEcommerceAgent.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public sealed class ChatController(IChatUseCase chatService) : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(typeof(ChatResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<ChatResponseDto>> SendAsync(
        [FromBody] ChatRequestDto request,
        CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(request.Message))
            return BadRequest("Message is required.");

        var response = await chatService.SendAsync(request, cancellationToken);
        return Ok(response);
    }
}