# Infraestrutura do Projeto

Esta pasta reúne os arquivos de referência da infraestrutura do agente corporativo de e-commerce.

O objetivo desta pasta não é espelhar integralmente a VM de produção, mas documentar e versionar de forma organizada os principais artefatos de deploy utilizados no projeto.

## Estrutura

- `nginx/`: exemplos de configuração de reverse proxy para os subdomínios do projeto.
- `scripts/`: scripts de apoio para deploy e manutenção.
- `README.md`: documentação desta camada de infraestrutura.

## Relação com a VM na OCI

Em produção, o projeto roda em uma única VM Ubuntu na Oracle Cloud Infrastructure (OCI), com os seguintes serviços:

- Frontend React
- Backend ASP.NET Core Web API
- n8n
- Qdrant

O acesso público é feito exclusivamente pelo Nginx, mantendo abertas apenas as portas 80 e 443.

O Qdrant não deve ser exposto publicamente. Ele deve permanecer acessível apenas internamente entre os serviços e containers do projeto.

## Arquivos `.example`

Os arquivos com sufixo `.example` representam modelos de configuração para uso no servidor.

Esses arquivos existem para documentar a arquitetura e facilitar a reprodução do ambiente sem expor configurações sensíveis, certificados, segredos ou detalhes específicos de outros projetos hospedados na mesma VM.

## Observações

- Os domínios e subdomínios aqui documentados podem ser adaptados conforme o ambiente.
- Os arquivos reais da VM podem conter ajustes adicionais de SSL, caminhos locais, certificados e integrações específicas do servidor.
- O deploy do projeto prioriza Docker Compose e Nginx como reverse proxy principal.
