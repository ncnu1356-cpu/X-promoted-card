export default function handler(req, res) {
  const { title, desc, mediaType, mediaUrl, link, cta } = req.query;

  const metaTitle = title || 'Promoted Post';
  const metaDesc = desc || 'Special offer just for you!';
  const destinationUrl = link || '#';
  const ctaText = cta || 'Learn More';
  const finalMediaType = mediaType || 'image';
  const finalMediaUrl = mediaUrl || 'https://via.placeholder.com/800x418.png?text=Ad+Image';

  // Media HTML - clickable for redirect
  const mediaHtml = finalMediaType === 'video' 
    ? `<a href="${escapeHtml(destinationUrl)}" target="_blank" style="display:block; cursor:pointer; text-decoration:none;">
         <video autoplay muted loop playsinline style="width:100%; border-radius:16px; margin:12px 0; cursor:pointer;" poster="https://via.placeholder.com/800x418.png?text=Video+Ad">
           <source src="${escapeHtml(finalMediaUrl)}" type="video/mp4">
           Your browser does not support video.
         </video>
       </a>`
    : `<a href="${escapeHtml(destinationUrl)}" target="_blank" style="display:block; cursor:pointer;">
         <img src="${escapeHtml(finalMediaUrl)}" alt="Ad" style="width:100%; border-radius:16px; margin:12px 0; cursor:pointer;">
       </a>`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(metaTitle)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  <meta name="twitter:image" content="${escapeHtml(finalMediaType === 'image' ? finalMediaUrl : 'https://via.placeholder.com/800x418.png?text=Video+Ad')}">
  <meta property="og:title" content="${escapeHtml(metaTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:image" content="${escapeHtml(finalMediaType === 'image' ? finalMediaUrl : 'https://via.placeholder.com/800x418.png?text=Video+Ad')}">
  <title>${escapeHtml(metaTitle)}</title>
  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#fff;font-family:system-ui;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}
    .card{max-width:550px;width:100%;background:#fff;border-radius:20px;border:1px solid #eef2f5;padding:12px 16px;}
    .header{display:flex;gap:12px;align-items:center;}
    .avatar{width:48px;height:48px;background:#1d9bf0;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;}
    .promoted{background:#eff3f4;border-radius:12px;padding:2px 8px;font-size:12px;margin-left:8px;color:#536471;}
    .text{margin:12px 0;font-size:15px;line-height:1.5;color:#0f1419;}
    .cta{background:#1d9bf0;color:#fff;font-weight:600;font-size:14px;padding:8px 20px;border-radius:40px;text-decoration:none;display:inline-block;margin:8px 0;}
    .actions{display:flex;justify-content:space-between;margin-top:12px;color:#536471;font-size:13px;}
    @media(prefers-color-scheme:dark){body,.card{background:#000;}.card{border-color:#2f3336;}.text{color:#e7e9ea;}.promoted{background:#2f3336;color:#e7e9ea;}.actions{color:#71767b;}}
  </style>
</head>
<body>
<div class="card">
  <div class="header">
    <div class="avatar">📢</div>
    <div><strong>Your Brand</strong> <span style="color:#536471;">@yourhandle</span><span class="promoted">Promoted</span></div>
  </div>
  <div class="text">${escapeHtml(metaDesc)}</div>
  ${mediaHtml}
  <a href="${escapeHtml(destinationUrl)}" class="cta" target="_blank">${escapeHtml(ctaText)} →</a>
  <div class="actions"><span>💬 128</span><span>🔁 42</span><span>❤️ 1.2K</span><span>📤</span></div>
</div>
</body>
</html>`;
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, m => m === '&' ? '&amp;' : m === '<' ? '&lt;' : '&gt;');
}
