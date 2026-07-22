namespace AluraEcommerceAgent.Api.Contracts;

public sealed class ChatRequest
{
    public string SessionId { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
}