namespace AluraEcommerceAgent.Domain.Entities;

public class ChatSession
{
    public Guid SessionId { get; private set; }
    public List<ChatMessage> Messages { get; private set; } = new();

    private ChatSession() { }

    public static ChatSession Create() =>
        new()
        { SessionId = Guid.NewGuid() };

    public void AddMessage(string role, string content)
    {
        var message = ChatMessage.Create(role, content);
        Messages.Add(message);
    }
}