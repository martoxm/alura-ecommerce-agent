using System.Net.Http.Json;

using AluraEcommerceAgent.Domain.Entities;
using AluraEcommerceAgent.Domain.Interfaces;
using AluraEcommerceAgent.Infrastructure.Options;

using Microsoft.Extensions.Options;

namespace AluraEcommerceAgent.Infrastructure.Services;

public class N8nChatService(HttpClient httpClient, IOptions<N8nOptions> options) : IChatService
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly N8nOptions _options = options.Value;

    public async Task<string> SendMessageAsync(
        string userMessage,
        IEnumerable<ChatMessage> history,
        CancellationToken cancellationToken = default)
    {
        var payload = new
        {
            message = userMessage,
            history = history.Select(x => new
            {
                role = x.Role,
                content = x.Content,
                createdAt = x.CreatedAt
            })
        };

        var response = await _httpClient.PostAsJsonAsync(
            _options.ChatWebhookPath,
            payload,
            cancellationToken);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<N8nChatResponse>(
            cancellationToken: cancellationToken);

        return result is null || string.IsNullOrWhiteSpace(result.Response)
            ? throw new InvalidOperationException("Resposta do n8n inválida.")
            : result.Response;
    }

    private sealed class N8nChatResponse
    {
        public string SessionId { get; set; } = string.Empty;
        public string Response { get; set; } = string.Empty;
    }
}
