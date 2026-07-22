using AluraEcommerceAgent.Application.DTOs;

using FluentValidation;

namespace AluraEcommerceAgent.Application.Validators;

public sealed class ChatRequestDtoValidator : AbstractValidator<ChatRequestDto>
{
    public ChatRequestDtoValidator()
    {
        RuleFor(x => x.Message)
            .NotEmpty().WithMessage("Message is required.")
            .MinimumLength(2).WithMessage("Message must have at least 2 characters.");

        RuleFor(x => x.SessionId)
            .MaximumLength(100)
            .When(x => !string.IsNullOrWhiteSpace(x.SessionId));
    }
}