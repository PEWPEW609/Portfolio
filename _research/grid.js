const fs=require('fs');
const html=fs.readFileSync('_research/index.html','utf8');
// Find the projects section: locate first occurrence of '/projects/lakehouse'
const idx=html.indexOf('projects/lakehouse');
const around=html.slice(Math.max(0,idx-2500), idx+200);
// Print style attributes near it
const styles=[...around.matchAll(/style="([^"]{20,300})"/g)].map(m=>m[1]);
console.log('--- styles preceding first project card ---');
styles.slice(-8).forEach((s,i)=>console.log(i, s.replace(/;/g,';\n   ')));
