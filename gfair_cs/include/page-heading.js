// 모든 사용구분의 페이지 제목과 현재 위치를 같은 행에 배치한다.
(()=>{'use strict';
 const app=document.getElementById('app');if(!app)return;let queued=false;
 function apply(){queued=false;observer.disconnect();try{
  const main=app.querySelector('#content');if(!main)return;
  const route=decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
  const group=(window.GFAIR_SCREENS||[]).find(g=>g.screens.some(s=>s.id===route));
  main.querySelectorAll('.pagehead').forEach(head=>{
   if(head.closest('dialog'))return;const title=head.querySelector('h1');if(!title)return;
   head.classList.add('page-heading-standard');
   let breadcrumb=head.querySelector('.breadcrumb');
   if(!breadcrumb){breadcrumb=document.createElement('nav');breadcrumb.className='breadcrumb';title.parentElement.insertBefore(breadcrumb,title);}
   breadcrumb.setAttribute('aria-label','현재 위치');
   if(!breadcrumb.children.length){
    const category=breadcrumb.textContent.trim()||group?.name||'';breadcrumb.replaceChildren();
    const home=document.createElement('a');home.href='#MON-01';home.textContent='홈';breadcrumb.append(home);
    for(const text of [...new Set([category,title.textContent.trim()].filter(Boolean))]){
     const separator=document.createElement('span');separator.textContent='›';separator.setAttribute('aria-hidden','true');
     const item=document.createElement('span');item.textContent=text;breadcrumb.append(separator,item);
    }
    breadcrumb.lastElementChild?.setAttribute('aria-current','page');
   }
  });
 }finally{observer.observe(app,{childList:true,subtree:true});}}
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(apply)}};
 const observer=new MutationObserver(schedule);observer.observe(app,{childList:true,subtree:true});window.addEventListener('hashchange',schedule);schedule();
})();
