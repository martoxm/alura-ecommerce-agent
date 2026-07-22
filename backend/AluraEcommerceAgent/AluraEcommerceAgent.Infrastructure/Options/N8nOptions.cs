namespace AluraEcommerceAgent.Infrastructure.Options;

public class N8nOptions
{
    public const string SectionName = "N8n";

    public string BaseUrl { get; set; } = string.Empty;
    public string ChatWebhookPath { get; set; } = string.Empty;
}