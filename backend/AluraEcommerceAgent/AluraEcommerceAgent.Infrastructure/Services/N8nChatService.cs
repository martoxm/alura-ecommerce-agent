using System.Net.Http.Json;
using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Application.Models;
using AluraEcommerceAgent.Infrastructure.Integrations;
using AluraEcommerceAgent.Infrastructure.Options;

using Microsoft.Extensions.Options;

namespace AluraEcommerceAgent.Infrastructure.Services;

public sealed class N8nChatService(HttpClient httpClient, IOptionsMonitor<N8nOptions> options) : IChatService
{
    private readonly HttpClient _httpClient = httpClient;
    private readonly IOptionsMonitor<N8nOptions> _options = options;

    public async Task<ChatMessageResponse> SendMessageAsync(
        ChatMessageRequest request,
        CancellationToken cancellationToken = default)
    {
        var payload = new N8nChatRequest
        {
            SessionId = request.SessionId,
            Message = request.Message
        };

        var response = await _httpClient.PostAsJsonAsync(
            _options.CurrentValue.WebhookUrl,
            payload,
            cancellationToken);

        response.EnsureSuccessStatusCode();

        var result = await response.Content.ReadFromJsonAsync<N8nChatResponse>(cancellationToken);

        return new ChatMessageResponse
        {
            Response = result?.Response ?? string.Empty
        };
    }
}