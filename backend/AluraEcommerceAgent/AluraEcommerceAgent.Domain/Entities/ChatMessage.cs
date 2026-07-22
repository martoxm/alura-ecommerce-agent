namespace AluraEcommerceAgent.Domain.Entities;

public class ChatMessage
{
    public Guid Id { get; private set; }
    public string Role { get; private set; }      // "user" ou "assistant"
    public string Content { get; private set; }
    public DateTime CreatedAt { get; private set; }

    private ChatMessage() { }

    public static ChatMessage Create(string role, string content)
    {
        if (string.IsNullOrWhiteSpace(content))
            throw new ArgumentException("Conteúdo não pode ser vazio.", nameof(content));

        return new ChatMessage
        {
            Id = Guid.NewGuid(),
            Role = role,
            Content = content,
            CreatedAt = DateTime.UtcNow
        };
    }
}