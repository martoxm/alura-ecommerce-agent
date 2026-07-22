namespace AluraEcommerceAgent.Application.DTOs;

public class ChatRequestDto
{
    public string? SessionId { get; set; }
    public string Message { get; set; } = string.Empty;
}