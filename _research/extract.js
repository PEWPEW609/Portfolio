const fs = require('fs');
let html = fs.readFileSync('_research/index.html','utf8');
// Isolate body
const bodyMatch = html.match(/<body[\s\S]*<\/body>/i);
let body = bodyMatch ? bodyMatch[0] : html;
// Remove script/style/svg contents
body = body.replace(/<script[\s\S]*?<\/script>/gi,' ')
           .replace(/<style[\s\S]*?<\/style>/gi,' ')
           .replace(/<svg[\s\S]*?<\/svg>/gi,' [SVG] ');
// Capture headings and their order
const out = [];
const re = /<(h1|h2|h3|h4|h5|h6|p|a|li|button)\b[^>]*>([\s\S]*?)<\/\1>/gi;
let m;
while((m = re.exec(body))){
  let text = m[2].replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/\s+/g,' ').trim();
  if(text && text.length>0 && text.length<200) out.push(m[1].toUpperCase()+': '+text);
}
console.log(out.join('\n'));
