/* 서버가 인증과 권한을 검증한다. 브라우저에는 현재 탭의 세션만 보관한다. */
(()=>{
 'use strict';
 const SERVER=window.MOCKUP_SHARED_CONFIG.server;
 const PROJECT=document.body.dataset.project||window.MOCKUP_SHARED_CONFIG.defaultProject;
 const TOKEN='gfair.collab.session',VERIFIER='gfair.collab.verifier';
 let token=sessionStorage.getItem(TOKEN)||'',user=null,records=[],screen='',snapshot='',busy=false,githubReady=false;
 const changed=()=>window.dispatchEvent(new Event('collaboration-updated'));
 const current=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen||'screens';
 async function api(op,body){
  const url=SERVER+'/api/collab'+(body?'':'?'+new URLSearchParams({op,project:PROJECT,screen:current()}));
  const response=await fetch(url,{method:body?'POST':'GET',credentials:'omit',cache:'no-store',headers:{...(body?{'Content-Type':'application/json'}:{}),...(token?{Authorization:'Bearer '+token}:{})},body:body?JSON.stringify({op,project:PROJECT,...body}):undefined});
  let result;try{result=await response.json();}catch{throw Error('공동작업 서버에 연결하지 못했습니다. 잠시 후 다시 시도해 주세요.');}
  if(!response.ok){if(response.status===401){token='';user=null;records=[];sessionStorage.removeItem(TOKEN);changed();if(op==='list'&&!body)return api('list');}throw Error(result.error||'요청을 처리하지 못했습니다.');}return result;
 }
 async function refresh(){
  const route=current();if(route==='screens'||busy)return;
  busy=true;try{const result=await api('list');if(route!==current())return;user=result.user;githubReady=!!result.githubConfigured;records=result.records;screen=route;const next=JSON.stringify(result);if(next!==snapshot){snapshot=next;changed();}if(!new URL(location.href).searchParams.has('annotation_error')&&!window.GFAIR_COLLAB.authError)window.GFAIR_COLLAB.error='';}
  catch(error){window.GFAIR_COLLAB.error=error.message;changed();}finally{busy=false;}
 }
 async function login(){
  if(!githubReady)throw Error('GitHub 로그인 앱 연결 설정이 필요합니다.');
  window.GFAIR_COLLAB.authError=false;window.GFAIR_COLLAB.error='';
  const bytes=crypto.getRandomValues(new Uint8Array(32)),verifier=Array.from(bytes,b=>b.toString(16).padStart(2,'0')).join('');
  sessionStorage.setItem(VERIFIER,verifier);const digest=new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(verifier)));
  const challenge=btoa(String.fromCharCode(...digest)).replace(/=/g,'').replace(/\+/g,'-').replace(/\//g,'_');
  location.assign(SERVER+'/api/github/start?'+new URLSearchParams({challenge,project:PROJECT,screen:current()==='screens'?'MON-01':current()}));
 }
 window.GFAIR_COLLAB={get user(){return user;},get githubReady(){return githubReady;},get records(){return screen===current()?records:[];},error:'',login,refresh,
  async mutate(op,body){const result=await api(op,body);snapshot='';await refresh();return result;},
  async logout(){try{if(token)await api('logout',{});}finally{token='';user=null;records=[];snapshot='';sessionStorage.removeItem(TOKEN);changed();}}
 };
 window.addEventListener('hashchange',()=>{snapshot='';changed();refresh();});
 document.addEventListener('click',event=>{if(event.target.closest('[data-spec=refresh]'))refresh();});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});setInterval(()=>{if(!document.hidden)refresh();},5000);
 (async()=>{const url=new URL(location.href),code=url.searchParams.get('annotation_code'),authError=url.searchParams.get('annotation_error');
  if(authError){window.GFAIR_COLLAB.authError=true;url.searchParams.delete('annotation_error');history.replaceState(null,'',url.pathname+url.search+url.hash);const messages={github_configuration:'GitHub 로그인 앱 연결 설정이 필요합니다.',github_request:'로그인 요청이 만료되었습니다. 다시 시작해 주세요.',github_cancelled:'GitHub 로그인을 취소했습니다.',github_not_collaborator:'이 계정은 저장소 공동작업자가 아닙니다. 댓글은 로그인 없이 작성할 수 있습니다.',github_permissions:'GitHub App의 저장소 설치 및 Metadata 권한을 확인해 주세요.',github_login:'GitHub 로그인에 실패했습니다. 다시 시도해 주세요.'};window.GFAIR_COLLAB.error=messages[authError]||'GitHub 로그인을 다시 진행해 주세요.';changed();}
  if(code){url.searchParams.delete('annotation_code');history.replaceState(null,'',url.pathname+url.search+url.hash);try{const verifier=sessionStorage.getItem(VERIFIER);sessionStorage.removeItem(VERIFIER);if(!verifier)throw Error('로그인을 시작한 탭에서 다시 로그인해 주세요.');const result=await api('exchange',{code,verifier});token=result.token;user=result.user;sessionStorage.setItem(TOKEN,token);}catch(error){window.GFAIR_COLLAB.error=error.message;changed();}}
  try{githubReady=(await api('config')).githubConfigured;}catch(error){window.GFAIR_COLLAB.error=error.message;}await refresh();changed();
 })();
})();
