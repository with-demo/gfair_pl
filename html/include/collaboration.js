/* 서버가 인증과 권한을 검증한다. 브라우저에는 현재 탭의 세션만 보관한다. */
(()=>{
 'use strict';
 const SERVER='https://gfair-description-collaboration.meung00.chatgpt.site';
 const TOKEN='gfair.collab.session',VERIFIER='gfair.collab.verifier';
 let token=sessionStorage.getItem(TOKEN)||'',user=null,records=[],screen='',snapshot='',busy=false;
 const changed=()=>window.dispatchEvent(new Event('collaboration-updated'));
 const current=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen||'screens';
 async function api(op,body){
  const url=SERVER+'/api/collab'+(body?'':'?'+new URLSearchParams({op,screen:current()}));
  const response=await fetch(url,{method:body?'POST':'GET',credentials:'omit',cache:'no-store',headers:{...(body?{'Content-Type':'application/json'}:{}),...(token?{Authorization:'Bearer '+token}:{})},body:body?JSON.stringify({op,...body}):undefined});
  let result;try{result=await response.json();}catch{throw Error('공동작업 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.');}
  if(!response.ok){if(response.status===401){token='';user=null;records=[];sessionStorage.removeItem(TOKEN);changed();}throw Error(result.error||'요청을 처리하지 못했습니다.');}return result;
 }
 async function refresh(){
  const route=current();if(!token||route==='screens'||busy)return;
  busy=true;try{const result=await api('list');if(route!==current())return;user=result.user;records=result.records;screen=route;const next=JSON.stringify(result);if(next!==snapshot){snapshot=next;changed();}window.GFAIR_COLLAB.error='';}
  catch(error){window.GFAIR_COLLAB.error=error.message;changed();}finally{busy=false;}
 }
 async function login(){
  const bytes=crypto.getRandomValues(new Uint8Array(32)),verifier=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
  sessionStorage.setItem(VERIFIER,verifier);const digest=new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));
  const challenge=btoa(String.fromCharCode(...digest)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
  location.assign(SERVER+'/connect?'+new URLSearchParams({challenge,screen:current()==='screens'?'MON-01':current()}));
 }
 window.GFAIR_COLLAB={get user(){return user;},get records(){return screen===current()?records:[];},error:'',login,refresh,
  async mutate(op,body){const result=await api(op,body);snapshot='';await refresh();return result;},
  async members(){return (await api('members')).members;},
  async logout(){try{if(token)await api('logout',{});}finally{token='';user=null;records=[];snapshot='';sessionStorage.removeItem(TOKEN);changed();}}
 };
 window.addEventListener('hashchange',()=>{snapshot='';changed();refresh();});
 document.addEventListener('click',event=>{if(event.target.closest('[data-spec=refresh]'))refresh();});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});setInterval(()=>{if(!document.hidden)refresh();},5000);
 (async()=>{const url=new URL(location.href),code=url.searchParams.get('annotation_code');
  if(code){url.searchParams.delete('annotation_code');history.replaceState(null,'',url.pathname+url.search+url.hash);try{const verifier=sessionStorage.getItem(VERIFIER);sessionStorage.removeItem(VERIFIER);if(!verifier)throw Error('로그인을 시작한 탭에서 다시 로그인해 주세요.');const result=await api('exchange',{code,verifier});token=result.token;user=result.user;sessionStorage.setItem(TOKEN,token);}catch(error){window.GFAIR_COLLAB.error=error.message;changed();}}
  await refresh();changed();
 })();
})();
