using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Application.DTOs;

using Microsoft.AspNetCore.Mvc;

namespace AluraEcommerceAgent.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChatController : ControllerBase
{
    [HttpPost]
    [ProducesResponseType(typeof(ChatResponseDto), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public async Task<IActionResult> Post(
        [FromBody] ChatRequestDto request,
        [FromServices] IChatUseCase chatUseCase,
        CancellationToken cancellationToken)
    {
        var response = await chatUseCase.ExecuteAsync(request, cancellationToken);
        return Ok(response);
    }
}