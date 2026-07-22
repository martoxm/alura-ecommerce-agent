using AluraEcommerceAgent.Application.Models;

namespace AluraEcommerceAgent.Application.Abstractions;

public interface IChatService
{
    Task<ChatMessageResponse> SendMessageAsync(
        ChatMessageRequest request,
        CancellationToken cancellationToken = default);
}