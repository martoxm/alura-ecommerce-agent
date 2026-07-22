namespace AluraEcommerceAgent.Application.Models;

public sealed class ChatMessageRequest
{
    public string SessionId { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
}