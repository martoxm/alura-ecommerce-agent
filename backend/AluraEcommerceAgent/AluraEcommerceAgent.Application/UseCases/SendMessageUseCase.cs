using AluraEcommerceAgent.Application.Abstractions;
using AluraEcommerceAgent.Application.DTOs;
using AluraEcommerceAgent.Domain.Entities;
using AluraEcommerceAgent.Domain.Interfaces;

using FluentValidation;

namespace AluraEcommerceAgent.Application.UseCases;

public class SendMessageUseCase : IChatUseCase
{
    private readonly IChatService _chatService;
    private readonly IValidator<ChatRequestDto> _validator;

    public SendMessageUseCase(
        IChatService chatService,
        IValidator<ChatRequestDto> validator)
    {
        _chatService = chatService;
        _validator = validator;
    }

    public async Task<ChatResponseDto> ExecuteAsync(ChatRequestDto request, CancellationToken cancellationToken = default)
    {
        var validationResult = await _validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            var errors = string.Join("; ", validationResult.Errors.Select(e => e.ErrorMessage));
            throw new ValidationException(errors, validationResult.Errors);
        }

        var history = request.History
            .Select(x => ChatMessage.Create(x.Role, x.Content))
            .ToList();

        var answer = await _chatService.SendMessageAsync(request.Message, history, cancellationToken);

        return new ChatResponseDto
        {
            Answer = answer
        };
    }
}