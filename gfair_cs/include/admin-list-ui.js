// 관리자 목록의 표시 방식만 통일하고 기존 행·버튼의 이벤트는 유지한다.
(()=>{'use strict';
 const root=document.getElementById('app');if(!root)return;
 const excluded=new Set(['COM-04','COM-05','COM-06','COM-07','BAS-17','BAS-18','NTC-07']);
 const routes=new Set((window.GFAIR_SCREENS||[]).flatMap(g=>g.screens).filter(s=>s.kind==='list'&&!excluded.has(s.id)).map(s=>s.id));
 ['EVT-01','EVT-02','JNL-BUY','JNL-EXP','SET-05','SURVEY-HOME'].forEach(id=>routes.add(id));
 const prepared=new WeakSet(),collator=new Intl.Collator('ko',{numeric:true,sensitivity:'base'});
 const clean=el=>{const copy=el.cloneNode(true);copy.querySelectorAll('.ui-spec-badge,[data-list-row-trigger]').forEach(e=>e.remove());return copy.textContent.trim().replace(/\s+/g,' ');};
 function enhance(table,main,route){
  if(prepared.has(table))return;
  const panel=table.closest('section.panel');if(!panel)return;
  prepared.add(table);panel.classList.add('admin-list-panel');
  let header=panel.querySelector(':scope>.panelhead');
  if(!header){header=document.createElement('div');header.className='panelhead';panel.prepend(header);}
  const native=table.classList.contains('notice-list');
  let tools=header.querySelector('.admin-list-tools');
  if(!tools){tools=document.createElement('div');tools.className='admin-list-tools';header.append(tools);}
  // 다운로드는 기존 버튼 노드를 이동하여 원래 동작과 속성을 보존한다.
  [...main.querySelectorAll('.pagehead button,.pagehead a,.management-actions button,.panelhead button,.panelhead a')].filter(el=>!el.closest('table,form')&&/다운로드|내려받기|^CSV$|^PDF$/.test(clean(el))).forEach(el=>tools.append(el));
  const bottom=document.createElement('div');bottom.className='admin-list-actions';panel.after(bottom);
  main.querySelectorAll('.pagehead>.head-actions,.pagehead>button,.pagehead>a.btn,.management-actions').forEach(group=>{
   if(group.matches('.management-actions')){[...group.children].filter(el=>el.matches('button,a')).forEach(el=>bottom.append(el));group.remove();}
   else if(group.matches('button,a')||group.querySelector('button,a'))bottom.append(group);
  });
  if(!bottom.children.length)bottom.remove();
  if(native){
   const row=header.querySelector(':scope>.row');if(row)tools.prepend(row);
   return;
  }
  const body=table.tBodies[0];if(!body)return;
  const rows=[...body.rows].filter(row=>row.cells.length>1||row.cells[0]?.colSpan===1&&!row.querySelector('.empty'));
  const title=main.querySelector('h1')?.textContent.trim()||'목록';
  let count=header.querySelector('h2');if(!count){count=document.createElement('h2');header.prepend(count);}
  count.textContent=rows.length+'건의 '+title.replace(/\s*목록$/,'')+' 정보가 조회되었습니다.';
  [...header.children].filter(el=>el!==count&&el!==tools).forEach(el=>{if(!el.querySelector('button,a,select'))el.hidden=true;});
  const headers=[...table.querySelectorAll('thead tr:last-child>th')].map(clean);
  let index=headers.findIndex(t=>/등록일|작성일|제출 일자|최근 응답|응답일시|발생일|일시|일자|날짜/.test(t));
  if(index<0)index=headers.findIndex(t=>/연도|번호|코드|ID/.test(t));if(index<0)index=0;
  const sortName=headers[index]||'목록';
  const sort=document.createElement('select');sort.setAttribute('aria-label',title+' 정렬');
  for(const [value,label] of [['desc','내림차순'],['asc','오름차순']])sort.add(new Option(sortName+' '+label,value));
  const size=document.createElement('select');size.setAttribute('aria-label',title+' 페이지당 표시 개수');
  [10,30,50].forEach(n=>size.add(new Option(n+'건씩 보기',String(n))));
  tools.prepend(sort,size);
  if(route==='BAS-01'){const sync=header.querySelector('[data-action="event-sync"]');if(sync){sync.className='btn';tools.append(sync);}}
  if(route==='BAS-09'){
   const qrDownload=document.createElement('button');qrDownload.type='button';qrDownload.className='btn';qrDownload.textContent='QR 일괄 다운로드';
   qrDownload.addEventListener('click',async()=>{
    const headerCells=[...table.querySelectorAll('thead tr:last-child>th')].map(clean),column=name=>headerCells.indexOf(name),keyIndex=column('연계키'),companyIndex=column('참가기업'),boothIndex=column('부스번호');
    try{
     if(!window.JSZip||typeof window.qrcode!=='function')throw new Error('QR 도구를 불러오지 못했습니다.');
     if(!rows.length)throw new Error('다운로드할 참가기업이 없습니다.');
     const zip=new window.JSZip(),event=document.querySelector('#event-picker')?.value||'G-FAIR KOREA 2027';
     rows.forEach((row,index)=>{
      const value=i=>row.cells[i]?.textContent.trim()||'',id=value(keyIndex)||`COMPANY-${index+1}`,company=value(companyIndex)||id,booth=value(boothIndex)||`BOOTH-${index+1}`;
      const qr=window.qrcode(0,'M');qr.addData(`GFAIR-DEMO|${event}|${id}|${booth}`);qr.make();
      const dataUrl=qr.createDataURL(8,4),base64=dataUrl.slice(dataUrl.indexOf(',')+1),safe=value=>value.replace(/[\\/:*?"<>|]/g,'-').replace(/\s+/g,'_');
      zip.file(`${String(index+1).padStart(3,'0')}_${safe(company)}_${safe(booth)}.gif`,base64,{base64:true});
     });
     const blob=await zip.generateAsync({type:'blob'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='G-FAIR_참가기업_부스QR이미지_검토용.zip';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
     const notice=document.getElementById('toast');if(notice){notice.textContent=`부스별 QR 이미지 ${rows.length}개를 ZIP으로 다운로드했습니다. 목업 QR이며 실제 인증에는 사용할 수 없습니다.`;notice.hidden=false;setTimeout(()=>notice.hidden=true,4000)}
    }catch(error){const notice=document.getElementById('toast');if(notice){notice.textContent=error.message||'QR 이미지 파일을 생성하지 못했습니다.';notice.hidden=false;setTimeout(()=>notice.hidden=true,3000)}}
   });
   tools.append(qrDownload);
  }
  panel.querySelectorAll(':scope>.tablefoot').forEach(el=>el.hidden=true);
  const pagination=document.createElement('nav');pagination.className='admin-list-pagination';pagination.setAttribute('aria-label',title+' 페이지');panel.append(pagination);
  let page=1;
  function paint(){
   const ordered=rows.map((row,i)=>({row,i,key:clean(row.cells[index]||row)})).sort((a,b)=>(sort.value==='asc'?1:-1)*collator.compare(a.key,b.key)||a.i-b.i);
   const perPage=Number(size.value),pages=Math.max(1,Math.ceil(rows.length/perPage));page=Math.min(page,pages);
   observer.disconnect();
   ordered.forEach(({row},i)=>{row.hidden=i<(page-1)*perPage||i>=page*perPage;body.append(row);});
   pagination.replaceChildren();
   const add=(label,target,disabled=false,current=false)=>{const button=document.createElement('button');button.type='button';button.className='btn';button.textContent=label;button.disabled=disabled;button.setAttribute('aria-label',({'<<':'첫 페이지','<':'이전 페이지','>':'다음 페이지','>>':'마지막 페이지'})[label]||label+' 페이지');if(current)button.setAttribute('aria-current','page');button.addEventListener('click',()=>{page=target;paint();});pagination.append(button);};
   add('<<',1,page===1);add('<',page-1,page===1);
   const start=Math.max(1,Math.min(page-2,pages-4)),numbers=[...new Set([1,...Array.from({length:Math.min(5,pages)},(_,i)=>start+i),pages])].sort((a,b)=>a-b);
   numbers.forEach((n,i)=>{if(i&&n>numbers[i-1]+1){const gap=document.createElement('span');gap.textContent='…';pagination.append(gap);}add(String(n),n,false,n===page);});
   add('>',page+1,page===pages);add('>>',pages,page===pages);
   observer.observe(root,{childList:true,subtree:true});
  }
  sort.addEventListener('change',()=>{page=1;paint();});size.addEventListener('change',()=>{page=1;paint();});paint();
 }
 function sync(){
  observer.disconnect();
  try{
   const main=root.querySelector('#content');if(!main)return;
   const route=decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
   const admin=root.querySelector('#role-picker')?.value==='admin';main.classList.toggle('admin-list-layout',admin&&routes.has(route));
   if(!admin||!routes.has(route))return;
   // 상세·등록 폼과 대시보드의 집계 표는 목록 대상으로 처리하지 않는다.
   if(main.querySelector('.notice-editor,[data-notice-view="detail"],[data-public-form="save"],#survey-editor,#survey-history-size,[data-management-form="admin-save"]'))return;
   const table=[...main.querySelectorAll('.tablewrap>table')].find(table=>table.closest('section.panel')&&!table.closest('form'));
   if(table)enhance(table,main,route);
  }finally{observer.observe(root,{childList:true,subtree:true});}
 }
 const observer=new MutationObserver(sync);sync();
})();
