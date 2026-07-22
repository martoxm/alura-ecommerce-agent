using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Application.DTOs;
using AluraEcommerceAgent.Domain.Interfaces;

using FluentValidation;

namespace AluraEcommerceAgent.Application.UseCases;

public class SendMessageUseCase(
    IChatService chatService,
    IValidator<ChatRequestDto> validator) : IChatUseCase
{
    private readonly IChatService _chatService = chatService;
    private readonly IValidator<ChatRequestDto> _validator = validator;

    public async Task<ChatResponseDto> ExecuteAsync(
        ChatRequestDto request,
        CancellationToken cancellationToken = default)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = string.Join("; ", validationResult.Errors.Select(e => e.ErrorMessage));
            throw new ValidationException(errors, validationResult.Errors);
        }

        var (sessionId, response) = await _chatService.SendMessageAsync(
            request.SessionId,
            request.Message,
            cancellationToken);

        return new ChatResponseDto
        {
            SessionId = sessionId,
            Answer = response
        };
    }
}