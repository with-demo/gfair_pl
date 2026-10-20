(()=>{'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const tree=()=>window.GFAIR_MENU.filter(g=>!['로그인','알림'].includes(g.name));
 const entries=()=>tree().flatMap(g=>g.items.flatMap(i=>i[2].length?i[2]:[i]));
 const groups=Object.entries({admin:'관리자',buyOperator:'구매상담 운영용역사',exportOperator:'수출상담 운영용역사',buyer:'국내 바이어',interpreter:'통역원'}).map(([id,name])=>({id,name,active:true,date:'2026.10.20',menus:new Set(entries().filter(item=>window.GFAIR_NAV.allowed(item,id)).map(item=>item[0]))}));
 let query='',status='전체',notice='',selectedGroup='admin';
 const admin=()=>document.getElementById('role-picker')?.value==='admin';
 const button=(action,text,attrs='')=>`<button type="button" class="btn" data-group-action="${action}" ${attrs}>${E(text)}</button>`;
 function render(){
  if(!admin())return '<div class="empty">관리자만 이용할 수 있습니다.</div>';
  if(location.hash==='#SET-02'||!location.hash&&document.body.dataset.screen==='SET-02')return detail();
  const rr=groups.filter(g=>(!query||g.name.includes(query))&&(status==='전체'||g.active===(status==='사용')));
  return `<div data-group-root><form class="panel filters" data-group-form="search"><label class="field"><span>그룹명</span><input type="search" name="query" value="${E(query)}" placeholder="그룹명 검색"></label><label class="field"><span>사용여부</span><select name="status">${['전체','사용','미사용'].map(s=>`<option${s===status?' selected':''}>${s}</option>`).join('')}</select></label><div class="row"><button type="submit" class="btn primary">검색</button>${button('reset','초기화')}</div></form><p class="small" data-group-notice role="status">${E(notice)}</p><section class="panel"><div class="panelhead"><h2>그룹 목록</h2></div><div class="tablewrap"><table><thead><tr><th>No.</th><th>그룹명</th><th>사용여부</th><th>허용 메뉴 수</th><th>등록일</th><th>관리</th></tr></thead><tbody>${rr.map((g,i)=>`<tr tabindex="0" data-group-id="${E(g.id)}" aria-label="${E(g.name)} 그룹 상세 보기"><td>${i+1}</td><td><a class="group-name-link" href="#SET-02" data-group-action="detail" data-id="${E(g.id)}">${E(g.name)}</a></td><td><span class="badge">${g.active?'사용':'미사용'}</span></td><td>${g.menus.size}개</td><td>${g.date}</td><td>${button('permissions','메뉴 권한',`data-id="${E(g.id)}" aria-label="${E(g.name)} 메뉴 권한"`)}</td></tr>`).join('')||'<tr><td colspan="6"><div class="empty">조회된 그룹이 없습니다.</div></td></tr>'}</tbody></table></div></section><div class="management-actions">${button('create','그룹 등록')}</div></div>`;
 }
 function paint(){const node=document.querySelector('[data-group-root]');if(node)node.outerHTML=render();}
 function detail(){const group=groups.find(g=>g.id===selectedGroup);if(!group)return `<div data-group-root><p>그룹을 찾을 수 없습니다.</p>${button('list','목록')}</div>`;return `<div data-group-root><form data-group-form="edit" data-id="${E(group.id)}"><section class="panel pad group-detail-form"><h2>그룹 기본정보</h2><label class="field"><span>그룹명 <em>필수</em></span><input name="name" required value="${E(group.name)}"></label><fieldset><legend>사용여부</legend>${[true,false].map(active=>`<label><input type="radio" name="active" value="${active}"${group.active===active?' checked':''}> ${active?'사용':'미사용'}</label>`).join('')}</fieldset><p data-group-error role="alert"></p></section><div class="group-detail-actions">${button('list','목록')}<button type="submit" class="btn primary">저장</button></div></form></div>`;}
 function close(){const dialog=document.getElementById('dialog');dialog.close();dialog.classList.remove('group-access-dialog');}
 function modal(title,body){const dialog=document.getElementById('dialog');dialog.classList.add('group-access-dialog');document.getElementById('dialog-content').innerHTML=`<div class="group-access-heading"><h2 id="group-dialog-title">${E(title)}</h2>${button('close','×','aria-label="팝업 닫기"')}</div>${body}`;dialog.setAttribute('aria-labelledby','group-dialog-title');dialog.addEventListener('close',()=>{dialog.classList.remove('group-access-dialog');dialog.removeAttribute('aria-labelledby');},{once:true});dialog.showModal();}
 function edit(group){modal(group?'그룹 정보 수정':'그룹 등록',`<form data-group-form="edit" data-id="${E(group?.id||'')}"><div class="group-access-body"><label class="field"><span>그룹명 <em>필수</em></span><input name="name" required value="${E(group?.name||'')}" placeholder="그룹명을 입력해 주세요"></label><fieldset><legend>사용여부</legend>${[true,false].map(active=>`<label><input type="radio" name="active" value="${active}"${(group?.active??true)===active?' checked':''}> ${active?'사용':'미사용'}</label>`).join('')}</fieldset><p data-group-error role="alert"></p></div><div class="group-access-footer">${button('close','취소')}<button type="submit" class="btn primary">저장</button></div></form>`);}
 function permissions(group){
  modal(group.name+' · 메뉴 접근 권한',`<form data-group-form="permissions" data-id="${E(group.id)}"><div class="group-access-body"><label class="group-access-all"><input type="checkbox" data-group-all> 전체 메뉴 선택</label><div class="group-access-scroll"><table><thead><tr><th>메뉴명</th><th>접근 허용</th></tr></thead><tbody>${tree().map((section,index)=>{const items=section.items.flatMap(item=>item[2].length?item[2].map(child=>({item:child,parent:item[1]})):[{item,parent:''}]);return `<tr class="group-access-section"><th scope="row">${E(section.name)}</th><td><input type="checkbox" data-group-section="${index}" aria-label="${E(section.name)} 전체 선택"></td></tr>${items.map(({item,parent})=>`<tr><td><label for="group-menu-${E(item[0])}">${parent?E(parent)+' › ':''}${E(item[1])}</label></td><td><input id="group-menu-${E(item[0])}" type="checkbox" name="menus" value="${E(item[0])}" data-section="${index}" aria-label="${E(item[1])} 접근 허용"${group.menus.has(item[0])?' checked':''}></td></tr>`).join('')}`;}).join('')}</tbody></table></div></div><div class="group-access-footer">${button('close','취소')}<button type="submit" class="btn primary">저장</button></div></form>`);syncChecks();
 }
 function syncChecks(){const form=document.querySelector('[data-group-form="permissions"]');if(!form)return;const menus=[...form.querySelectorAll('[name="menus"]')];const set=(box,items)=>{box.checked=items.length>0&&items.every(i=>i.checked);box.indeterminate=items.some(i=>i.checked)&&!box.checked;};set(form.querySelector('[data-group-all]'),menus);form.querySelectorAll('[data-group-section]').forEach(box=>set(box,menus.filter(i=>i.dataset.section===box.dataset.groupSection)));}
 document.addEventListener('click',event=>{
  const node=event.target.closest('[data-group-action]'),row=event.target.closest('[data-group-id]');if(!node&&!row)return;
  if(!admin())return;if(!node&&event.target.closest('button,a,input,select'))return;
  event.preventDefault();event.stopImmediatePropagation();
  const action=node?.dataset.groupAction||'detail',group=groups.find(g=>g.id===(node?.dataset.id||row?.dataset.groupId));
  if(action==='detail'&&group){selectedGroup=group.id;location.hash='SET-02';return;}if(action==='list'){location.hash='SET-01';return;}
  if(action==='close')close();else if(action==='create')edit();else if(action==='edit'&&group)edit(group);else if(action==='permissions'&&group)permissions(group);else if(action==='reset'){query='';status='전체';paint();}
 },true);
 document.addEventListener('keydown',event=>{if(event.target.matches?.('tr[data-group-id]')&&['Enter',' '].includes(event.key)){event.preventDefault();event.target.click();}});
 document.addEventListener('change',event=>{const input=event.target,form=input.closest('[data-group-form="permissions"]');if(!form)return;if(input.hasAttribute('data-group-all'))form.querySelectorAll('[name="menus"]').forEach(box=>box.checked=input.checked);else if(input.hasAttribute('data-group-section'))form.querySelectorAll('[name="menus"]').forEach(box=>{if(box.dataset.section===input.dataset.groupSection)box.checked=input.checked;});syncChecks();});
 document.addEventListener('submit',event=>{
  const form=event.target;if(!form.matches('[data-group-form]'))return;event.preventDefault();event.stopImmediatePropagation();if(!admin())return;
  const data=new FormData(form),group=groups.find(g=>g.id===form.dataset.id);
  if(form.dataset.groupForm==='search'){query=String(data.get('query')||'').trim();status=data.get('status');paint();return;}
  if(form.dataset.groupForm==='permissions'&&group){group.menus=new Set(data.getAll('menus'));notice=group.name+'의 메뉴 접근 권한을 저장했습니다.';}
  else if(form.dataset.groupForm==='edit'){
   if(!form.reportValidity())return;const name=String(data.get('name')||'').trim();
   if(!name||groups.some(g=>g!==group&&g.name===name)){form.querySelector('[data-group-error]').textContent=!name?'그룹명을 입력해 주세요.':'같은 이름의 그룹이 있습니다.';return;}
   if(group)Object.assign(group,{name,active:data.get('active')==='true'});else groups.push({id:'GROUP-'+Date.now(),name,active:data.get('active')==='true',date:new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul'}).format(new Date()).replaceAll('-','.'),menus:new Set()});notice='그룹 정보를 저장했습니다.';
  }
  if(form.closest('dialog')){close();paint();}else{location.hash='SET-01';}
 },true);
 window.GFAIR_GROUP_ACCESS={render};window.dispatchEvent(new Event('group-access-ready'));
})();
