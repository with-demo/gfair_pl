(()=>{
 const app=document.getElementById('app');
 if(!app)return;
 const base=new URL('.',document.currentScript.src);
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/spec-panel.css?v=description-height-20261021-6',base);document.head.append(css);
 const toolbar=document.createElement('div');toolbar.className='ui-spec-toolbar';toolbar.hidden=true;
 toolbar.innerHTML='<div class="ui-spec-identity"><strong>With / 기획팀 SB</strong><select class="ui-spec-screen-picker" data-spec="screen" aria-label="목업 화면 선택"></select><button type="button" data-spec="screen-search">화면검색</button><span class="ui-spec-preview">예시 데이터 · 검토용</span></div><div class="ui-spec-actions"><label>사용구분 <select aria-label="사용구분"></select></label><button type="button" data-spec="close">닫기</button><span class="ui-spec-status" role="status"></span></div>';
 const screenPicker=toolbar.querySelector('[data-spec=screen]');
 (window.GFAIR_SCREENS||[]).forEach(group=>{
  const section=document.createElement('optgroup');section.label=group.name;
  group.screens.forEach(screen=>{const option=document.createElement('option');option.value=screen.id;option.textContent=screen.id+' : '+screen.title;section.append(option);});screenPicker.append(section);
 });
 const overview=document.createElement('option');overview.value='screens';overview.textContent='SCREEN-LIST : 전체 화면 목록';screenPicker.append(overview);
 const layout=document.createElement('div');layout.className='ui-spec-layout';app.before(toolbar,layout);layout.append(app);
 const measureToolbar=()=>document.documentElement.style.setProperty('--sb-toolbar-height',toolbar.getBoundingClientRect().height+'px');
 new ResizeObserver(measureToolbar).observe(toolbar);measureToolbar();
 const panel=document.createElement('aside');panel.className='ui-spec-panel';panel.setAttribute('aria-label','Description');panel.hidden=true;layout.append(panel);
 const visibilityKey='mockup.description.open.'+(document.body.dataset.project||'default');
 const numbersKey='mockup.description.numbers.'+(document.body.dataset.project||'default');
 let closed=sessionStorage.getItem(visibilityKey)!=='true',full=false,numbers=sessionStorage.getItem(numbersKey)!=='false';
 const numbersButton=document.createElement('button');numbersButton.type='button';numbersButton.dataset.spec='numbers';numbersButton.title='목업 화면의 설명 번호 핀만 표시하거나 숨깁니다.';toolbar.querySelector('[data-spec=close]').before(numbersButton);
 const status=toolbar.querySelector('.ui-spec-status');
 function draw(){panel.replaceChildren();window.dispatchEvent(new Event('annotation-render'));}
 function sync(){
  // Former overview copy must not reappear inside the mockup after removing the panel content.
  app.querySelectorAll('#content .pagehead .subtitle,#content .management-note,#content .attendance-demo-note,#content .statistics-footnote,#content .notice-save-note,#content .notice-file-note').forEach(el=>{el.dataset.descriptionOverview='';});
  const route=decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen,overview=route==='screens';
  toolbar.hidden=false;panel.hidden=closed||overview;screenPicker.value=route;
  ['close','numbers'].forEach(action=>{toolbar.querySelector('[data-spec='+action+']').hidden=overview;});status.hidden=overview;
  layout.classList.toggle('with-spec',!closed&&!overview);layout.classList.toggle('spec-full',!closed&&!overview&&full);
  toolbar.querySelector('[data-spec=close]').textContent=closed?'디스크립션 열기':'디스크립션 닫기';
  numbersButton.textContent=numbers?'번호 숨기기':'번호 보이기';numbersButton.setAttribute('aria-pressed',String(numbers));
  const role=document.getElementById('role-picker'),select=toolbar.querySelector('.ui-spec-actions select');
  if(role){if(!select.options.length)select.innerHTML=role.innerHTML;select.value=role.value;}
  status.textContent='';
  window.GFAIR_DESCRIPTION_VIEW={closed,full,numbers};
  window.dispatchEvent(new CustomEvent('annotation-sync',{detail:window.GFAIR_DESCRIPTION_VIEW}));
 }
 toolbar.addEventListener('click',event=>{
  const action=event.target.dataset.spec;
  if(action==='screen-search'){full=false;location.hash='screens';}
  if(action==='close'){closed=!closed;full=false;sessionStorage.setItem(visibilityKey,String(!closed));}
  if(action==='numbers'){numbers=!numbers;sessionStorage.setItem(numbersKey,String(numbers));}
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

 window.addEventListener('collaboration-updated',sync);
 window.addEventListener('annotation-open',()=>{closed=false;sessionStorage.setItem(visibilityKey,'true');sync();});
 window.addEventListener('hashchange',()=>{draw();sync();});draw();sync();
})();
