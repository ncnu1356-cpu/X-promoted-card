export default function handler(req, res) {
  const { title, desc, image, link, cta } = req.query;

  const metaTitle = title || 'Promoted Post';
  const metaDesc = desc || 'Special offer just for you!';
  const metaImage = image || 'https://via.placeholder.com/800x418.png?text=Ad+Image';
  const ctaUrl = link || '#';
  const ctaText = cta || 'Learn More';

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(metaTitle)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  <meta name="twitter:image" content="${escapeHtml(metaImage)}">
  <meta property="og:title" content="${escapeHtml(metaTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:image" content="${escapeHtml(metaImage)}">
  <title>${escapeHtml(metaTitle)}</title>
  <style>
    /* Wohi styles jo pehle the – copy from earlier card.html style */
    body { margin:0; background:#fff; font-family: system-ui; display:flex; justify-content:center; align-items:center; min-height:100vh; }
    .card { max-width:550px; border:1px solid #eef2f5; border-radius:20px; padding:12px 16px; background:white; }
    .header { display:flex; gap:12px; align-items:center; }
    .avatar { width:48px; height:48px; background:#1d9bf0; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; }
    .promoted { background:#eff3f4; border-radius:12px; padding:2px 8px; font-size:12px; margin-left:8px; }
    .text { margin:12px 0; }
    img { width:100%; border-radius:16px; margin:12px 0; }
    .cta { background:#1d9bf0; color:white; padding:8px 20px; border-radius:40px; text-decoration:none; display:inline-block; }
    .actions { display:flex; justify-content:space-between; margin-top:12px; color:#536471; font-size:13px; }
    @media (prefers-color-scheme: dark) { body,.card { background:#000; } .card { border-color:#2f3336; } .text { color:#e7e9ea; } }
  </style>
</head>
<body>
<div class="card">
  <div class="header">
    <div class="avatar">📢</div>
    <div><strong>Your Brand</strong> <span style="color:#536471;">@yourhandle · Sponsored</span><span class="promoted">Promoted</span></div>
  </div>
  <div class="text">${escapeHtml(metaDesc)}</div>
  <img src="${escapeHtml(metaImage)}" alt="Ad creative">
  <a href="${escapeHtml(ctaUrl)}" class="cta" target="_blank">${escapeHtml(ctaText)} →</a>
  <div class="actions"><span>💬 128</span><span>🔁 42</span><span>❤️ 1.2K</span><span>📤</span></div>
</div>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}
