// 기존 상세 동작을 보존하면서 목록의 상세 열을 행 클릭으로 전환한다.
(()=>{
 const root=document.getElementById('app');if(!root)return;
 const triggers=new WeakMap();
 function prepare(){
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
    if(!trigger||row.dataset.listRowNavigation)return;
    triggers.set(row,trigger);row.dataset.listRowNavigation='';row.tabIndex=0;
    row.setAttribute('aria-label','상세 보기: '+row.textContent.trim().replace(/\s+/g,' ').slice(0,100));
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
