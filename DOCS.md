# Home Assistant CORS Iframe Proxy Add-on
This Home Assistant Add-on provides a simple reverse proxy server to bypass CORS restrictions

## Pre-requisites
You MUST have your Home Assistant running with SSL (HTTPS) enabled as this add-on uses the same SSL certificate as your Home Assistant instance.

Please install (and configure!) the [Let's Encrypt](https://github.com/home-assistant/addons/blob/master/letsencrypt/DOCS.md) add-on before using this add-on.

## Add Repository
### "One" Click
[![Open your Home Assistant instance and show the add add-on repository dialog with a specific repository URL pre-filled.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FdRAGon-Okinawa%2Fhome-assistant-cors-iframe-proxy)

### Or Manually
Add this GitHub repository to your Home Assistant instance:
- Go to Settings
- Add-ons
- Add-on Store
- Overflow Menu (in the top right corner)
- Repositories
- Add `https://github.com/dRAGon-Okinawa/home-assistant-cors-iframe-proxy`

## Installation
- Go to the Add-on Store
- Install the Add-on "HA CORS iframe Proxy"

## Configuration
- Go to the Add-on
- Jump to the Configuration section
- Fill in the configuration options
- Start the Add-on

## Example Usage

To proxy a URL with CORS bypass, use the following format:

```bash
https://your-ha-ip:3000/?target=https://example.com/
```

To proxy an Image using the `mode=embed` option, use:

```bash
https://your-ha-ip:3000/?target=https://example.com/image.jpg&mode=embed
```