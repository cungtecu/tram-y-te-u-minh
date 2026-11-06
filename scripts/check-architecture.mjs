import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(),src=path.join(root,'src');
const files=[];
function walk(dir){for(const item of fs.readdirSync(dir,{withFileTypes:true})){const p=path.join(dir,item.name);if(item.isDirectory())walk(p);else if(/\.tsx?$/.test(item.name))files.push(p)}}
walk(src);
const errors=[];
for(const file of files){
 const rel=path.relative(src,file).replaceAll('\\','/');
 const text=fs.readFileSync(file,'utf8');
 const imports=[...text.matchAll(/(?:from\s*|import\s*)['"](@\/[^'"]+)['"]/g)].map(m=>m[1]);
 for(const spec of imports){
  const target=spec.slice(2);
  if(rel.startsWith('components/') && (target.startsWith('features/')||target.startsWith('server/')))errors.push(`${rel}: layout/ui không được import ${target}`);
  if(rel.startsWith('features/')&&target.startsWith('server/'))errors.push(`${rel}: feature không được import server`);
  if(rel.startsWith('features/')&&target.startsWith('features/')){
   const owner=rel.split('/')[1],other=target.split('/')[1];
   if(other!==owner&&other!=='types'&&target.split('/').length>2)errors.push(`${rel}: chỉ được import API công khai feature ${other}`);
  }
  if(target.startsWith('features/') && target.split('/').length>2 && !rel.startsWith('features/'))errors.push(`${rel}: hãy import qua index.ts của feature`);
 }
}
if(errors.length){console.error('Vi phạm kiến trúc:\n'+errors.join('\n'));process.exitCode=1}else console.log(`Đạt kiểm tra ranh giới module (${files.length} files).`);
