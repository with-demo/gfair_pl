window.GFAIR_INCLUDE.footer=()=>'<footer class="footer"><span>COPYRIGHT 2026 (C) G-FAIR KOREA 구매 및 수출 상담시스템 ALL RIGHTS RESERVED.</span></footer>';
(()=>{const base=document.currentScript.src;const data=document.createElement('script');data.src=new URL('collaboration.js?v=github-auth-20261021-1',base).href;data.onload=()=>{const script=document.createElement('script');script.src=new URL('annotations.js?v=github-auth-20261021-1',base).href;document.head.append(script);};document.head.append(data);})();
(()=>{const base=document.currentScript.src,css=document.createElement('link'),script=document.createElement('script');css.rel='stylesheet';css.href=new URL('../css/group-access.css?v=group-detail-20261020',base).href;script.src=new URL('group-access.js?v=group-detail-20261020',base).href;document.head.append(css,script);})();
(()=>{const base=document.currentScript.src,css=document.createElement('link'),script=document.createElement('script');css.rel='stylesheet';css.href=new URL('../css/admin-list-ui.css?v=admin-lists-20261020',base).href;script.src=new URL('admin-list-ui.js?v=admin-lists-20261020-qr-images',base).href;document.head.append(css,script);})();

// 공동작업 Description 패널을 직접 불러온다.
(()=>{const script=document.createElement('script');script.src=new URL('spec-panel.js?v=github-auth-20261021-1',document.currentScript.src).href;document.head.append(script);})();
(()=>{const script=document.createElement('script');script.src=new URL('notice-ui.js?v=admin-lists-20261020',document.currentScript.src).href;document.head.append(script);})();

(()=>{const script=document.createElement('script');script.onload=()=>window.dispatchEvent(new Event('revision-history-loaded'));script.src=new URL('../data/revision-history.js?v=github-auth-20261021-1',document.currentScript.src).href;document.head.append(script);})();
// 목록 본문은 가운데 정렬, 긴 텍스트 열은 왼쪽 정렬한다.
(()=>{
 const app=document.getElementById('app');if(!app)return;
 const alignLists=()=>app.querySelectorAll('table').forEach(table=>{
  const headers=Array.from(table.querySelectorAll('thead tr:last-child>th'));
  const longColumns=headers.map(header=>/제목|내용|설명|사유|주소|비고|메모/.test(header.textContent));
  table.querySelectorAll('tbody>tr').forEach(row=>Array.from(row.children).forEach((cell,index)=>{
   cell.classList.toggle('list-text-left',cell.colSpan===1&&!!longColumns[index]);
  }));
 });
 new MutationObserver(alignLists).observe(app,{childList:true,subtree:true});alignLists();
})();

(()=>{const script=document.createElement("script");script.src=new URL("attendance-dashboard.js?v=toolbar-remove-20261020",document.currentScript.src).href;document.head.append(script);})();

(()=>{const base=document.currentScript.src;const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/list-row-navigation.css?v=row-navigation-20261019',base).href;document.head.append(css);const script=document.createElement('script');script.src=new URL('list-row-navigation.js?v=row-navigation-20261019',base).href;document.head.append(script);})();

(()=>{const base=document.currentScript.src;const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/management-ui.css?v=management-radio-ui-20261020',base).href;document.head.append(css);const script=document.createElement('script');script.src=new URL('management-ui.js?v=remove-example-copy-20261020',base).href;document.head.append(script);})();

(()=>{const script=document.createElement('script');script.src=new URL('public-boards.js?v=reader-target-20261019',document.currentScript.src).href;document.head.append(script);})();

(()=>{const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('../css/agency-filters.css?v=agency-multi-20261020',document.currentScript.src).href;document.head.append(link);})();

(()=>{const script=document.createElement('script');script.src=new URL('master-upload-ui.js?v=participant-status-20261020-v2',document.currentScript.src).href;document.head.append(script);})();
