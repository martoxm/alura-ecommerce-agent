namespace AluraEcommerceAgent.Domain.Interfaces;

public interface IChatService
{
    Task<(string SessionId, string Response)> SendMessageAsync(
        string? sessionId,
        string userMessage,
        CancellationToken cancellationToken = default);
}