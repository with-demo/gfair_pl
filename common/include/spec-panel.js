(()=>{
 const app=document.getElementById('app');
 if(!app)return;
 const base=new URL('.',document.currentScript.src);
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/spec-panel.css?v=projects-20261021-1',base);document.head.append(css);
 const toolbar=document.createElement('div');toolbar.className='ui-spec-toolbar';toolbar.hidden=true;
 toolbar.innerHTML='<div class="ui-spec-identity"><strong>With / 기획팀 SB</strong><select class="ui-spec-screen-picker" data-spec="screen" aria-label="목업 화면 선택"></select><button type="button" data-spec="screen-search">화면검색</button><span class="ui-spec-preview">예시 데이터 · 검토용</span></div><div class="ui-spec-actions"><label>사용구분 <select aria-label="사용구분"></select></label><button type="button" data-spec="refresh">새로고침</button><button type="button" data-spec="numbers">번호 숨기기</button><button type="button" data-spec="full">전체보기</button><button type="button" data-spec="close">닫기</button><span class="ui-spec-status" role="status"></span></div>';
 const screenPicker=toolbar.querySelector('[data-spec=screen]');
 (window.GFAIR_SCREENS||[]).forEach(group=>{
  const section=document.createElement('optgroup');section.label=group.name;
  group.screens.forEach(screen=>{const option=document.createElement('option');option.value=screen.id;option.textContent=screen.id+' : '+(screen.id==='NTC-01'?'공지사항 목록':screen.title);section.append(option);});screenPicker.append(section);
 });
 const overview=document.createElement('option');overview.value='screens';overview.textContent='SCREEN-LIST : 전체 화면 목록';screenPicker.append(overview);
 const layout=document.createElement('div');layout.className='ui-spec-layout';app.before(toolbar,layout);layout.append(app);
 const measureToolbar=()=>document.documentElement.style.setProperty('--sb-toolbar-height',toolbar.getBoundingClientRect().height+'px');
 new ResizeObserver(measureToolbar).observe(toolbar);measureToolbar();
 const panel=document.createElement('aside');panel.className='ui-spec-panel';panel.setAttribute('aria-label','Description');panel.hidden=true;layout.append(panel);
 let closed=true,full=false,numbers=true;
 const status=toolbar.querySelector('.ui-spec-status');
 function revisionAccountName(entry){const actual=entry.account||entry.accountName||'';return (window.GFAIR_REVISION_ACCOUNT_NAMES||{})[actual]||entry.accountName||actual;}
 function showHistory(){
  let modal=document.getElementById('revision-history-dialog');
  if(!modal){modal=document.createElement('dialog');modal.id='revision-history-dialog';modal.className='ui-revision-dialog';document.body.append(modal);}
  modal.replaceChildren();const heading=document.createElement('h2');heading.textContent='화면 / Description 수정 이력';modal.append(heading);
  const route=decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
  const releases=(window.GFAIR_REVISION_HISTORY||[]).filter(entry=>entry.release&&(!entry.screenId||entry.screenId===route));
  heading.textContent='개발 전달 이력';
  const list=document.createElement('ul');
  if(!releases.length){const empty=document.createElement('li');empty.textContent='등록된 수정 이력이 없습니다.';list.append(empty);}
  releases.forEach(entry=>{const item=document.createElement('li'),meta=document.createElement('strong'),summary=document.createElement('p');meta.textContent=entry.date+' / '+revisionAccountName(entry)+(entry.version?' · '+(entry.fromVersion?entry.fromVersion+' → ':'')+entry.version:'');summary.textContent=entry.summary;item.append(meta,summary);if(entry.changes){const changes=document.createElement('ul');entry.changes.forEach(text=>{const change=document.createElement('li');change.textContent=text;changes.append(change);});item.append(changes);}if(entry.note){const note=document.createElement('p');note.textContent=entry.note;item.append(note);}list.append(item);});modal.append(list);
  const close=document.createElement('button');close.type='button';close.className='ui-revision-close';close.textContent='×';close.setAttribute('aria-label','수정 이력 닫기');close.title='닫기';close.addEventListener('click',()=>modal.close());const header=document.createElement('div');header.className='ui-revision-header';header.append(heading,close);modal.prepend(header);modal.showModal();
 }


 function draw(){
  panel.replaceChildren();
  const version=document.createElement('footer');version.className='ui-spec-version';
  const revisionButton=document.createElement('button');revisionButton.type='button';
  const route=decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
  const latest=(window.GFAIR_REVISION_HISTORY||[]).find(entry=>entry.screenId===route);
  revisionButton.textContent=latest?'HTML '+latest.version+' · '+latest.date+' / '+revisionAccountName(latest):'수정 이력';
  revisionButton.title='수정 이력 보기';revisionButton.addEventListener('click',showHistory);version.append(revisionButton);panel.append(version);
  window.dispatchEvent(new Event('annotation-render'));
 }
 function sync(){
  // Former overview copy must not reappear inside the mockup after removing the panel content.
  app.querySelectorAll('#content .pagehead .subtitle,#content .management-note,#content .attendance-demo-note,#content .statistics-footnote,#content .notice-save-note,#content .notice-file-note').forEach(el=>{el.dataset.descriptionOverview='';});
  const route=decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen,overview=route==='screens';
  const hasAnnotations=!!window.GFAIR_COLLAB?.records.length;
  toolbar.hidden=false;panel.hidden=closed||overview;screenPicker.value=route;
  ['refresh','numbers','full','close'].forEach(action=>{toolbar.querySelector('[data-spec='+action+']').hidden=overview||(action==='numbers'&&!hasAnnotations);});status.hidden=overview;
  layout.classList.toggle('with-spec',!closed&&!overview);layout.classList.toggle('spec-full',!closed&&!overview&&full);
  toolbar.querySelector('[data-spec=close]').textContent=closed?'열기':'닫기';
  toolbar.querySelector('[data-spec=full]').textContent=full&&!closed?'목업과 함께 보기':'전체보기';
  toolbar.querySelector('[data-spec=numbers]').textContent=numbers?'번호 숨기기':'번호 표시';
  const role=document.getElementById('role-picker'),select=toolbar.querySelector('.ui-spec-actions select');
  if(role){if(!select.options.length)select.innerHTML=role.innerHTML;select.value=role.value;}
  status.textContent='';
  window.dispatchEvent(new CustomEvent('annotation-sync',{detail:{closed,full,numbers}}));
 }
 toolbar.addEventListener('click',event=>{
  const action=event.target.dataset.spec;
  if(action==='screen-search'){full=false;location.hash='screens';}
  if(action==='refresh'){closed=false;draw();}
  if(action==='numbers')numbers=!numbers;
  if(action==='full'){closed=false;full=!full;}
  if(action==='close'){closed=!closed;full=false;}
  sync();
 });
 toolbar.addEventListener('change',event=>{
  if(event.target.dataset.spec==='screen'){full=false;location.hash=event.target.value;sync();return;}
  if(event.target===toolbar.querySelector('.ui-spec-actions select')){
   const role=document.getElementById('role-picker'),form=document.getElementById('filter-form');
   const values=form?Array.from(new FormData(form)):[];
   if(role){role.value=event.target.value;role.dispatchEvent(new Event('change',{bubbles:true}));}

   requestAnimationFrame(()=>{
    const next=document.getElementById('filter-form');
    if(next)values.forEach(([name,value])=>{const field=next.elements.namedItem(name);if(field&&(!(field instanceof HTMLSelectElement)||Array.from(field.options).some(o=>o.value===value)))field.value=value;});
   });
  }
 });

 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&full){full=false;sync();}});
 new MutationObserver(sync).observe(app,{childList:true,subtree:true});
 window.addEventListener('revision-history-loaded',draw);
 window.addEventListener('collaboration-updated',sync);
 window.addEventListener('annotation-open',()=>{closed=false;sync();});
 window.addEventListener('hashchange',()=>{draw();sync();});draw();sync();
})();
