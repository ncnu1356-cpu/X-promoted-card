export default function handler(req, res) {
  const { title, desc, mediaType, mediaUrl, link, cta } = req.query;

  const metaTitle = title || 'Promoted Post';
  const metaDesc = desc || 'Special offer just for you!';
  const destinationUrl = link || '#';
  const ctaText = cta || 'Learn More';
  const finalMediaType = mediaType || 'image';
  const finalMediaUrl = mediaUrl || 'https://via.placeholder.com/800x418.png?text=Ad+Image';

  // Force X card crawler to parse the GIF as a large responsive image target block
  const twitterCardImage = finalMediaUrl;

  // Render logic for interactive mock dashboard page frame
  const mediaHtml = finalMediaType === 'video' 
    ? `<a href="${escapeHtml(destinationUrl)}" target="_blank" style="display:block; text-decoration:none;">
         <video autoplay muted loop playsinline style="width:100%; max-height: 400px; object-fit: cover; border-radius:16px; margin:12px 0; border: 1px solid #eff3f4; background: #000;">
           <source src="${escapeHtml(finalMediaUrl)}" type="video/mp4">
           Your browser does not support HTML video playbacks.
         </video>
       </a>`
    : `<a href="${escapeHtml(destinationUrl)}" target="_blank" style="display:block;">
         <img src="${escapeHtml(finalMediaUrl)}" alt="Ad Asset" style="width:100%; border-radius:16px; margin:12px 0; border: 1px solid #eff3f4; display:block;">
       </a>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(metaTitle)}</title>
  
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(metaTitle)}">
  <meta name="twitter:description" content="${escapeHtml(metaDesc)}">
  <meta name="twitter:image" content="${escapeHtml(twitterCardImage)}">
  
  <meta property="og:title" content="${escapeHtml(metaTitle)}">
  <meta property="og:description" content="${escapeHtml(metaDesc)}">
  <meta property="og:image" content="${escapeHtml(twitterCardImage)}">
  <meta property="og:type" content="website">

  <style>
    *{margin:0;padding:0;box-sizing:border-box;}
    body{background:#fff;font-family:system-ui, -apple-system, sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px;}
    .card{max-width:550px;width:100%;background:#fff;border-radius:20px;border:1px solid #eef2f5;padding:16px;box-shadow: 0 1px 3px rgba(0,0,0,0.05);}
    .header{display:flex;gap:12px;align-items:center;}
    .avatar{width:48px;height:48px;background:#1d9bf0;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:20px;}
    .brand-info{display:flex; flex-direction:column;}
    .brand-name { font-weight: bold; color: #0f1419; display: flex; align-items: center; gap: 4px; }
    .promoted{background:#eff3f4;border-radius:4px;padding:2px 6px;font-size:11px;color:#536471;font-weight:normal;}
    .text{margin:12px 0;font-size:15px;line-height:1.5;color:#0f1419;word-break: break-word;}
    .cta{background:#1d9bf0;color:#fff;font-weight:600;font-size:14px;padding:10px 24px;border-radius:40px;text-decoration:none;display:inline-block;margin:8px 0;text-align:center;}
    .cta:hover{background:#1a8cd8;}
    .actions{display:flex;justify-content:space-between;margin-top:14px;color:#536471;font-size:13px;border-top: 1px solid #eff3f4; padding-top:12px;}
    @media(prefers-color-scheme:dark){
      body{background:#000;}
      .card{background:#000;border-color:#2f3336;}
      .brand-name{color:#e7e9ea;}
      .text{color:#e7e9ea;}
      .promoted{background:#2f3336;color:#e7e9ea;}
      .actions{color:#71767b; border-color:#2f3336;}
    }
  </style>
</head>
<body>
<div class="card">
  <div class="header">
    <div class="avatar">📢</div>
    <div class="brand-info">
      <div class="brand-name">Featured Ad <span class="promoted">Promoted</span></div>
      <div style="color:#536471; font-size:14px;">@promoted_card</div>
    </div>
  </div>
  <div class="text">${escapeHtml(metaDesc)}</div>
  ${mediaHtml}
  <div style="text-align: right;">
     <a href="${escapeHtml(destinationUrl)}" class="cta" target="_blank">${escapeHtml(ctaText)} →</a>
  </div>
  <div class="actions"><span>💬 248</span><span>🔁 84</span><span>❤️ 2.4K</span><span>📤</span></div>
</div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, m => {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case "'": return '&#39;';
      case '"': return '&quot;';
      default: return m;
    }
  });
}
