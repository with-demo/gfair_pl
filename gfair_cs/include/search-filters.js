(()=>{'use strict';const app=document.getElementById('app');if(!app)return;const scopes=new Map();
const key=(form,input)=>location.hash+'|'+input.name;
window.GFAIR_RESET_SEARCH_SCOPE=()=>{for(const k of scopes.keys())if(k.startsWith(location.hash+'|'))scopes.delete(k)};
window.GFAIR_SEARCH_SCOPE=(name)=>scopes.get(location.hash+'|'+name)||'전체';
function enhance(form){if(form.dataset.searchLayout)return;form.dataset.searchLayout='true';form.classList.add('unified-search');
// 기존 컨트롤과 이벤트를 유지하면서 조건 순서를 정리한다.
form.querySelectorAll('.notice-filter-line').forEach(row=>row.replaceWith(...row.childNodes));
const actions=document.createElement('div');actions.className='search-actions';
[...form.querySelectorAll('button')].filter(b=>b.type==='submit'||/^(검색|초기화)$/.test(b.textContent.trim())).forEach(b=>actions.append(b));
if(!actions.querySelector('[type="submit"]')){const b=document.createElement('button');b.type='submit';b.className='btn primary';b.textContent='검색';actions.prepend(b);}
if(![...actions.children].some(b=>b.textContent.trim()==='초기화')){const b=document.createElement('button');b.type='reset';b.className='btn';b.textContent='초기화';actions.append(b);}
const inputs=[...form.querySelectorAll('input[type="search"],input[name="query"],input[name="f2"]')].filter(i=>!i.closest('[data-multi-filter]')&&(i.type==='search'||i.name==='query'));
// 키워드 입력은 하나만 유지하고 나머지 중복 필드는 제거한다.
inputs.slice(1).forEach(input=>{const field=input.closest('.field');if(field&&field!==inputs[0]?.closest('.field'))field.remove();else input.remove();});
const keywords=[];
inputs.slice(0,1).forEach(input=>{const field=input.closest('.field')||input.parentElement;if(field===form)return;field.classList.add('search-keyword');const caption=field.querySelector(':scope>span');const title=caption?.textContent.trim()||'키워드';if(caption)caption.textContent='키워드 검색';
const controls=document.createElement('div');controls.className='search-keyword-controls';const select=document.createElement('select');select.setAttribute('aria-label','키워드 검색 범위');
let labels=[...app.querySelectorAll('#content table thead th')].map(e=>e.textContent.trim()).filter(t=>/제목|내용|기업|바이어|이름|소속|관리자 ID|담당자|행사명|국가/.test(t));if(location.hash.includes('NTC-01'))labels=['제목','내용','작성자'];if((location.hash.slice(1)||document.body.dataset.screen)==='BAS-01')labels=['행사명','전시관구분'];
if(location.hash.slice(1)==='BAS-03')labels=['바이어코드','바이어명'];if(location.hash.slice(1)==='BAS-07')labels=['통역원코드','통역원명'];
if(location.hash.slice(1)==='BAS-05')labels=['바이어코드','바이어명','소속기업'];
if(location.hash.slice(1)==='BAS-16')labels=['이름','아이디','소속'];
[...new Set(['전체',...labels].filter(Boolean))].forEach(t=>select.add(new Option(t,t)));select.value=scopes.get(key(form,input))||'전체';select.addEventListener('change',()=>scopes.set(key(form,input),select.value));
input.placeholder='검색어를 입력해 주세요';controls.append(select,input);field.append(controls);keywords.push(field);});
[...form.querySelectorAll(':scope>.row')].filter(e=>!e.children.length).forEach(e=>e.remove());keywords.forEach(f=>form.append(f));form.append(actions);
[...form.children].filter(e=>e.matches('.field,fieldset')&&!e.classList.contains('search-keyword')).forEach(field=>{field.classList.add('search-condition');const caption=field.querySelector(':scope>legend,:scope>span,:scope>label');if(!caption)return;caption.classList.add('search-condition-caption');const controls=document.createElement('div');controls.className='search-condition-controls';[...field.childNodes].filter(n=>n!==caption).forEach(n=>controls.append(n));field.append(controls);});
// fieldset의 범례를 가로 그리드에 맞추고 접근 가능한 그룹 이름을 유지한다.
form.querySelectorAll(':scope>fieldset.search-condition').forEach((fieldset,index)=>{const group=document.createElement('div');group.className=fieldset.className;group.setAttribute('role','group');const legend=fieldset.querySelector(':scope>legend');if(legend){const caption=document.createElement('span');caption.className=legend.className;caption.id='search-caption-'+Math.random().toString(36).slice(2);caption.textContent=legend.textContent;legend.replaceWith(caption);group.setAttribute('aria-labelledby',caption.id);}group.append(...fieldset.childNodes);fieldset.replaceWith(group);});
// 선택지가 적고 의미가 고정된 상태·구분 항목은 펼쳐진 라디오로 제공한다.
form.querySelectorAll(':scope>.search-condition').forEach(field=>{
 const controls=field.querySelector('.search-condition-controls'),caption=field.querySelector('.search-condition-caption')?.textContent||'';if(!controls)return;
 const select=controls.querySelector(':scope>select');
 if(select&&!select.multiple&&select.name&&!select.disabled&&/상태|구분|여부|유형|사용/.test(caption)&&select.options.length>=2&&select.options.length<=(location.hash.slice(1)==='JNL-14'&&select.name==='status'?5:4)&&[...select.options].every(o=>o.text.length<=8)){
 const radios=document.createElement('div');radios.className='search-radio-options';radios.setAttribute('role','radiogroup');radios.setAttribute('aria-label',caption);
 [...select.options].forEach(option=>{const label=document.createElement('label'),radio=document.createElement('input');radio.type='radio';radio.name=select.name;radio.value=option.value;radio.checked=radio.defaultChecked=option.selected;radio.disabled=option.disabled;radio.addEventListener('change',()=>{select.value=radio.value;select.dispatchEvent(new Event('change',{bubbles:true}));});label.append(radio,document.createTextNode(option.text));radios.append(label);});
 select.hidden=true;select.disabled=true;controls.append(radios);
 }
 const radioCount=controls.querySelectorAll('input[type=radio]').length;
 if(controls.querySelector('details,input[type=date],input[type=datetime-local]')||radioCount>=3||[...controls.querySelectorAll('select:not([hidden])')].some(select=>[...select.selectedOptions].some(option=>option.text.length>18)))field.classList.add('search-condition-wide');
});
if(keywords.length){keywords[0].querySelector('.search-keyword-controls').append(actions);form.classList.add('search-has-keyword');}
const conditions=[...form.querySelectorAll(':scope>.search-condition')].filter(e=>!e.hidden);
form.classList.toggle('search-single-condition',conditions.length===1);
if(conditions.length%2===1)conditions.at(-1).classList.add('search-condition-last-odd');
form.addEventListener('reset',()=>{keywords.forEach(f=>{const i=f.querySelector('input');scopes.delete(key(form,i));f.querySelector('select').value='전체';});});
}
function sync(){observer.disconnect();try{app.querySelectorAll('#content form.filters').forEach(enhance);}finally{observer.observe(app,{childList:true,subtree:true});}}
const observer=new MutationObserver(sync);sync();})();
