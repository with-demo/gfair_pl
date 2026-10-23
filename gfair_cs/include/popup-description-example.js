(()=>{'use strict';
 const modal=document.getElementById('dialog');if(!modal)return;
 const route=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/popup-description-example.css?v=popup-standard-20261023',document.currentScript.src);document.head.append(css);
 // Append new types; never reorder slots. IDs remain stable across browsers.
 const types=[/^(?!하위).*엑셀.*업로드/,/하위.*업로드/,/삭제/,/승인/,/반려/,/발송/,/QR 일괄/,/QR 발급/,/QR.*확인/,/임시 계정 발급/,/재발급/,/설문 미리보기/,/그룹 정보 및 메뉴 권한/,/로그아웃/,/통역 요청 수락/,/긴급/,/인증/,/출석|출결/,/보정/,/상태 변경/,/동기화/,/저장/,/첨부|촬영/,/검증/,/호출/,/처리 이력/,/운영 담당자 문의/,/내정보/,/개별 설문 응답/,/주관식 응답/,/작업 확인/,/매칭/,/QR/,/업로드/,/처리/,/비활성화/,/활성화/];
 function popupId(title){const slot=types.findIndex(pattern=>pattern.test(title));if(slot<0)console.warn('공통 팝업 유형을 등록해 주세요:',title);return route().replace(/-p\d+$/,'')+'-p'+String(slot<0?99:slot+1).padStart(2,'0');}
 function reset(){if(!window.MOCKUP_DESCRIPTION_CONTEXT)return;window.MOCKUP_DESCRIPTION_CONTEXT=null;modal.classList.remove('popup-description-live');window.dispatchEvent(new Event('description-context-changed'));}
 function actions(host){host.querySelectorAll('.dialogbody button,.group-access-body button').forEach(button=>{if(button.closest('.popup-action-row,table')||button.parentElement.matches('.dialogactions,.group-access-footer')||button.parentElement.querySelector('input:not([type=file]),select,textarea'))return;const row=document.createElement('div');row.className='popup-action-row';button.before(row);row.append(button);});}
 function enhance(){
  const host=document.getElementById('dialog-content'),head=host?.querySelector('.dialoghead,.group-access-heading');if(!modal.open||!head)return;
  actions(host);if(modal.querySelector(':scope>.popup-review-tools'))return;
  const title=(head.querySelector('h2,h3')?.textContent||'작업 확인').trim(),id=popupId(title);modal.dataset.popupId=id;modal.dataset.screenId=id;modal.classList.add('standard-popup');
  const tools=document.createElement('div');tools.className='popup-review-tools';const badge=document.createElement('span');badge.textContent=id;badge.className='popup-example-id';
  const button=document.createElement('button');button.type='button';button.className='btn popup-example-toggle';button.dataset.popupDescription='';button.textContent='설명';tools.append(badge,button);modal.prepend(tools);
  let close=head.querySelector('button');if(!close){close=document.createElement('button');close.type='button';close.addEventListener('click',()=>modal.close());head.append(close);}
  close.textContent='×';close.className='popup-close';close.dataset.popupClose='';close.setAttribute('aria-label','팝업 닫기');close.title='닫기';
  button.addEventListener('click',()=>{if(window.MOCKUP_DESCRIPTION_CONTEXT){reset();button.textContent='설명';modal.close();modal.showModal();return;}window.MOCKUP_DESCRIPTION_CONTEXT={id,title,summary:title+' 팝업입니다. 오른쪽 위 X 또는 Esc로 닫으면 기존 화면을 유지합니다. 실행 버튼은 본문과 15px 간격으로 가운데 정렬합니다.'};modal.close();modal.show();modal.classList.add('popup-description-live');button.textContent='설명 닫기';window.dispatchEvent(new Event('description-context-changed'));window.dispatchEvent(new Event('annotation-open'));});
 }
 window.GFAIR_POPUP_ID=popupId;
 window.addEventListener('annotation-select-scope',()=>{if(modal.open&&!window.MOCKUP_DESCRIPTION_CONTEXT)modal.querySelector('[data-popup-description]')?.click();});
 new MutationObserver(enhance).observe(modal,{attributes:true,attributeFilter:['open'],childList:true,subtree:true});
 modal.addEventListener('close',()=>{if(!modal.open){reset();modal.querySelector(':scope>.popup-review-tools')?.remove();modal.classList.remove('standard-popup');delete modal.dataset.popupId;delete modal.dataset.screenId;}});
 window.addEventListener('hashchange',()=>{reset();if(modal.open)modal.close();});enhance();
})();
