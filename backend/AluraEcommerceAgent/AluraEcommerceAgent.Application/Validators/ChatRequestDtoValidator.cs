using AluraEcommerceAgent.Application.DTOs;

using FluentValidation;

namespace AluraEcommerceAgent.Application.Validators;

public class ChatRequestDtoValidator : AbstractValidator<ChatRequestDto>
{
    public ChatRequestDtoValidator()
    {
        RuleFor(x => x.Message)
            .NotEmpty()
            .WithMessage("A mensagem é obrigatória.")
            .MaximumLength(2000)
            .WithMessage("A mensagem deve ter no máximo 2000 caracteres.");
    }
}