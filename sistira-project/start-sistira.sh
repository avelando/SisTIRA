#!/bin/bash

APP_DIR="$(cd "$(dirname "$0")" && pwd)"

SERVER="$APP_DIR/.next/standalone/server.js"
ASSETS_DIR="$APP_DIR/.next/static"
PORT=${PORT:-3010}

export NODE_ENV=production
export PORT=$PORT

cd "$APP_DIR"

ln -sf "$ASSETS_DIR" "$APP_DIR/.next/standalone/.next/static"

echo "Iniciando aplicação Next.js em modo standalone na porta $PORT..."
node "$SERVER"
