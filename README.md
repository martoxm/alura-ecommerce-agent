# Alura E-commerce Agent

Agente de IA corporativo para colaboradores de e-commerce, desenvolvido para o **Challenge Alura Agentes**.

Permite que colaboradores consultem processos e procedimentos internos em linguagem natural — atendimento, logística, pagamentos, trocas, devoluções, antifraude, LGPD e regras operacionais — com base em documentos PDF internos da empresa.

## Arquitetura

| Camada           | Tecnologia                   | Responsabilidade                  |
| ---------------- | ---------------------------- | --------------------------------- |
| Frontend         | React + Vite + TypeScript    | Interface de chat                 |
| Backend          | ASP.NET Core Web API (C#)    | Gateway entre frontend e n8n      |
| Orquestração IA  | n8n                          | Workflows de ingestão e RAG       |
| LLM e Embeddings | Cohere (Command-R)           | Geração de embeddings e respostas |
| Banco Vetorial   | Qdrant                       | Armazenamento e busca semântica   |
| Infraestrutura   | OCI · Docker Compose · Nginx | Deploy em VM Ubuntu               |

### Fluxo RAG

```text
Usuário → Frontend → API C# → n8n webhook → Qdrant (busca) → Cohere (resposta) → Frontend
```

## Estrutura do projeto

```text
.
├── backend/
│   └── AluraEcommerceAgent/
│       ├── AluraEcommerceAgent.Api/          # Entrada HTTP
│       ├── AluraEcommerceAgent.Application/  # Casos de uso e DTOs
│       ├── AluraEcommerceAgent.Domain/       # Regras de domínio
│       └── AluraEcommerceAgent.Infrastructure/ # Integrações externas
├── frontend/
│   └── src/
├── docs/
│   ├── images/   # Screenshots e evidências
│   └── pdfs/     # Base de conhecimento
├── infra/
│   ├── nginx/
│   └── scripts/
├── n8n-workflows/
│   ├── 01-kb-pdf-ingestion-and-indexing.json
│   └── 02-kb-rag-chat-webhook.json
├── docker-compose.yml
└── README.md
```

## Como executar localmente

**Pré-requisitos:** Node.js, .NET SDK, Docker, conta na Cohere

```bash
# 1. Clonar o repositório
git clone https://github.com/martoxm/alura-ecommerce-agent
cd alura-ecommerce-agent

# 2. Subir Qdrant e n8n
docker compose up -d

# 3. Executar o backend
cd backend/AluraEcommerceAgent/AluraEcommerceAgent.Api
dotnet run

# 4. Executar o frontend
cd frontend
npm install && npm run dev
```

Ajuste as variáveis de ambiente de cada serviço conforme o seu cenário local.

## Exemplos de respostas do agente

### Exemplo 1

**Pergunta:** Como funciona a devolução por arrependimento?

**Resposta esperada do agente:**  
A devolução por arrependimento na TechStore Brasil segue as regras abaixo:

- Prazo: Solicitações devem ser enviadas em até 7 dias corridos após o recebimento do produto.
- Condições: O produto deve ser devolvido na embalagem original e sem marcas de uso.
- Reembolso: Se as condições forem atendidas, o estorno é integral e processado após validação da solicitação e perícia do produto.

### Exemplo 2

**Pergunta:** Quais são os canais oficiais de atendimento?

**Resposta esperada do agente:**  
Os canais oficiais de atendimento da TechStore Brasil são:

- Chat do site
- WhatsApp: (11) 4000-0000
- E-mail: atendimento@techstorebrasil.com.br

A equipe de suporte está disponível de segunda a sábado, das 9h às 20h.

### Exemplo 3

**Pergunta:** Como orientar o cliente sobre rastreamento?

**Resposta esperada do agente:**  
Para orientar o cliente sobre o rastreamento do pedido, siga estas etapas:

- Código de Rastreio: Após a emissão do despacho no sistema, o cliente recebe automaticamente o código de rastreio via e-mail e SMS.

- Consulta no Site: Oriente o cliente a acessar a aba "Meus Pedidos" no site da TechStore. Lá, ele encontrará informações atualizadas sobre o status do envio.

- Painel de Rastreamento: Se necessário, o cliente pode consultar diretamente o código de rastreio no painel interno de rastreamento do ERP para obter atualizações em tempo real.

## Base de conhecimento

PDFs internos utilizados:

- Atendimento ao cliente
- Envios e logística
- Reembolso e devoluções
- Termos operacionais
- Privacidade e LGPD

## Deploy na OCI

Projeto hospedado em VM Ubuntu na Oracle Cloud Infrastructure, com serviços orquestrados por Docker Compose e expostos via Nginx (portas 80/443 apenas).

| Serviço  | URL                               |
| -------- | --------------------------------- |
| Frontend | https://colab.martodev.online     |
| API      | https://api-colab.martodev.online |

## Aplicação em produção

### Tela inicial do agente

![Tela inicial do agente](./docs/images/01-chat-tela-inicial.png)

### Saudação inicial

![Saudação inicial do agente](./docs/images/02-chat-saudacao.png)

### Resposta sobre rastreamento

![Resposta operacional sobre rastreamento](./docs/images/03-chat-rastreamento.png)

### Workflow de ingestão no n8n

![Workflow de ingestão documental no n8n](./docs/images/04-n8n-ingestion-workflow.png)

### Workflow de chat RAG no n8n

![Workflow de chat RAG no n8n](./docs/images/05-n8n-rag-workflow.png)
