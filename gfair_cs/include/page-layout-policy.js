// 모든 사용구분의 페이지 제목·작업 버튼에 적용하는 최우선 공통 규칙.
(()=>{'use strict';
 const app=document.getElementById('app');if(!app)return;
 const sources='.head-actions,.formfooter,.notice-bottom-actions,.group-detail-actions,.group-access-footer,.management-actions,.workflow-page-nav,.workflow-page-body>.dialogactions,form>.actions';
 const operation=/^(목록(?:으로|으로 돌아가기)?|목록 보기|저장|임시\s?저장|취소|신규 행사|새 일지)$|(?:등록|수정|삭제|제출)$/;
 const tool=/다운로드|동기화|업로드|새로고침|엑셀|출력/;
 let scheduled=false;
 function apply(){
  scheduled=false;const main=app.querySelector('#content');if(!main)return;
  const route=decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
  const meta=(window.GFAIR_SCREENS||[]).flatMap(g=>g.screens).find(s=>s.id===route);
  if(['COM-01','screens'].includes(route))return;
  const shortNames={'목록으로':'목록','목록 보기':'목록','목록으로 돌아가기':'목록','상세보기':'상세','상세 보기':'상세','자료실 등록':'등록','FAQ 등록':'등록','공지 등록':'등록','관리자 등록':'등록','그룹 등록':'등록','등록하기':'등록','저장하기':'저장','수정하기':'수정','삭제하기':'삭제'};
  main.querySelectorAll('button.btn,a.btn').forEach(b=>{const name=shortNames[b.textContent.trim()];if(name&&b.childElementCount===0)b.textContent=name});
  const detail=meta&& !['list','matrix','dashboard'].includes(meta.kind)||!!main.querySelector('.event-information,.notice-board[data-notice-view="detail"],.notice-board[data-notice-view="editor"],.workflow-page-body,form:not(.filters):not(#filter-form):not(#journal-filter):not([role=search])');
  if(detail)main.querySelectorAll('section>h2,section>h3,.panel>.panelhead>h2,form>.panelhead>h2,.journal-section-head>h2').forEach(h=>{
   if(h.closest('.filters,.survey-paper,.tablewrap'))return;
   if(!h.classList.contains('page-section-title'))h.classList.add('page-section-title');
   if(/^\s*[O○●]\s+/.test(h.textContent)&&h.childElementCount===0)h.textContent=h.textContent.replace(/^\s*[O○●]\s+/,'');
   const panel=h.parentElement.matches('.panelhead,.journal-section-head')?h.parentElement.parentElement:h.parentElement;
   if(panel.classList.contains('panel')){
    const header=h.parentElement;
    panel.classList.add('page-information-body');
    if(header!==panel&&header.children.length>1){panel.before(header);header.classList.remove('panelhead');header.classList.add('page-information-heading');}
    else{panel.before(h);if(header!==panel)header.remove();}
   }
  });
  let bar=main.querySelector(':scope>.page-bottom-actions');
  const candidates=[...new Set([...main.querySelectorAll(sources+(!detail?',.panelhead':''))].flatMap(group=>[...group.querySelectorAll('button,a.btn,input[type=submit]')]))].filter(b=>!b.closest('.tablewrap,table,dialog,.page-bottom-actions')&&!b.matches('[hidden]'));
  const footer='.formfooter,.notice-bottom-actions,.group-detail-actions,.group-access-footer,form>.actions';
  const moves=candidates.filter(b=>b.closest(footer)||(operation.test((b.textContent||b.value||'').trim())||!detail&&b.closest('.head-actions,.panelhead'))&&!tool.test(b.textContent)).sort((a,b)=>Number(!!b.closest(footer))-Number(!!a.closest(footer)));
  if(!bar&&moves.length){bar=document.createElement('div');bar.className='page-bottom-actions';bar.setAttribute('aria-label','페이지 작업');main.append(bar)}
  if(!bar)return;
  // 페이지 작업은 문구별 하나만 남기고 원래 하단 폼 버튼을 우선한다.
  const key=b=>{const text=(b.textContent||b.value||'').trim();return /^(목록|목록으로|목록 보기|목록으로 돌아가기)$/.test(text)?'list':text;};
  const seen=new Set([...bar.children].map(key));
  for(const b of moves){
   const original=b.parentElement,k=key(b);
   if(seen.has(k)){b.remove();if(!original.children.length)original.classList.add('page-action-source-empty');continue}
   const form=b.form;
   if(form&&!b.hasAttribute('form')){let id=form.getAttribute('id');if(!id){id='page-action-form-'+route+'-'+[...main.querySelectorAll('form')].indexOf(form);form.setAttribute('id',id)}b.setAttribute('form',id)}
   seen.add(k);bar.append(b);
   if(!original.children.length)original.classList.add('page-action-source-empty');
  }
  if(route==='JNL-05'){const request=bar.querySelector('[data-export-request]');if(request){request.style.marginRight='auto';bar.prepend(request);}}
  if(route==='JNL-14'){
   bar.querySelectorAll('a[href="#JNL-05"]').forEach(link=>{if(link.textContent.trim()!=='등록')link.textContent='등록';});
   const buttons=[...bar.querySelectorAll('[data-jnl14-bulk]')];
   if(buttons.length){let left=bar.querySelector('.jnl14-bulk-actions');if(!left){left=document.createElement('div');left.className='jnl14-bulk-actions';bar.prepend(left);}
    const count=main.querySelector('[data-jnl14-count]')?.parentElement;if(count&&count.parentElement!==left){const original=count.parentElement;left.prepend(count);if(!original.children.length)original.classList.add('page-action-source-empty');}
    for(const button of buttons)if(button.parentElement!==left)left.append(button);
   }
  }
  for(const b of bar.children){const text=(b.textContent||b.value||'').trim();b.classList.toggle('page-action-delete',/삭제/.test(text));b.classList.toggle('page-action-submit',/제출/.test(text));}
  if(bar!==main.lastElementChild)main.append(bar);
 }
 const schedule=()=>{if(!scheduled){scheduled=true;requestAnimationFrame(apply)}};
 new MutationObserver(schedule).observe(app,{childList:true,subtree:true});
 window.addEventListener('hashchange',schedule);schedule();
})();
