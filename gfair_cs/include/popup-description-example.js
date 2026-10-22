(()=>{
 const modal=document.getElementById('dialog');if(!modal)return;
 const route=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/popup-description-example.css?v=live-20261021',document.currentScript.src);document.head.append(css);
 function reset(){if(!window.MOCKUP_DESCRIPTION_CONTEXT)return;window.MOCKUP_DESCRIPTION_CONTEXT=null;modal.classList.remove('popup-description-live');window.dispatchEvent(new Event('description-context-changed'));}
 function enhance(){
  const host=document.getElementById('dialog-content'),head=host?.querySelector('.dialoghead,.group-access-heading');if(!modal.open||!head)return;
  if(head.querySelector('[data-popup-description]'))return;
  const popupTitle=(head.querySelector('h2,h3')?.textContent||'작업 확인').trim();let hash=0;for(const char of popupTitle)hash=(Math.imul(hash,31)+char.charCodeAt(0))>>>0;const popupId=modal.dataset.screenId||route()+'-P'+hash.toString(36).toUpperCase();const badge=document.createElement('small');badge.textContent=popupId;badge.className='popup-example-id';head.querySelector('h2,h3')?.append(badge);
  const button=document.createElement('button');button.type='button';button.className='btn popup-example-toggle';button.dataset.popupDescription='';button.textContent='설명';head.append(button);
  button.addEventListener('click',()=>{
   if(window.MOCKUP_DESCRIPTION_CONTEXT){reset();button.textContent='설명';modal.close();modal.showModal();return;}
   window.MOCKUP_DESCRIPTION_CONTEXT={id:popupId,title:popupTitle,summary:popupTitle+' 작업에 필요한 내용과 대상을 확인하고 실행하거나 취소합니다. 이 팝업의 입력 항목·버튼별 처리 조건은 영역 설명으로 작성합니다.'};
   modal.close();modal.show();modal.classList.add('popup-description-live');button.textContent='설명 닫기';window.dispatchEvent(new Event('description-context-changed'));window.dispatchEvent(new Event('annotation-open'));
  });
 }
 window.addEventListener('annotation-select-scope',()=>{if(modal.open&&!window.MOCKUP_DESCRIPTION_CONTEXT)modal.querySelector('[data-popup-description]')?.click();});
 new MutationObserver(enhance).observe(modal,{attributes:true,attributeFilter:['open'],childList:true,subtree:true});modal.addEventListener('close',()=>{if(!modal.open){reset();delete modal.dataset.screenId;}});window.addEventListener('hashchange',()=>{reset();if(modal.open)modal.close();});enhance();
})();
