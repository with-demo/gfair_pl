// 기존 상세 동작을 유지하고 일부 목록은 이름만 눌러 이동한다.
(()=>{
 const root=document.getElementById('app');if(!root)return;
 const triggers=new WeakMap();
 function prepare(){
  const route=decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen,nameOnly=['BAS-05','BAS-07'].includes(route);
  root.querySelectorAll('#content .tablewrap>table').forEach(table=>{
   const headers=[...table.querySelectorAll('thead tr:last-child>th')];
   const detail=headers.findIndex(th=>th.textContent.trim()==='상세');
   if(detail>=0){
    table.querySelectorAll('tbody>tr').forEach(row=>{
     const cell=row.children[detail];
     if(row.children.length===1&&row.firstElementChild.colSpan>1){
      row.firstElementChild.colSpan=Math.max(1,row.firstElementChild.colSpan-1);return;
     }
     if(!cell)return;
     const trigger=cell.querySelector('button,a[href]');
     if(trigger){
      trigger.hidden=true;trigger.tabIndex=-1;trigger.setAttribute('aria-hidden','true');
      trigger.dataset.listRowTrigger='';row.firstElementChild.append(trigger);triggers.set(row,trigger);
     }
     cell.remove();
    });
    headers[detail].remove();
    const cols=table.querySelectorAll(':scope>colgroup>col');
    if(cols.length===headers.length)cols[detail].remove();
   }
   table.querySelectorAll('tbody>tr').forEach(row=>{
    const trigger=triggers.get(row)||row.querySelector('[data-list-row-trigger],a.notice-title');
    if(nameOnly&&trigger){
     if(row.hasAttribute('data-list-name-navigation'))return;
     const index=[...table.querySelectorAll('thead tr:last-child>th')].findIndex(th=>/바이어명|통역원명/.test(th.textContent)),cell=row.cells[index];if(!cell)return;
     const name=cell.textContent.trim();trigger.hidden=false;trigger.tabIndex=0;trigger.removeAttribute('aria-hidden');trigger.removeAttribute('data-list-row-trigger');trigger.className='list-name-link';trigger.textContent=name;trigger.setAttribute('aria-label',name+' 상세');cell.replaceChildren(trigger);
     row.removeAttribute('data-list-row-navigation');row.removeAttribute('tabindex');row.removeAttribute('aria-label');row.dataset.listNameNavigation='';return;
    }
    if(!trigger||row.dataset.listRowNavigation)return;
    triggers.set(row,trigger);row.dataset.listRowNavigation='';row.tabIndex=0;
    row.setAttribute('aria-label','상세 보기: '+row.textContent.trim().replace(/\s+/g,' ').slice(0,100));
    const index=[...table.querySelectorAll('thead tr:last-child>th')].findIndex(th=>/제목|바이어명|통역원명|기업명|참가기업|이름|그룹명/.test(th.textContent));const name=row.cells[index>=0?index:0];if(name&&!name.querySelector('a,button:not([hidden])'))name.classList.add('list-clickable-text');
   });
  });
 }
 function activate(event){
  const row=event.target.closest('tr[data-list-row-navigation]');
  if(!row||event.target.closest('button,a,input,select,textarea,label,summary,[role="button"],[contenteditable="true"]'))return;
  if(event.type==='keydown'&&(event.target!==row||!['Enter',' '].includes(event.key)))return;
  if(event.type==='click'&&(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey||window.getSelection()?.toString()))return;
  const trigger=triggers.get(row);if(!trigger||trigger.disabled)return;
  if(event.type==='keydown')event.preventDefault();
  trigger.click();
 }
 root.addEventListener('click',activate);root.addEventListener('keydown',activate);
 new MutationObserver(prepare).observe(root,{childList:true,subtree:true});prepare();
})();
