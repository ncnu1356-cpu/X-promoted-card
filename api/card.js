export default function handler(req, res) {
  const { title, desc, mediaType, mediaData, link, cta } = req.query;

  const metaTitle = title || 'Promoted Post';
  const metaDesc = desc || 'Special offer just for you!';
  const destinationUrl = link || '#';
  const ctaText = cta || 'Learn More';
  const finalMediaType = mediaType || 'image';
  
  // Use uploaded media data (base64)
  const mediaSource = mediaData || (finalMediaType === 'image' ? 'https://via.placeholder.com/800x418.png?text=Ad+Image' : '');

  // Media HTML - clickable (poori video/image clickable hogi)
  const mediaHtml = finalMediaType === 'video' && mediaSource
    ? `<a href="${escapeHtml(destinationUrl)}" target="_blank" style="display:block; cursor:pointer; text-decoration:none;">
         <video autoplay muted loop playsinline style="width:100%; border-radius:16px; margin:12px 0; cursor:pointer;">
           <source src="${escapeHtml(mediaSource)}" type="video/mp4">
           Your browser does not support the video tag.
         </video>
       </a>`
    : `<a href="${escapeHtml(destinationUrl)}" target="_blank" style="display:block; cursor:pointer;">
         <img src="${escapeHtml(mediaSource)}" alt="Ad creative" style="width:100%; border-radius:16px; margin:12px 0; cursor:pointer;">
       </a>`;

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(metaTitle)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  <meta name="twitter:image" content="${escapeHtml(mediaType === 'image' ? mediaSource : 'https://via.placeholder.com/800x418.png?text=Video+Ad')}">
  <meta property="og:title" content="${escapeHtml(metaTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:image" content="${escapeHtml(mediaType === 'image' ? mediaSource : 'https://via.placeholder.com/800x418.png?text=Video+Ad')}">
  <title>${escapeHtml(metaTitle)}</title>
  <style>
    body { margin:0; background:#fff; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; display:flex; justify-content:center; align-items:center; min-height:100vh; }
    .card { max-width:550px; width:100%; border:1px solid #eef2f5; border-radius:20px; padding:12px 16px; background:white; margin:20px; box-shadow:0 2px 8px rgba(0,0,0,0.04); }
    .header { display:flex; gap:12px; align-items:center; }
    .avatar { width:48px; height:48px; background:#1d9bf0; border-radius:50%; display:flex; align-items:center; justify-content:center; color:white; font-weight:bold; font-size:20px; }
    .promoted { background:#eff3f4; border-radius:12px; padding:2px 8px; font-size:12px; margin-left:8px; color:#536471; }
    .text { margin:12px 0; font-size:15px; line-height:1.5; color:#0f1419; }
    .cta { background:#1d9bf0; color:white; font-weight:600; font-size:14px; padding:8px 20px; border-radius:40px; text-decoration:none; display:inline-block; margin:8px 0; transition:background 0.2s; }
    .cta:hover { background:#0c8ae0; }
    .actions { display:flex; justify-content:space-between; margin-top:12px; color:#536471; font-size:13px; max-width:425px; }
    @media (prefers-color-scheme: dark) { body,.card { background:#000; } .card { border-color:#2f3336; } .text { color:#e7e9ea; } .promoted { background:#2f3336; color:#e7e9ea; } .actions { color:#71767b; } }
  </style>
</head>
<body>
<div class="card">
  <div class="header">
    <div class="avatar">📢</div>
    <div><strong>Your Brand</strong> <span style="color:#536471;">@yourhandle · Sponsored</span><span class="promoted">Promoted</span></div>
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
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}
