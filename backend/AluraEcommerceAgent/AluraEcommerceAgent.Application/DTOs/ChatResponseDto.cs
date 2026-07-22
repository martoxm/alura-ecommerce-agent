namespace AluraEcommerceAgent.Application.DTOs;

public sealed record ChatResponseDto(string Answer, string? SessionId = null);