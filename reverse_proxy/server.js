const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const zlib = require('zlib');
const app = express();

const PORT = parseInt(process.env.PORT) || 3000;

app.use(compression());
app.use(morgan('tiny'));

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use(async (req, res) => {
  const { target, referer, origin, background, alt, objectFit, lazy, mode } = req.query;
  let find = req.query.find;
  let replace = req.query.replace;

  if (!target) {
    return res.status(400).send('Missing "target" query parameter');
  }

  if (find && !Array.isArray(find)) find = [find];
  if (replace && !Array.isArray(replace)) replace = [replace];

  if (find && replace && find.length !== replace.length) {
    return res.status(400).send('"find" and "replace" must have the same number of entries');
  }

  try {
    console.log(`Fetching target: ${target}`);

    const headers = {};
    if (referer) headers['Referer'] = referer;
    if (origin) headers['Origin'] = origin;

    const response = await fetch(target, { headers });

    const contentType = response.headers.get('content-type') || '';
    const isImage = contentType.startsWith('image/');

    if (isImage && mode === 'embed') {
      const buffer = Buffer.from(await response.arrayBuffer());
      const base64 = buffer.toString('base64');
      const mime = contentType.split(';')[0];

      const imgAlt = (alt || 'Image').replace(/"/g, '&quot;');
      const imgLazy = lazy === 'true' ? 'loading="lazy"' : '';

      const safeObjectFit = objectFit || 'contain';
      const safeBackground = background || 'black';

      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    html, body {
      margin: 0;
      padding: 0;
      background: ${safeBackground};
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 100%;
      height: auto;
      max-height: 100%;
      object-fit: ${safeObjectFit};
    }
  </style>
</head>
<body>
  <img src="data:${mime};base64,${base64}" alt="${imgAlt}" ${imgLazy}>
</body>
</html>
      `.trim();

      res.set('Content-Type', 'text/html');
      res.set('Access-Control-Allow-Origin', '*');
      res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
      res.set('Access-Control-Allow-Headers', '*');
      return res.send(html);
    }

    let body;
    const contentEncoding = response.headers.get('content-encoding');

    if (contentEncoding === 'gzip') {
      const buffer = Buffer.from(await response.arrayBuffer());
      body = zlib.gunzipSync(buffer).toString();
    } else if (contentEncoding === 'deflate') {
      const buffer = Buffer.from(await response.arrayBuffer());
      body = zlib.inflateSync(buffer).toString();
    } else {
      body = await response.text();
    }

    if (find && replace) {
      for (let i = 0; i < find.length; i++) {
        const pattern = new RegExp(find[i], 'g');
        body = body.replace(pattern, replace[i]);
      }
    }

    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.set('Access-Control-Allow-Headers', '*');

    res.status(response.status).send(body);

  } catch (error) {
    console.error(error);
    res.status(500).send('Proxy Error');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy running on port ${PORT}`);
});
