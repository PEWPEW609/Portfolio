const fs = require('fs');
let html = fs.readFileSync('_research/index.html','utf8');
const body = (html.match(/<body[\s\S]*<\/body>/i)||[''])[0]
  .replace(/<script[\s\S]*?<\/script>/gi,'')
  .replace(/<style[\s\S]*?<\/style>/gi,'')
  .replace(/<svg[\s\S]*?<\/svg>/gi,'<svg></svg>');
let depth=0; const out=[];
const tokenRe=/<(\/?)([a-zA-Z0-9]+)((?:[^>"']|"[^"]*"|'[^']*')*?)(\/?)>|([^<]+)/g;
let m;
const A=(s,n)=>{const mm=s.match(new RegExp(n+'="([^"]*)"'));return mm?mm[1]:null;};
const selfTags=['img','br','hr','input','source','meta','link','svg','path','use'];
while((m=tokenRe.exec(body))){
  if(m[5]!==undefined){
    const t=m[5].replace(/\s+/g,' ').trim();
    if(t) out.push('  '.repeat(depth)+'· "'+t.slice(0,55)+'"');
    continue;
  }
  const closing=m[1]==='/';
  const tag=m[2].toLowerCase();
  const attrs=m[3]||'';
  const selfClose=m[4]==='/'||selfTags.includes(tag);
  if(closing){ depth=Math.max(0,depth-1); continue; }
  const fn=A(attrs,'data-framer-name');
  const show=fn || ['section','header','footer','nav','main','h1','h2','h3','h4','img','a'].includes(tag);
  if(show){
    let label='  '.repeat(depth)+'<'+tag+'>';
    if(fn) label+=' "'+fn+'"';
    const src=A(attrs,'src'); if(src) label+=' img='+src.split('/').pop().slice(0,28);
    const href=A(attrs,'href'); if(href && href!=='#') label+=' href='+href.slice(0,30);
    out.push(label);
  }
  if(!selfClose) depth++;
}
console.log(out.join('\n'));
