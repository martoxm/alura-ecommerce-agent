using AluraEcommerceAgent.Application.DTOs;

namespace AluraEcommerceAgent.Application.Abstractions;

public interface IChatUseCase
{
    Task<ChatResponseDto> ExecuteAsync(ChatRequestDto request, CancellationToken cancellationToken = default);
}