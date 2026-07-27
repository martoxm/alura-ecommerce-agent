#!/usr/bin/env bash

set -e

PROJECT_DIR="/opt/alura-ecommerce-agent"

echo "Acessando diretório do projeto..."
cd "$PROJECT_DIR"

echo "Atualizando repositório..."
git pull origin develop

echo "Reconstruindo e subindo containers..."
docker compose up -d --build

echo "Exibindo status dos containers..."
docker compose ps

echo "Deploy concluído com sucesso."