window.GFAIR_INCLUDE.footer=()=>'<footer class="footer"><span>COPYRIGHT 2026 (C) G-FAIR KOREA 구매 및 수출 상담시스템 ALL RIGHTS RESERVED.</span></footer>';
(()=>{const projectBase=document.currentScript.src,shared=new URL('../../common/',projectBase);const config=document.createElement('script');config.src=new URL('config.js?v=clean-copy-20261021',shared).href;config.onload=()=>{const data=document.createElement('script');data.src=new URL('include/collaboration.js?v=clean-copy-20261021',shared).href;data.onload=()=>{const script=document.createElement('script');script.onload=()=>{const seeds=document.createElement('script');seeds.src=new URL('../data/message-specs.js?v=titles-20261021',projectBase).href;seeds.onload=()=>{const tabs=document.createElement('script');tabs.src=new URL('include/message-specs.js?v=type-first-20261021',shared).href;document.head.append(tabs);};document.head.append(seeds);};script.src=new URL('include/annotations.js?v=message-tabs-20261021',shared).href;document.head.append(script);};document.head.append(data);};document.head.append(config);})();
(()=>{const base=document.currentScript.src,css=document.createElement('link'),script=document.createElement('script');css.rel='stylesheet';css.href=new URL('../css/group-access.css?v=group-detail-20261020',base).href;script.src=new URL('group-access.js?v=clean-copy-20261021',base).href;document.head.append(css,script);})();
(()=>{const base=document.currentScript.src,css=document.createElement('link'),script=document.createElement('script');css.rel='stylesheet';css.href=new URL('../css/admin-list-ui.css?v=list-descending-sort-20261021',base).href;script.src=new URL('admin-list-ui.js?v=list-descending-sort-20261021',base).href;document.head.append(css,script);})();

// 공동작업 Description 패널을 직접 불러온다.
(()=>{const script=document.createElement('script');script.src=new URL('../../common/include/spec-panel.js?v=clean-copy-20261021',document.currentScript.src).href;document.head.append(script);})();
(()=>{const script=document.createElement('script');script.src=new URL('notice-ui.js?v=list-descending-sort-20261021',document.currentScript.src).href;document.head.append(script);})();

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

(()=>{const script=document.createElement("script");script.src=new URL("attendance-dashboard.js?v=clean-copy-20261021",document.currentScript.src).href;document.head.append(script);})();

(()=>{const base=document.currentScript.src;const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/list-row-navigation.css?v=row-navigation-20261019',base).href;document.head.append(css);const script=document.createElement('script');script.src=new URL('list-row-navigation.js?v=clean-copy-20261021',base).href;document.head.append(script);})();

(()=>{const base=document.currentScript.src;const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/management-ui.css?v=detail-layout-20261021',base).href;document.head.append(css);const script=document.createElement('script');script.src=new URL('management-ui.js?v=operator-register-final-20261021',base).href;document.head.append(script);})();

(()=>{const script=document.createElement('script');script.src=new URL('public-boards.js?v=clean-copy-20261021',document.currentScript.src).href;document.head.append(script);})();

(()=>{const link=document.createElement('link');link.rel='stylesheet';link.href=new URL('../css/agency-filters.css?v=agency-multi-20261020',document.currentScript.src).href;document.head.append(link);})();

(()=>{const script=document.createElement('script');script.src=new URL('master-upload-ui.js?v=clean-copy-20261021',document.currentScript.src).href;document.head.append(script);})();
(()=>{const script=document.createElement('script');script.src=new URL('popup-description-example.js?v=clean-copy-20261021',document.currentScript.src).href;document.head.append(script);})();
