(()=>{'use strict';const app=document.getElementById('app');if(!app)return;const scopes=new Map();
const key=(form,input)=>location.hash+'|'+input.name;
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
let labels=[...app.querySelectorAll('#content table thead th')].map(e=>e.textContent.trim()).filter(t=>/제목|내용|기업|바이어|이름|소속|관리자 ID|담당자|행사명|국가/.test(t));if(location.hash.includes('NTC-01'))labels=['제목','내용','작성자'];
[...new Set(['전체',...labels].filter(Boolean))].forEach(t=>select.add(new Option(t,t)));select.value=scopes.get(key(form,input))||'전체';select.addEventListener('change',()=>scopes.set(key(form,input),select.value));
input.placeholder='검색어를 입력해 주세요';controls.append(select,input);field.append(controls);keywords.push(field);});
[...form.querySelectorAll(':scope>.row')].filter(e=>!e.children.length).forEach(e=>e.remove());keywords.forEach(f=>form.append(f));form.append(actions);
[...form.children].filter(e=>e.matches('.field,fieldset')&&!e.classList.contains('search-keyword')).forEach(field=>{field.classList.add('search-condition');const caption=field.querySelector(':scope>legend,:scope>span,:scope>label');if(!caption)return;caption.classList.add('search-condition-caption');const controls=document.createElement('div');controls.className='search-condition-controls';[...field.childNodes].filter(n=>n!==caption).forEach(n=>controls.append(n));field.append(controls);});
const resize=new ResizeObserver(()=>{const available=form.clientWidth-56;let used=0;[...form.children].filter(e=>!e.classList.contains('search-keyword')&&e!==actions&&!e.hidden&&e.getBoundingClientRect().width).forEach(e=>used+=e.getBoundingClientRect().width+24);keywords.forEach(f=>f.classList.toggle('search-keyword-full',used+available/2+actions.offsetWidth+24>available));});resize.observe(form);
form.addEventListener('reset',()=>{keywords.forEach(f=>{const i=f.querySelector('input');scopes.delete(key(form,i));f.querySelector('select').value='전체';});});
}
function sync(){observer.disconnect();try{app.querySelectorAll('#content form.filters').forEach(enhance);}finally{observer.observe(app,{childList:true,subtree:true});}}
const observer=new MutationObserver(sync);sync();})();
