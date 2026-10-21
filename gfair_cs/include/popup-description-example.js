(()=>{
 const modal=document.getElementById('dialog');if(!modal)return;
 const route=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/popup-description-example.css?v=20261021',document.currentScript.src);document.head.append(css);
 const el=(tag,text)=>{const node=document.createElement(tag);if(text)node.textContent=text;return node;};
 function enhance(){
  const host=document.getElementById('dialog-content'),head=host?.querySelector('.dialoghead');
  if(route()!=='SET-03'||!modal.open||!head||!host.querySelector('.detaildata')){modal.classList.remove('popup-example-open');return;}
  if(head.querySelector('[data-popup-description]'))return;
  modal.classList.remove('popup-example-open');
  const badge=el('small','SET-03-P01');badge.className='popup-example-id';head.querySelector('h2,h3')?.append(badge);
  const button=el('button','설명');button.type='button';button.className='btn popup-example-toggle';button.dataset.popupDescription='';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','popup-example-description');head.append(button);
  const aside=el('aside');aside.id='popup-example-description';aside.className='popup-example-description';aside.hidden=true;
  aside.append(el('h2','[SET-03-P01] 로그 상세'),el('small','팝업 Description · 적용 예시'),el('h3','화면 개요'),el('p','접근·개인정보·변경 로그 목록에서 선택한 기록의 세부 내용을 확인하는 팝업입니다. 작업 일시, 사용자, 대상, 처리 내용과 결과를 확인하고 닫으면 기존 목록으로 돌아갑니다.'));
  const blocks=[['진입 조건','SET-03 목록의 기록을 선택하거나 상세 조회를 실행하면 해당 기록을 표시합니다.'],['표시 항목','선택한 로그의 항목명과 값을 나란히 표시합니다. 실제 표시 항목은 목록 데이터에 정의된 열을 따릅니다.'],['동작','조회 전용으로 제공하며 이 팝업에서는 로그를 수정하지 않습니다. 닫기 버튼 또는 Esc로 닫으면 검색·목록 상태를 유지합니다.']];
  blocks.forEach(([name,text],i)=>{const section=el('section');section.append(el('h3',String(i+1).padStart(2,'0')+' · '+name),el('p',text));aside.append(section);});
  host.append(aside);button.addEventListener('click',()=>{const open=aside.hidden;aside.hidden=!open;modal.classList.toggle('popup-example-open',open);button.setAttribute('aria-expanded',String(open));button.textContent=open?'설명 닫기':'설명';});
 }
 new MutationObserver(enhance).observe(modal,{attributes:true,attributeFilter:['open'],childList:true,subtree:true});modal.addEventListener('close',()=>modal.classList.remove('popup-example-open'));window.addEventListener('hashchange',()=>modal.classList.remove('popup-example-open'));enhance();
})();
