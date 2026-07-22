namespace AluraEcommerceAgent.Application.DTOs;

public sealed record ChatRequestDto(string Message, string? SessionId = null);