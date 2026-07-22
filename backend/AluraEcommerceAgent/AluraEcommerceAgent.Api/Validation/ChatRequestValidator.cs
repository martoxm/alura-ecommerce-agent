using AluraEcommerceAgent.Api.Contracts;
using FluentValidation;

namespace AluraEcommerceAgent.Api.Validation;

public sealed class ChatRequestValidator : AbstractValidator<ChatRequest>
{
    public ChatRequestValidator()
    {
        RuleFor(x => x.SessionId)
            .NotEmpty()
            .WithMessage("O identificador da sessão é obrigatório.")
            .MaximumLength(100)
            .WithMessage("O identificador da sessão deve ter no máximo 100 caracteres.");

        RuleFor(x => x.Message)
            .NotEmpty()
            .WithMessage("A mensagem é obrigatória.")
            .MaximumLength(2000)
            .WithMessage("A mensagem deve ter no máximo 2000 caracteres.");
    }
}