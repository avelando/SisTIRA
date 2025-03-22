#!/bin/bash

APP_DIR="/home/avelar/SisTIRA/sistira-project"

SERVER="$APP_DIR/.next/standalone/server.js"

ASSETS_DIR="$APP_DIR/.next/static"

PORT=3000

export NODE_ENV=production
export PORT=$PORT

cd "$APP_DIR"

ln -sf "$ASSETS_DIR" "$APP_DIR/.next/standalone/.next/static"

echo "Iniciando aplicação Next.js em modo standalone na porta $PORT..."
node "$SERVER"
