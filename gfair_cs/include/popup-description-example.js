(()=>{
 const modal=document.getElementById('dialog');if(!modal)return;
 const route=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/popup-description-example.css?v=live-20261021',document.currentScript.src);document.head.append(css);
 function reset(){if(!window.MOCKUP_DESCRIPTION_CONTEXT)return;window.MOCKUP_DESCRIPTION_CONTEXT=null;modal.classList.remove('popup-description-live');window.dispatchEvent(new Event('description-context-changed'));}
 function enhance(){
  const host=document.getElementById('dialog-content'),head=host?.querySelector('.dialoghead');if(route()!=='SET-03'||!modal.open||!head||!host.querySelector('.detaildata'))return;
  if(head.querySelector('[data-popup-description]'))return;
  const badge=document.createElement('small');badge.textContent='SET-03-P01';badge.className='popup-example-id';head.querySelector('h2,h3')?.append(badge);
  const button=document.createElement('button');button.type='button';button.className='btn popup-example-toggle';button.dataset.popupDescription='';button.textContent='설명';head.append(button);
  button.addEventListener('click',()=>{
   if(window.MOCKUP_DESCRIPTION_CONTEXT){reset();button.textContent='설명';modal.close();modal.showModal();return;}
   window.MOCKUP_DESCRIPTION_CONTEXT={id:'SET-03-P01',title:'로그 상세',summary:'접근·개인정보·변경 로그 목록에서 선택한 기록의 상세 내용을 확인합니다. 작업 일시, 사용자, 대상, 처리 내용과 결과를 조회하며, 닫으면 기존 검색·목록 상태로 돌아갑니다.'};
   modal.close();modal.show();modal.classList.add('popup-description-live');button.textContent='설명 닫기';window.dispatchEvent(new Event('description-context-changed'));window.dispatchEvent(new Event('annotation-open'));
  });
 }
 window.addEventListener('annotation-select-scope',()=>{if(route()==='SET-03'&&modal.open&&!window.MOCKUP_DESCRIPTION_CONTEXT)modal.querySelector('[data-popup-description]')?.click();});
 new MutationObserver(enhance).observe(modal,{attributes:true,attributeFilter:['open'],childList:true,subtree:true});modal.addEventListener('close',()=>{if(!modal.open)reset();});window.addEventListener('hashchange',()=>{reset();if(modal.open)modal.close();});enhance();
})();
