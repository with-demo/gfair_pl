// 해외 바이어·국내 바이어·통역원 관리의 연도별 참가 이력 및 XLSX 검증 목업
(()=>{'use strict';
 const targets=new Set(['BAS-03','BAS-05','BAS-07']);
 const labels={'BAS-03':'해외 바이어','BAS-05':'국내 바이어','BAS-07':'통역원'};
 const nameFields={'BAS-03':'바이어명','BAS-05':'바이어명','BAS-07':'통역원명'};
 const screen=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen||'';
 const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const dialog=document.getElementById('dialog'),content=document.getElementById('dialog-content'),app=document.getElementById('app');
 let nextId=1,validated=null;
 const key=(name,dob)=>name.trim().toLocaleLowerCase()+'|'+dob;
 const people=new Map([['BAS-03',[['2026'],['2026','2027'],['2027']]],['BAS-05',[['2027'],['2026','2027'],['2026']]],['BAS-07',[['2026','2027'],['2027'],['2026']]]].map(([id,histories])=>{const source=page(id);return [id,new Map(source.ui.rows.map((r,index)=>[key(r[1],source.ui.birthDates?.[r[0]]||''),{index,years:histories[index]||[]}]))];}));
 const participantStatus=years=>years.has('2026')&&years.has('2027')?'참가 확정':years.has('2027')?'신규':'참가 미정';
 function syncButtons(){if(!targets.has(screen()))return;app?.querySelectorAll('.pagehead [data-action="action"]').forEach(button=>{if(button.dataset.label==='엑셀 양식 다운로드')button.classList.remove('primary');if(button.dataset.label==='엑셀 일괄 업로드')button.classList.add('primary');});const field=[...(app?.querySelectorAll('.filters .field')||[])].find(x=>x.querySelector('span')?.textContent.trim()==='참가 상태'),select=field?.querySelector('select');if(select&&!['전체','참가','미참가'].every((v,i)=>select.options[i]?.value===v))select.replaceChildren(...['전체','참가','미참가'].map(v=>new Option(v,v)));}
 if(app){new MutationObserver(syncButtons).observe(app,{childList:true,subtree:true});syncButtons();}
 function page(id){return (window.GFAIR_SCREENS||[]).flatMap(g=>g.screens).find(s=>s.id===id)}
 function templateColumns(s){const columns=[...s.ui.columns],nameIndex=columns.indexOf(nameFields[s.id]);columns.splice(nameIndex+1,0,'생년월일');return columns}
 function openUpload(id){
  validated=null;const name=labels[id];
  const guide='<p>엑셀 양식을 다운로드하여 '+(id==='BAS-07'?'통역원':'바이어')+' 정보를 입력한 뒤 작성한 파일을 첨부해 주세요.</p><div class="popup-action-row" style="margin-bottom:15px"><button type="button" class="btn" data-master-template>엑셀양식 다운로드</button></div>';
  content.innerHTML=`<div class="dialoghead"><h2>${name} 엑셀 일괄 업로드</h2><button type="button" class="btn ghost" data-action="close">닫기</button></div><div class="dialogbody">${guide}<form data-master-upload-form="${id}"><label class="field"><span>엑셀 파일</span><input type="file" name="file" accept=".xlsx" required><small class="hint">XLSX 파일 1개 · 용량 제한 없음</small></label><button type="submit" class="btn primary">파일 검증</button></form><div data-master-upload-result aria-live="polite"></div></div>`;
  dialog.showModal();
 }
 document.addEventListener('click',async ev=>{
  const b=ev.target.closest('[data-action="action"],[data-master-template]');if(!b||!targets.has(screen()))return;
  const id=screen(),label=b.hasAttribute('data-master-template')?'엑셀 양식 다운로드':b.dataset.label;if(!['엑셀 양식 다운로드','엑셀 일괄 업로드'].includes(label))return;
  ev.preventDefault();ev.stopImmediatePropagation();
  if(label==='엑셀 일괄 업로드'){openUpload(id);return;}
  try{const headers=templateColumns(page(id)),blob=await GFAIRWorkbook.write([headers]),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`G-FAIR_${labels[id]}_엑셀양식_검토용.xlsx`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  catch{const toast=document.getElementById('toast');if(toast){toast.textContent='엑셀 양식 생성에 실패했습니다.';toast.hidden=false;setTimeout(()=>toast.hidden=true,2800)}}
 },true);
 function normalizeDob(value){const dob=String(value??'').trim();if(!/^\d{4}-\d{2}-\d{2}$/.test(dob))return '';const d=new Date(dob+'T00:00:00Z');return !Number.isNaN(d.valueOf())&&d.toISOString().slice(0,10)===dob?dob:''}
 function table(headers,rows){return `<div class="tablewrap"><table><thead><tr>${headers.map(x=>`<th>${esc(x)}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`}
 function setStatus(row,s,status){const i=s.ui.columns.indexOf('참가상태');if(i>=0)row[i]=status;}
 function renderValidation(id,entries,errors){
  const result=content.querySelector('[data-master-upload-result]'),counts={'신규':0,'참가 확정':0,'참가 미정':0};entries.forEach(x=>counts[x.status]++);
  result.innerHTML=`<div class="notice" style="margin-top:16px">검증 결과 · 신규 ${counts['신규']}건 · 참가 확정 ${counts['참가 확정']}건 · 참가 미정 ${counts['참가 미정']}건</div>${errors.length?`<p class="small">${errors.map(esc).join(' · ')}</p>`:''}${table(['이름','생년월일','참가연도','참가 상태','비고'],entries.map(x=>[x.name||'미입력',x.dob||'미확인',x.year||'미확인',x.status,x.note||'']))}<p class="small">현재 탭의 목록에만 반영됩니다. 기존 동일 인물은 한 건으로 유지하고 참가연도를 누적 표시합니다.</p>${entries.some(x=>x.valid)?'<button type="button" class="btn primary" data-master-apply>목록에 반영</button>':''}`;
  validated={id,entries};
 }
 document.addEventListener('submit',async ev=>{
  const form=ev.target;if(!form.matches('[data-master-upload-form]'))return;
  ev.preventDefault();ev.stopImmediatePropagation();validated=null;const id=form.dataset.masterUploadForm,file=new FormData(form).get('file'),result=content.querySelector('[data-master-upload-result]');if(!file)return;
  try{
   if(!/\.xlsx$/i.test(file.name))throw Error('XLSX 파일을 선택해 주세요.');
   if(id==='BAS-03'&&file.size>10*1024*1024)throw Error('엑셀 파일은 10MB 이하로 첨부해 주세요.');
   const s=page(id),headers=templateColumns(s),rows=await GFAIRWorkbook.read(file),actual=rows[0]||[],missing=headers.filter(x=>!actual.includes(x));if(missing.length)throw Error('양식의 열 이름을 확인해 주세요. 누락: '+missing.join(', '));
   const at=name=>actual.indexOf(name),nameIx=at(nameFields[id]),dobIx=at('생년월일'),yearIx=at('참가연도'),parsed=[];
   rows.slice(1).forEach((row,i)=>{if(!row.some(v=>String(v??'').trim()))return;const name=String(row[nameIx]??'').trim(),dob=normalizeDob(row[dobIx]),year=String(row[yearIx]??'').trim();let note='';if(!name)note='이름 누락';else if(!dob)note='생년월일 형식 확인 필요 (YYYY-MM-DD)';else if(!/^20\d{2}$/.test(year))note='참가연도 확인 필요';parsed.push({line:i+2,name,dob,year,raw:row,headers:actual,note,valid:!!name&&!!dob&&/^20\d{2}$/.test(year)})});
   if(!parsed.length)throw Error('검증할 데이터 행이 없습니다.');
   const byIdentity=new Map();parsed.filter(x=>x.valid).forEach(x=>{const k=key(x.name,x.dob);if(!byIdentity.has(k))byIdentity.set(k,[]);byIdentity.get(k).push(x)});
   const old=people.get(id)||new Map();
   parsed.forEach(x=>{if(!x.valid){x.status='참가 미정';return;}const prior=old.get(key(x.name,x.dob)),same=byIdentity.get(key(x.name,x.dob)),years=new Set([...(prior?.years||[]),...same.map(r=>r.year)]);x.status=participantStatus(years);});
   renderValidation(id,parsed,[]);
  }catch(error){validated=null;result.innerHTML=`<div class="notice danger" style="margin-top:16px">${esc(error.message||'파일을 확인할 수 없습니다.')}</div>`;}
 },true);
 document.addEventListener('click',ev=>{
  if(ev.target.closest('[data-master-apply]')){
   if(!validated||validated.id!==screen())return;const id=validated.id,s=page(id),state=people.get(id)||new Map(),entries=validated.entries,groups=new Map();
   entries.filter(x=>x.valid).forEach(x=>{const k=key(x.name,x.dob);if(!groups.has(k))groups.set(k,[]);groups.get(k).push(x)});
   const validEntries=entries.filter(x=>x.valid),isFull2027Upload=validEntries.length>0&&validEntries.every(x=>x.year==='2027');
   if(isFull2027Upload)state.forEach((person,k)=>{if(person.years.includes('2026')&&!groups.has(k)){person.years=person.years.filter(year=>year!=='2027');const row=s.ui.rows[person.index];if(row)setStatus(row,s,participantStatus(new Set(person.years)));}});
   groups.forEach((items,k)=>{
    const prior=state.get(k),years=new Set([...(prior?.years||[]),...items.map(x=>x.year)]),latest=items.slice().sort((a,b)=>a.year.localeCompare(b.year)).at(-1),data=latest.raw,row=s.ui.columns.map(column=>{const ix=latest.headers?.indexOf(column)??-1;return ix>=0?String(data[ix]??'').trim():''});
    const nameIx=s.ui.columns.indexOf(nameFields[id]),yearIx=s.ui.columns.indexOf('참가연도');if(row[0]==='')row[0]=prior?s.ui.rows[prior.index][0]:`DEMO-${id.slice(-2)}-${String(nextId++).padStart(3,'0')}`;if(nameIx>=0)row[nameIx]=latest.name;if(yearIx>=0)row[yearIx]=[...years].sort().join(', ');
    const status=participantStatus(years);setStatus(row,s,status);
    let index=prior?.index??-1;if(prior)row[0]=s.ui.rows[index][0];else if(!row[0])row[0]=`DEMO-${id.slice(-2)}-${String(nextId++).padStart(3,'0')}`;if(index>=0)s.ui.rows[index]=row;else{index=s.ui.rows.length;s.ui.rows.push(row)}state.set(k,{index,years:[...years]});s.ui.birthDates??={};s.ui.birthDates[row[0]]=latest.dob;
   });
   state.forEach(person=>{const row=s.ui.rows[person.index];if(row)setStatus(row,s,participantStatus(new Set(person.years)));});
   people.set(id,state);dialog.close();validated=null;
   const toast=document.getElementById('toast');if(toast){toast.textContent='참가자 목록을 갱신했습니다. 서버에는 저장되지 않았습니다.';toast.hidden=false;setTimeout(()=>toast.hidden=true,2800)}
  }
 },true);
})();
