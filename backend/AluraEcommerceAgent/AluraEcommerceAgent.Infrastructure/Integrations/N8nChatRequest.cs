namespace AluraEcommerceAgent.Infrastructure.Integrations;

public sealed class N8nChatRequest
{
    public string SessionId { get; init; } = string.Empty;
    public string Message { get; init; } = string.Empty;
}