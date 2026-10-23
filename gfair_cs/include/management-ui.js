(()=>{'use strict';
 const E=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const companies=[{id:'OP-A',name:'구매상담 운영사',representative:'대표 A',address:'사업장 A',contact:'담당자 A'},{id:'OP-B',name:'수출상담 운영사',representative:'대표 B',address:'사업장 B',contact:'담당자 B'},{id:'OP-C',name:'운영사 C',representative:'대표 C',address:'사업장 C',contact:'담당자 C'}];
 const assignments=[{year:'2027',company:'OP-A',type:'구매상담',id:'M0005',pw:'D27005'},{year:'2027',company:'OP-B',type:'수출상담',id:'',pw:''},{year:'2026',company:'OP-A',type:'구매상담',id:'M0003',pw:'D26003'},{year:'2026',company:'OP-B',type:'수출상담',id:'M0004',pw:'D26004'},{year:'2025',company:'OP-C',type:'구매상담',id:'M0001',pw:'D25001'},{year:'2025',company:'OP-B',type:'수출상담',id:'M0002',pw:'D25002'}];
 const staff=[{company:'OP-A',year:'2027',name:'구매 담당자',code:'STAFF-001',id:'DEMO-BUY-01',pw:'D27001'},{company:'OP-B',year:'2027',name:'수출 담당자',code:'STAFF-002',id:'DEMO-EXP-01',pw:'D27002'}];
 const adminDate=()=>new Intl.DateTimeFormat('sv-SE',{timeZone:'Asia/Seoul'}).format(new Date()).replaceAll('-','.');
 const admins=[{id:'DEMO-ADMIN-01',name:'관리자 A',org:'운영기관',status:'사용',date:'2026.10.19'},{id:'DEMO-ADMIN-02',name:'관리자 B',org:'운영기관',status:'사용',date:'2026.10.18'},{id:'DEMO-ADMIN-03',name:'관리자 C',org:'운영기관',status:'미사용',date:'2026.10.17'}];
 admins.forEach((a,i)=>Object.assign(a,{phone:'031-000-000'+i,mobile:'010-0000-000'+i,email:'admin'+(i+1)+'@example.com',passwordSet:true}));
 const state={screen:'BAS-15',role:'admin',event:'2026',company:'OP-A',admin:'DEMO-ADMIN-01',year:'전체',type:'전체',query:'',status:'전체',staffYear:'2027',shown:new Set(),notice:'',upload:null,staffUpload:null};
 const fields=['연도','상담 구분','기업코드','기업명','대표자','주소','담당자명'];
 const isAdmin=()=>state.role==='admin';
 const ownCompany=()=>state.role==='buyOperator'?'OP-A':state.role==='exportOperator'?'OP-B':null;
 const allowed=c=>isAdmin()||ownCompany()===c;
 const allowedAssignment=a=>allowed(a.company)&&(isAdmin()||a.type===(state.role==='buyOperator'?'구매상담':'수출상담'));
 const years=()=>[...new Set(assignments.map(a=>a.year))].sort().reverse();
 const options=(items,value)=>items.map(x=>`<option${String(x)===String(value)?' selected':''}>${E(x)}</option>`).join('');
 const button=(action,text,attrs='',primary=false)=>`<button type="button" class="btn${primary?' primary':''}" data-management-action="${action}" ${attrs}>${E(text)}</button>`;
 const field=(label,html)=>`<label class="field"><span>${label}</span>${html}</label>`;
 const input=(name,label,value='',required=false)=>field(label,`<input name="${name}" value="${E(value)}" ${required?'required':''}>`);
 const note=()=>state.notice?`<p class="notice" role="status">${E(state.notice)}</p>`:'';
 const table=(headers,body)=>`<div class="tablewrap"><table><thead><tr>${headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${body||`<tr><td colspan="${headers.length}"><div class="empty">조회 결과가 없습니다.</div></td></tr>`}</tbody></table></div>`;
 function operatorList(){
  const rr=assignments.filter(a=>allowedAssignment(a)&&(state.year==='전체'||a.year===state.year)&&(state.type==='전체'||a.type===state.type)).filter(a=>{const c=companies.find(c=>c.id===a.company);return !state.query||({'용역사':c.name,'담당자':c.contact}[window.GFAIR_SEARCH_SCOPE?.('query')]||[c.name,c.contact,a.type].join(' ')).includes(state.query)});
  return `${note()}<div class="management-actions">${isAdmin()?button('operator-create','등록','','true'):''}</div><form data-management-form="search" class="panel filters">${field('연도',`<select name="year">${options(['전체',...years()],state.year)}</select>`)}<fieldset class="management-type-filter"><legend>상담 구분</legend><div class="management-type-options">${['전체','구매상담','수출상담'].map(t=>`<label><input type="radio" name="type" value="${t}"${state.type===t?' checked':''}>${t}</label>`).join('')}</div></fieldset>${field('통합검색',`<input name="query" value="${E(state.query)}" placeholder="용역사·담당자 검색">`)}<div class="row"><button class="btn primary" type="submit">검색</button>${button('reset','초기화')}</div></form><section class="panel"><div class="panelhead"><h2>운영용역사 목록</h2><span>${rr.length}건</span></div>${table(['연도','상담 구분','용역사','담당자','하위 담당자 수','임시 계정'],rr.slice().sort((a,b)=>b.year.localeCompare(a.year)).map(a=>{const c=companies.find(c=>c.id===a.company);return `<tr tabindex="0" data-management-company="${E(c.id)}" data-management-year="${a.year}" aria-label="${E(a.year+'년 '+c.name+' 상세 보기')}"><td>${a.year}</td><td>${a.type}</td><td class="management-name">${E(c.name)}</td><td>${E(c.contact)}</td><td>${staff.filter(s=>s.company===c.id&&s.year===a.year).length}명</td><td>${a.id?'발급':'미발급'}</td></tr>`}).join(''))}</section>`;
 }
 function operatorRegistration(){
  const required=name=>`<span>${name}</span>`;
  const registrationField=(name,label,type='text',attrs='')=>`<label class="field">${required(label)}<input name="${name}" type="${type}" ${attrs} required></label>`;
  return `${note()}<form data-management-form="operator-create" class="panel detail-form-panel"><div class="panelhead"><h2>운영용역사 기본정보 등록</h2></div><div class="detail-rows form-rows">${registrationField('name','성명')}${registrationField('company','소속업체')}${registrationField('position','직위')}${registrationField('email','이메일','email','autocomplete="email"')}${registrationField('phone','연락처','tel','autocomplete="tel"')}<label class="field"><span>행사 연도</span><select name="year">${options(years(),'2027')}</select></label><label class="field"><span>상담 구분</span><select name="type">${options(['구매상담','수출상담'],'구매상담')}</select></label></div><div class="formfooter"><a href="#BAS-15" class="btn">취소</a><button type="submit" class="btn primary">등록</button></div></form>`;
 }
 function operatorDetail(){
  const c=companies.find(c=>c.id===state.company);if(!c||!allowed(c.id))return '<div class="empty">담당 운영용역사만 확인할 수 있습니다.</div>';
  const history=assignments.filter(a=>a.company===c.id&&allowedAssignment(a)).sort((a,b)=>b.year.localeCompare(a.year));
  if(!history.some(a=>a.year===state.staffYear))state.staffYear=history[0]?.year||'';
  return `${note()}<section class="panel detail-form-panel"><div class="panelhead"><h2>기업 기본정보</h2><span>${E(c.id)}</span></div><dl class="detail-rows">${[['용역사',c.name],['기업코드',c.id],['성명',c.contact],['직위',c.position||'미등록'],['이메일',c.email||'미등록'],['연락처',c.phone||'미등록'],['대표자',c.representative],['주소',c.address]].map(([k,v])=>`<dt>${E(k)}</dt><dd>${E(v)}</dd>`).join('')}</dl><div class="formfooter"><a href="#BAS-15" class="btn">목록으로</a></div></section><section class="panel management-year"><div class="panelhead"><h2>행사 이력 및 연도별 임시 계정</h2><span>${history.length}건</span></div>${table(['연도','행사','상담 구분','ID','PW','계정 발급'],history.map(a=>{const key=a.year+'|'+a.company+'|'+a.type;return `<tr><td>${a.year}</td><td>G-FAIR KOREA ${a.year}</td><td>${a.type}</td><td>${E(a.id||'미발급')}</td><td><span class="management-password">${a.pw?(state.shown.has(key)?E(a.pw):'••••••'):'—'}</span>${a.pw?button('toggle-password',state.shown.has(key)?'숨기기':'보기',`data-key="${E(key)}" aria-pressed="${state.shown.has(key)}"`):''}</td><td>${a.id?'발급 완료':isAdmin()?button('issue','예시 계정 발급',`data-year="${a.year}" data-type="${a.type}"`):'관리자 발급 대기'}</td></tr>`}).join(''))}<p class="management-note">${E(c.name)}은 ${history.length}개 행사에 운영 담당자를 배정했습니다.</p></section>${staffSection(c,history)}`;
 }
 function staffSection(c,history){const staffRows=staff.filter(s=>s.company===c.id&&s.year===state.staffYear);return `<section class="panel pad"><div class="panelhead"><h2>하위 담당자</h2><span>${state.staffYear}년 · ${staffRows.length}명</span></div><div class="management-form">${field('행사 연도',`<select data-management-staff-year>${options([...new Set(history.map(a=>a.year))],state.staffYear)}</select>`)}${!isAdmin()?'<a class="btn primary" href="#COM-08">담당자 등록</a>':''}${button('staff-template','담당자 엑셀 양식 다운로드')}${button('staff-upload-open','담당자 엑셀 일괄 업로드','','true')}</div>${table(['담당자코드','이름','발급 ID','임시 PW','행사 연도','계정 상태'],staffRows.map(s=>{const key='staff|'+s.id;return `<tr><td>${E(s.code)}</td><td>${E(s.name)}</td><td>${E(s.id)}</td><td><span class="management-password">${state.shown.has(key)?E(s.pw):'••••••'}</span>${button('toggle-password',state.shown.has(key)?'숨기기':'보기',`data-key="${E(key)}" aria-pressed="${state.shown.has(key)}"`)}</td><td>${s.year}</td><td>발급 완료</td></tr>`}).join(''))}</section>`;}
 function staffRegistration(company,history){
 const allowedYears=[...new Set(history.map(a=>a.year))];if(!allowedYears.length)return '<div class="empty">등록 가능한 배정 행사가 없습니다.</div>';
 if(!allowedYears.includes(state.staffYear))state.staffYear=allowedYears[0];
 return '<form data-management-form="staff-create" class="panel detail-form-panel"><div class="panelhead"><h2>하위 담당자 등록</h2></div><div class="management-form formgrid">'+field('소속 회사','<input value="'+E(company.name)+'" readonly>')+field('행사 연도 *','<select name="year" required>'+options(allowedYears,state.staffYear)+'</select>')+input('code','담당자코드 *','',true)+input('name','이름 *','',true)+'</div><p data-management-error role="alert"></p><div class="formfooter"><a href="#COM-07" class="btn">취소</a><button type="submit" class="btn primary">등록</button></div></form>';
 }
 function adminList(){
  const rr=admins.filter(a=>(state.status==='전체'||a.status===state.status)&&(!state.query||({'아이디':a.id,'이름':a.name,'소속':a.org}[window.GFAIR_SEARCH_SCOPE?.('query')]||[a.id,a.name,a.org].join(' ')).includes(state.query)));
  return `${note()}<div class="management-actions">${button('admin-create','관리자 등록','','true')}</div><form data-management-form="admin-search" class="panel filters"><fieldset class="management-type-filter"><legend>사용여부</legend><div class="management-type-options">${['전체','사용','미사용'].map(s=>`<label><input type="radio" name="status" value="${s}"${state.status===s?' checked':''}>${s}</label>`).join('')}</div></fieldset>${field('통합검색',`<input name="query" value="${E(state.query)}" placeholder="이름, ID, 소속을 검색하세요.">`)}<div class="row"><button type="submit" class="btn primary">검색</button>${button('reset','초기화')}</div></form><section class="panel"><div class="panelhead"><h2>구매·수출 상담시스템 관리자 ${rr.length}명</h2></div>${table(['이름','아이디','소속','사용여부','등록일'],rr.map(a=>`<tr><td class="management-name"><button type="button" class="list-name-link" data-management-admin="${E(a.id)}" aria-label="${E(a.name)} 상세">${E(a.name)}</button></td><td>${E(a.id)}</td><td>${E(a.org)}</td><td><span class="badge">${a.status}</span></td><td>${a.date}</td></tr>`).join(''))}</section>`;
 }
 function adminEditor(create=new URLSearchParams(location.search).get('adminMode')==='create'){
 const a=create?{id:'',name:'',org:'',status:'사용',date:adminDate(),phone:'',mobile:'',email:''}:admins.find(a=>a.id===state.admin);if(!a)return '<div class="empty">관리자를 찾을 수 없습니다.</div>';
 return `${note()}<form data-management-form="${create?'admin-create':'admin-save'}" class="panel detail-form-panel"><div class="panelhead"><h2>관리자 기본정보</h2></div><div class="detail-rows form-rows">${input('name','이름 *',a.name,true)}${field('아이디 *','<input name="id" value="'+E(a.id)+'" required autocomplete="off" '+(create?'':'readonly aria-readonly="true"')+'>')}${input('org','소속',a.org)}${field('사용여부','<select name="status">'+options(['사용','미사용'],a.status)+'</select>')}${field('등록일','<input name="date" value="'+E(a.date)+'" readonly aria-readonly="true">')}${field('비밀번호'+(create?' *':''),'<input type="password" name="password" value="" autocomplete="new-password" '+(create?'required':'placeholder="변경 시에만 입력해 주세요"')+'>')}${field('전화번호','<input type="tel" name="phone" value="'+E(a.phone)+'" autocomplete="tel">')}${field('휴대전화번호','<input type="tel" name="mobile" value="'+E(a.mobile)+'" autocomplete="tel-national">')}${field('이메일','<input type="email" name="email" value="'+E(a.email)+'" autocomplete="email">')}</div><p data-management-error role="alert"></p><div class="formfooter"><a href="#BAS-16" class="btn">목록</a><button class="btn primary" type="submit">${create?'등록':'저장'}</button></div></form>`;
 }
 function adminDetail(){return adminEditor();}
 function adminMode(create){const url=new URL(location.href);if(create)url.searchParams.set('adminMode','create');else url.searchParams.delete('adminMode');history.replaceState(null,'',url.pathname+url.search+url.hash);}

 function operatorAccount(){
  const c=companies.find(c=>c.id===ownCompany()),history=assignments.filter(a=>a.company===c?.id&&allowedAssignment(a)).sort((a,b)=>b.year.localeCompare(a.year));
  if(!c)return '<div class="empty">소속 운영용역사를 확인할 수 없습니다.</div>';
  if(state.screen==='COM-08')return staffRegistration(c,history);
  if(state.screen==='COM-06')return `${note()}<section class="panel detail-form-panel"><div class="panelhead"><h2>내 계정 정보</h2><span>${E(c.id)}</span></div><dl class="detail-rows">${[['사용구분',state.role==='buyOperator'?'구매상담 운영용역사':'수출상담 운영용역사'],['계정 구분','대표 담당자'],['소속 기업',c.name],['담당 상담',state.role==='buyOperator'?'구매상담':'수출상담'],['선택 행사','G-FAIR KOREA '+state.event]].map(([k,v])=>`<dt>${E(k)}</dt><dd>${E(v)}</dd>`).join('')}</dl><div class="formfooter"><a href="#COM-07" class="btn primary">담당자 관리</a></div></section>`;
  if(!history.some(a=>a.year===state.staffYear))state.staffYear=history[0]?.year||'';
  return `${note()}<div class="management-actions"><a href="#COM-06" class="btn">내정보</a></div><section class="panel pad"><h2>${E(c.name)}</h2><p style="margin-top:12px">${state.role==='buyOperator'?'구매상담':'수출상담'} 운영용역사 대표 담당자 · 자기 회사의 배정 행사만 관리합니다.</p></section>${staffSection(c,history)}`;
 }
 function render(){
  if(['COM-06','COM-07','COM-08'].includes(state.screen))return ['buyOperator','exportOperator'].includes(state.role)?`<div data-management-root>${operatorAccount()}</div>`:'<div class="empty">운영용역사 대표 담당자용 화면입니다.</div>';
  if(!isAdmin())return '<div class="empty">이용 권한이 없습니다.</div>';return `<div data-management-root>${state.screen==='BAS-15'?operatorList():state.screen==='BAS-17'?operatorDetail():state.screen==='BAS-19'?operatorRegistration():state.screen==='BAS-16'?adminList():adminDetail()}</div>`;}
 function paint(){const r=document.querySelector('[data-management-root]');if(r)r.outerHTML=render();}
 function message(text){state.notice=text;paint();}
 function modal(title,body){const d=document.getElementById('dialog');document.getElementById('dialog-content').innerHTML=`<div class="dialoghead"><h2>${title}</h2>${button('close','닫기')}</div><div class="dialogbody">${body}<p data-management-error role="alert"></p></div>`;d.showModal();}
 function close(){document.getElementById('dialog').close();}

 const staffFields=['행사 연도','기업코드','담당자코드','담당자명'];
 function staffAllowed(){return ((state.screen==='BAS-17'&&isAdmin())||(['COM-07','COM-08'].includes(state.screen)&&['buyOperator','exportOperator'].includes(state.role)))&&allowed(state.company)&&assignments.some(a=>a.company===state.company&&a.year===state.staffYear&&allowedAssignment(a));}
 function validateStaffRows(rows,company,year,existing){
  const header=rows[0]||[];
  if(!staffFields.every(h=>header.includes(h)))throw Error('담당자 전용 양식의 열 이름을 확인해 주세요.');
  const indices=staffFields.map(h=>header.indexOf(h)),seen=new Set(existing.filter(s=>s.company===company&&s.year===year).map(s=>s.code)),good=[],errors=[];
  rows.slice(1).forEach((row,i)=>{
   const r=indices.map(j=>String(row[j]??'').trim());if(r.every(v=>!v))return;
   let error='';if(r.some(v=>!v))error='필수값 누락';else if(r[0]!==year||r[1]!==company)error='선택한 행사 연도·소속 용역사와 불일치';else if(seen.has(r[2]))error='동일 행사·소속의 담당자코드 중복';
   if(error)errors.push({line:i+2,error});else{seen.add(r[2]);good.push({code:r[2],name:r[3]})}
  });
  if(!good.length&&!errors.length)throw Error('등록할 담당자가 없습니다.');
  return {good,errors};
 }
 async function action(b){
  const a=b.dataset.managementAction;
  if(a==='close'){close();return;}
  if(a==='reset'){if(state.screen==='BAS-16')window.GFAIR_RESET_SEARCH_SCOPE?.();state.query='';state.year='전체';state.type='전체';state.status='전체';message('');return;}
  if(a==='toggle-password'&&allowed(state.company)){const k=b.dataset.key;state.shown.has(k)?state.shown.delete(k):state.shown.add(k);paint();return;}
  if(a==='issue'&&isAdmin()){
   const item=assignments.find(a=>a.company===state.company&&a.year===b.dataset.year&&a.type===b.dataset.type);if(!item||item.id)return;
   const n=Math.max(0,...assignments.map(a=>Number(a.id.replace('M',''))||0))+1;
   item.id='M'+String(n).padStart(4,'0');item.pw='D'+item.year.slice(-2)+String(n).padStart(3,'0');message('현재 연도의 임시 계정을 발급했습니다.');return;
  }
  if(a==='staff-template'&&staffAllowed()){
   const blob=await GFAIRWorkbook.write([staffFields,[state.staffYear,state.company,'DEMO-STAFF-NEW','신규 담당자']]),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='하위담당자_'+state.company+'_'+state.staffYear+'양식.xlsx';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);message('선택 행사·소속이 기입된 담당자 양식을 다운로드했습니다.');return;
  }
  if(a==='staff-upload-open'&&staffAllowed()){
   state.staffUpload=null;
   modal('하위 담당자 엑셀 일괄 업로드',`<p>${E(companies.find(c=>c.id===state.company).name)} · ${state.staffYear}년</p><form data-management-form="staff-upload"><p>담당자코드·이름을 작성해 업로드해 주세요. 계정 ID·PW는 직접 입력하지 않습니다.</p>${field('담당자 엑셀 파일','<input type="file" name="file" accept=".xlsx" required>')}<button type="submit" class="btn primary">파일 검증</button></form><div data-management-upload-result></div><p class="small">검토용 발급이며 실제 로그인 계정은 생성하지 않습니다.</p>`);return;
  }
  if(a==='staff-upload-confirm'){
   const upload=state.staffUpload;if(!staffAllowed()||!upload||upload.company!==state.company||upload.year!==state.staffYear)return;
   if(upload.rows.some(r=>staff.some(s=>s.company===upload.company&&s.year===upload.year&&s.code===r.code)))return message('담당자 목록이 변경되었습니다. 다시 검증해 주세요.');
   upload.rows.forEach(r=>{const n=staff.length+1;staff.push({company:upload.company,year:upload.year,code:r.code,name:r.name,id:'DEMO-S'+String(n).padStart(4,'0'),pw:'D'+upload.year.slice(-2)+String(n).padStart(3,'0')})});
   const n=upload.rows.length;state.staffUpload=null;close();message(n+'명의 담당자를 등록하고 계정을 일괄 발급했습니다.');return;
  }
  if(a==='operator-create'&&isAdmin()){state.notice='';location.hash='BAS-19';return;}
  if(a==='admin-create'&&isAdmin()){adminMode(true);location.hash='BAS-18';return;}
  if(a==='template'&&isAdmin()){
   const rows=[fields,['2027','구매상담','DEMO-UPLOAD-01','업로드 용역사','대표','사업장','담당자']];
   const blob=await GFAIRWorkbook.write(rows),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='운영용역사_등록양식.xlsx';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);message('검토용 XLSX 양식을 다운로드했습니다. 행을 수정해 업로드해 주세요.');return;
  }
  if(a==='upload-open'&&isAdmin()){state.upload=null;modal('운영용역사 엑셀 일괄 업로드',`<form data-management-form="upload"><p>제공된 XLSX 양식의 열 이름을 유지해 주세요. 연도·상담 구분·기업코드·기업명은 필수입니다.</p>${field('엑셀 파일', '<input type="file" name="file" accept=".xlsx" required>')}<button class="btn primary" type="submit">파일 검증</button></form><div data-management-upload-result></div>`);return;}
  if(a==='upload-confirm'&&isAdmin()&&state.upload?.length){
   state.upload.forEach(r=>{let c=companies.find(c=>c.id===r[2]);if(!c){c={id:r[2],name:r[3],representative:r[4]||'미등록',address:r[5]||'미등록',contact:r[6]||'미등록'};companies.push(c)}assignments.push({year:r[0],type:r[1],company:c.id,id:'',pw:''})});
   const n=state.upload.length;state.upload=null;close();state.year='전체';state.query='';message(n+'건을 목록에 반영했습니다. 기업 상세에서 연도별 계정을 발급할 수 있습니다.');
  }
 }
 document.addEventListener('click',ev=>{if(ev.target.closest('a[href="#BAS-16"]'))adminMode(false);const b=ev.target.closest('[data-management-action]');if(b){if(!document.querySelector('[data-management-root]'))return;ev.preventDefault();ev.stopImmediatePropagation();action(b).catch(e=>message(e.message));return;}const adminName=ev.target.closest('button[data-management-admin]');if(adminName){ev.preventDefault();ev.stopImmediatePropagation();openRow(adminName);return;}const row=ev.target.closest('[data-management-company],[data-management-admin]');if(!row||ev.target.closest('button,a,input,select,textarea'))return;openRow(row);},true);
 function openRow(row){state.notice='';state.shown.clear();if(row.dataset.managementCompany){if(!allowed(row.dataset.managementCompany))return;state.company=row.dataset.managementCompany;state.staffYear=row.dataset.managementYear;location.hash='BAS-17'}else{if(!isAdmin())return;state.admin=row.dataset.managementAdmin;adminMode(false);location.hash='BAS-18'}}
 document.addEventListener('keydown',ev=>{const row=ev.target.closest('[data-management-company],[data-management-admin]');if(row&&ev.target===row&&['Enter',' '].includes(ev.key)){ev.preventDefault();openRow(row)}});
 document.addEventListener('change',ev=>{if(ev.target.matches('[data-management-staff-year]')){state.staffYear=ev.target.value;paint()}});
 document.addEventListener('submit',async ev=>{
  const f=ev.target;if(!f.matches('[data-management-form]'))return;ev.preventDefault();ev.stopImmediatePropagation();if(!f.reportValidity())return;
  const fd=new FormData(f),v=k=>String(fd.get(k)||'').trim(),type=f.dataset.managementForm;
  const fail=text=>{const err=document.querySelector('[data-management-error]');if(err)err.textContent=text;else message(text)};
  if(type==='search'||type==='admin-search'){state.query=v('query');state.year=v('year')||'전체';state.type=v('type')||'전체';state.status=v('status')||'전체';state.notice='';paint();return;}
  if(type==='operator-create'){
   const companyName=v('company'),name=v('name'),year=v('year')||'2027',operatorType=v('type')||'구매상담';
   if(companies.some(c=>c.name===companyName))return fail('같은 용역사가 이미 등록되어 있습니다.');
   const id='OP-'+String.fromCharCode(65+companies.length),company={id,name:companyName,representative:name,address:'미등록',contact:name,position:v('position'),email:v('email'),phone:v('phone')};
   companies.push(company);assignments.push({year,company:id,type:operatorType,id:'',pw:''});state.year='전체';state.type='전체';state.query='';state.company=id;state.staffYear=year;state.notice='운영용역사 정보를 등록했습니다.';location.hash='BAS-15';return;
  }
  if(type==='staff-upload'){
   state.staffUpload=null;const result=document.querySelector('[data-management-upload-result]');result.innerHTML='';
   try{
    if(!staffAllowed())throw Error('담당 행사 범위를 확인해 주세요.');
    const file=fd.get('file');if(!/\.xlsx$/i.test(file.name))throw Error('XLSX 파일을 선택해 주세요.');
    const rr=await GFAIRWorkbook.read(file),checked=validateStaffRows(rr,state.company,state.staffYear,staff);
    if(checked.errors.length){result.innerHTML=`<p>정상 ${checked.good.length}건 · 오류 ${checked.errors.length}건</p>${table(['엑셀 행','오류 사유'],checked.errors.map(e=>`<tr><td>${e.line}</td><td>${E(e.error)}</td></tr>`).join(''))}<p>오류를 수정한 뒤 다시 검증해 주세요. 아직 등록·발급하지 않았습니다.</p>`;return;}
    state.staffUpload={company:state.company,year:state.staffYear,rows:checked.good};
    result.innerHTML=`<p>정상 ${checked.good.length}건 · 오류 0건. 계정 일괄 발급 대기</p>${table(['담당자코드','이름','발급 상태'],checked.good.map(r=>`<tr><td>${E(r.code)}</td><td>${E(r.name)}</td><td>발급 대기</td></tr>`).join(''))}${button('staff-upload-confirm','계정 일괄 발급','','true')}`;
   }catch(e){fail(e.message)}
   return;
  }
  if(type==='staff-create'){
 const year=v('year'),code=v('code'),name=v('name'),company=ownCompany();
 if(!['buyOperator','exportOperator'].includes(state.role)||!company||!assignments.some(a=>a.company===company&&a.year===year&&allowedAssignment(a)))return fail('본인 회사에 배정된 행사만 등록할 수 있습니다.');
 if(!code||!name)return fail('담당자코드와 이름을 입력해 주세요.');
 if(staff.some(item=>item.company===company&&item.year===year&&item.code===code))return fail('같은 행사에 이미 등록된 담당자코드입니다.');
 const n=staff.length+1;staff.push({company,year,code,name,id:'DEMO-S'+String(n).padStart(4,'0'),pw:'D'+year.slice(-2)+String(n).padStart(3,'0')});state.staffYear=year;state.notice=name+' 담당자를 등록했습니다.';location.hash='COM-07';return;
 }
  if(!isAdmin())return;
  if(['admin-create','admin-save'].includes(type)){
   const error=f.querySelector('[data-management-error]');if(error)error.textContent='';
   if(!v('id')||!v('name'))return fail('아이디와 이름은 공백만 입력할 수 없습니다.');
   if(type==='admin-create'&&!v('password'))return fail('비밀번호를 입력해 주세요.');
   if(fd.get('password')&&!v('password'))return fail('비밀번호는 공백만 입력할 수 없습니다.');
   if(type==='admin-save'&&v('id')!==state.admin)return fail('기존 아이디는 변경할 수 없습니다.');
   if(admins.some(a=>a.id===v('id')&&(type==='admin-create'||a.id!==state.admin)))return fail('이미 등록된 아이디입니다.');
   if(type==='admin-create'){admins.push({id:v('id'),name:v('name'),org:v('org')||'미등록',status:v('status')||'사용',date:adminDate(),phone:v('phone'),mobile:v('mobile'),email:v('email'),passwordSet:true});state.notice='관리자 정보를 저장했습니다. 실제 계정·권한은 변경되지 않습니다.';adminMode(false);location.hash='BAS-16';return;}
   else{Object.assign(admins.find(a=>a.id===state.admin),{name:v('name'),org:v('org')||'미등록',status:v('status'),phone:v('phone'),mobile:v('mobile'),email:v('email'),...(v('password')?{passwordSet:true}:{})})}
   f.elements.password.value='';message('관리자 정보를 저장했습니다. 실제 계정·권한은 변경되지 않습니다.');return;
  }
  if(type==='upload'){
   state.upload=null;const result=document.querySelector('[data-management-upload-result]');result.innerHTML='';
   try{
    const file=fd.get('file');if(!/\.xlsx$/i.test(file.name))throw Error('XLSX 파일을 선택해 주세요.');
    const rr=await GFAIRWorkbook.read(file),header=rr[0]||[];if(!fields.every(x=>header.includes(x)))throw Error('제공된 양식의 열 이름을 확인해 주세요.');
    const indices=fields.map(x=>header.indexOf(x)),seen=new Set(assignments.map(a=>a.year+'|'+a.type+'|'+a.company)),good=[],errors=[];
    rr.slice(1).forEach((r,i)=>{const row=indices.map(j=>String(r[j]??'').trim());if(row.every(x=>!x))return;const key=row[0]+'|'+row[1]+'|'+row[2];let err='';
     if(row.slice(0,4).some(x=>!x))err='필수값 누락';else if(!/^\d{4}$/.test(row[0]))err='연도는 네 자리 숫자';else if(!['구매상담','수출상담'].includes(row[1]))err='상담 구분 확인';else if(seen.has(key))err='동일 연도·구분·기업 중복';
     else if(companies.some(c=>c.id===row[2]&&c.name!==row[3])||good.some(r=>r[2]===row[2]&&r[3]!==row[3]))err='같은 기업코드의 기업명 불일치';
     if(err)errors.push([i+2,err]);else{seen.add(key);good.push(row)}
    });
    if(!good.length&&!errors.length)throw Error('등록할 데이터가 없습니다.');
    if(errors.length){result.innerHTML=table(['엑셀 행','오류'],errors.map(([n,e])=>`<tr><td>${n}</td><td>${E(e)}</td></tr>`).join(''))+'<p>오류를 수정한 뒤 다시 업로드해 주세요. 아직 목록에 반영하지 않았습니다.</p>';return;}
    state.upload=good;result.innerHTML=`<p>정상 ${good.length}건 · 오류 0건. 아래 내용을 확인한 후 등록하세요.</p>${table(['연도','상담 구분','기업코드','기업명'],good.map(r=>`<tr>${r.slice(0,4).map(x=>`<td>${E(x)}</td>`).join('')}</tr>`).join(''))}${button('upload-confirm','목록에 등록','','true')}`;
   }catch(e){fail(e.message)}
  }
 },true);
 window.addEventListener('hashchange',()=>{state.shown.clear();if(location.hash!=='#BAS-18')adminMode(false)});
 window.GFAIR_MANAGEMENT={render(screen,role,event){if(['COM-06','COM-07','COM-08'].includes(screen)){if(state.event!==event||!['COM-06','COM-07','COM-08'].includes(state.screen))state.staffYear=event;state.company=role==='exportOperator'?'OP-B':'OP-A'}if(state.role!==role){state.shown.clear();state.query='';state.year='전체';state.type='전체';state.notice='';state.company=role==='exportOperator'?'OP-B':'OP-A'}state.screen=screen;state.role=role;state.event=event;return render()}};
 window.dispatchEvent(new Event('management-ui-ready'));
})();
