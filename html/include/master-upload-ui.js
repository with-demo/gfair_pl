// 해외 바이어·국내 바이어·통역원 관리의 XLSX 양식 및 업로드 검증 목업
(()=>{'use strict';
 const targets=new Set(['BAS-03','BAS-05','BAS-07']);
 const labels={'BAS-03':'해외 바이어','BAS-05':'국내 바이어','BAS-07':'통역원'};
 const screen=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen||'';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const dialog=document.getElementById('dialog'),content=document.getElementById('dialog-content');
 const app=document.getElementById('app');
 function syncButtons(){if(!targets.has(screen()))return;app?.querySelectorAll('.pagehead [data-action="action"]').forEach(button=>{if(button.dataset.label==='엑셀 양식 다운로드')button.classList.remove('primary');if(button.dataset.label==='엑셀 일괄 업로드')button.classList.add('primary');});}
 if(app){new MutationObserver(syncButtons).observe(app,{childList:true,subtree:true});syncButtons();}
 function openUpload(id){
  const name=labels[id];content.innerHTML=`<div class="dialoghead"><h2>${name} 엑셀 일괄 업로드</h2><button type="button" class="btn ghost" data-action="close">닫기</button></div><div class="dialogbody"><p>제공된 XLSX 양식의 열 이름을 유지해 주세요.</p><p class="small">파일을 검증해 목업에서 확인합니다. 실제 서버 저장이나 일괄 등록은 수행하지 않습니다.</p><form data-master-upload-form="${id}"><label class="field"><span>엑셀 파일</span><input type="file" name="file" accept=".xlsx" required></label><button type="submit" class="btn primary">파일 검증</button></form><div data-master-upload-result aria-live="polite"></div></div>`;
  dialog.showModal();
 }
 document.addEventListener('click',async ev=>{
  const b=ev.target.closest('[data-action="action"]');if(!b||!targets.has(screen()))return;
  const id=screen(),label=b.dataset.label;
  if(!['엑셀 양식 다운로드','엑셀 일괄 업로드'].includes(label))return;
  ev.preventDefault();ev.stopImmediatePropagation();
  if(label==='엑셀 일괄 업로드'){openUpload(id);return;}
  const group=(window.GFAIR_SCREENS||[]).flatMap(g=>g.screens).find(s=>s.id===id),headers=group?.ui?.columns||[];
  try{const blob=await GFAIRWorkbook.write([headers]);const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`G-FAIR_${labels[id]}_엑셀양식_검토용.xlsx`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  catch{const toast=document.getElementById('toast');if(toast){toast.textContent='엑셀 양식 생성에 실패했습니다.';toast.hidden=false;setTimeout(()=>toast.hidden=true,2800)}}
 },true);
 document.addEventListener('submit',async ev=>{
  const form=ev.target;if(!form.matches('[data-master-upload-form]'))return;
  ev.preventDefault();ev.stopImmediatePropagation();const id=form.dataset.masterUploadForm,file=new FormData(form).get('file'),result=content.querySelector('[data-master-upload-result]');
  if(!file)return;
  try{
   if(!/\.xlsx$/i.test(file.name))throw Error('XLSX 파일을 선택해 주세요.');
   const group=(window.GFAIR_SCREENS||[]).flatMap(g=>g.screens).find(s=>s.id===id),expected=group?.ui?.columns||[],rows=await GFAIRWorkbook.read(file),headers=rows[0]||[];
   const missing=expected.filter(header=>!headers.includes(header));
   if(missing.length)throw Error('양식의 열 이름을 확인해 주세요. 누락: '+missing.join(', '));
   const records=rows.slice(1).filter(row=>row.some(cell=>String(cell??'').trim()!=='' )).length;
   result.innerHTML=`<div class="notice" style="margin-top:16px">파일 검증 완료 · 열 ${headers.length}개 일치 · 데이터 ${records}건</div><p class="small">검토용 확인 결과입니다. 실제 정보 저장은 이루어지지 않았습니다.</p>`;
  }catch(error){result.innerHTML=`<div class="notice danger" style="margin-top:16px">${esc(error.message||'파일을 확인할 수 없습니다.')}</div>`;}
 },true);
})();
