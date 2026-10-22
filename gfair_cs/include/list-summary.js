// 사용구분과 화면 유형에 관계없이 데이터 목록의 건수 표시를 통일한다.
(()=>{'use strict';const root=document.getElementById('app');if(!root)return;
function sync(){observer.disconnect();try{root.querySelectorAll('#content .tablewrap>table').forEach(table=>{
 if(table.closest('.admin-list-panel,.notice-panel,form')||!table.tHead||!table.tBodies.length)return;
 const wrap=table.closest('.tablewrap'),panel=wrap.parentElement,rows=[...table.tBodies].flatMap(body=>[...body.rows]).filter(row=>row.cells.length>1&&!row.querySelector('.empty'));
 const foot=wrap.nextElementSibling?.matches('.tablefoot')?wrap.nextElementSibling:null;
 const saved=foot?.textContent.match(/총\s*([\d,]+)건\s*·\s*(\d+)\/(\d+)page/);
 const total=saved?saved[1]:String(rows.length),page=saved?saved[2]:'1',pages=saved?saved[3]:'1';
 let summary=wrap.previousElementSibling;if(!summary?.matches('.list-count-summary')){summary=document.createElement('div');summary.className='list-count-summary';summary.style.cssText='padding:16px 20px;font-size:13px';wrap.before(summary);}
 const html='총 <strong>'+total+'</strong>건 · '+page+'/'+pages+'page';if(summary.innerHTML!==html)summary.innerHTML=html;
 if(foot){[...foot.children].filter(el=>!el.querySelector('button,a,select')).forEach(el=>el.hidden=true);if(!foot.querySelector('button,a,select'))foot.hidden=true;}
 const header=panel.querySelector(':scope>.panelhead');if(header){header.querySelectorAll(':scope>span').forEach(el=>{if(/^\s*(?:총\s*)?\d+(?:건|명)/.test(el.textContent)&&!el.querySelector('button,a,select'))el.hidden=true;});const h=header.querySelector('h2');if(h&&/\d+(?:건|명)\s*$/.test(h.textContent))h.textContent=h.textContent.replace(/\s*\d+(?:건|명)\s*$/,'');}
 });}finally{observer.observe(root,{childList:true,subtree:true});}}
const observer=new MutationObserver(sync);sync();})();
