#!/bin/sh

PORT=$(bashio::config 'port')

echo "Starting Reverse Proxy on port ${PORT}"

export PORT

node server.js
