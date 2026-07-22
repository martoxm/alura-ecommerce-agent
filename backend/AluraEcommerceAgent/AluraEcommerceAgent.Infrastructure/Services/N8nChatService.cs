using System.Net.Http.Json;

using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Application.DTOs;
using AluraEcommerceAgent.Infrastructure.Options;

using Microsoft.Extensions.Options;

namespace AluraEcommerceAgent.Infrastructure.Services;

public sealed class N8nChatService(HttpClient httpClient, IOptions<N8nOptions> options) : IChatService
{
    private readonly N8nOptions _options = options.Value;

    public async Task<ChatResponseDto> SendAsync(ChatRequestDto request, CancellationToken cancellationToken = default)
    {
        var payload = new
        {
            message = request.Message,
            sessionId = request.SessionId
        };

        var response = await httpClient.PostAsJsonAsync(_options.WebhookUrl, payload, cancellationToken);
        response.EnsureSuccessStatusCode();

        var body = await response.Content.ReadFromJsonAsync<ChatResponseDto>(cancellationToken: cancellationToken);

        return body ?? new ChatResponseDto("Nenhuma resposta foi retornada pelo fluxo do n8n.", request.SessionId);
    }
}