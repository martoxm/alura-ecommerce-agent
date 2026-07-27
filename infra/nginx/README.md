# Configurações Nginx

Esta pasta contém exemplos de configuração do Nginx para publicação dos serviços do projeto por subdomínio.

## Objetivo

O Nginx atua como reverse proxy principal da VM, recebendo as requisições públicas nas portas 80 e 443 e encaminhando cada subdomínio para o respectivo serviço interno do projeto.

## Serviços publicados

Os principais serviços publicados via Nginx são:

- Frontend React
- Backend ASP.NET Core Web API
- n8n

Cada serviço deve possuir um bloco de configuração dedicado com `server_name` próprio, evitando conflitos com outros domínios e aplicações já existentes na mesma VM.

## Segurança e isolamento

O banco vetorial Qdrant não deve ser exposto publicamente.

Seu acesso deve acontecer apenas internamente entre containers e serviços do ambiente Docker Compose.

## Arquivos de exemplo

Os arquivos com extensão `.conf.example` servem como modelos para criação dos arquivos reais no servidor.

Eles foram mantidos em formato de exemplo para:

- documentar a arquitetura do projeto;
- facilitar a reprodução do ambiente;
- evitar exposição de configurações específicas da VM;
- evitar versionamento de certificados, caminhos locais e ajustes sensíveis.

## Observação prática

Na VM de produção, os arquivos reais podem ser copiados ou adaptados a partir destes modelos e vinculados à configuração ativa do Nginx, conforme a organização adotada no servidor.
