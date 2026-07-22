using AluraEcommerceAgent.Application.DTOs;

namespace AluraEcommerceAgent.Application.Abstractions;

public interface IChatService
{
    Task<ChatResponseDto> SendAsync(ChatRequestDto request, CancellationToken cancellationToken = default);
}