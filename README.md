# Home Assistant CORS Iframe Proxy Add-on

This Home Assistant Add-on provides a simple reverse proxy server to:

- Bypass CORS restrictions
- Perform search/replace on responses
- Handle image responses elegantly inside iframes (with embedded base64 and CSS control)

## Features

- 🛡️ CORS bypass
- 🔍 Dynamic find/replace on content
- 🖼️ Image proxying as flexible HTML embedding
- ⚡ Fast and lightweight (Node.js 22)
- 🏡 Home Assistant Add-on ready

## Installation

1. Add this repository in Home Assistant:
   - Go to **Settings** → **Add-ons** → **Add-on Store** → **Repositories** (three dots) → **Add**.
   - URL: `https://github.com/dRAGon-Okinawa/home-assistant-cors-iframe-proxy`
2. Install "Reverse Proxy" Add-on.
3. Configure options (port) if needed.
4. Start it and enjoy!

## Example Usage

To proxy a URL with CORS bypass, use the following format:

```bash
https://your-ha-ip:3000/?target=https://example.com/
```

To proxy an Image using the `mode=embed` option, use:

```bash
https://your-ha-ip:3000/?target=https://example.com/image.jpg&mode=embed
```