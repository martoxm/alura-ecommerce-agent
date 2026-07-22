using AluraEcommerceAgent.Domain.Entities;

namespace AluraEcommerceAgent.Domain.Interfaces;

public interface IChatService
{
    Task<string> SendMessageAsync(string userMessage, IEnumerable<ChatMessage> history, CancellationToken cancellationToken = default);
}