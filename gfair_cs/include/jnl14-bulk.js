/* JNL-14 사용구분별 일괄 처리. 실제 서버 연계 시에도 상태·작성자 권한을 재검증한다. */
(()=>{
 'use strict';let context=null,pending=[];
 const reviewer=role=>['admin','exportOperator'].includes(role);
 const eligible=(j,role)=>role==='interpreter'?['임시 저장','반려'].includes(j.status):reviewer(role)&&j.status==='승인 요청';
 const selected=()=>[...document.querySelectorAll('#content [data-jnl14-row]:checked')].map(el=>el.value);
 function update(){const rows=[...document.querySelectorAll('#content [data-jnl14-row]:not(:disabled)')],n=selected().length,all=document.querySelector('[data-jnl14-all]');if(all){all.checked=rows.length>0&&n===rows.length;all.indeterminate=n>0&&n<rows.length;}document.querySelectorAll('[data-jnl14-count]').forEach(el=>el.textContent=String(n));document.querySelectorAll('[data-jnl14-bulk]').forEach(el=>el.disabled=!n);}
 window.GFAIR_JNL14={
  table(html,rows,role){if(!['admin','exportOperator','interpreter'].includes(role))return html;let i=0;html=html.replace('<thead><tr>','<thead><tr><th><input type="checkbox" data-jnl14-all aria-label="처리 가능한 상담일지 전체 선택"></th>');html=html.replace(/(<tbody>)([\s\S]*?)(<\/tbody>)/,(_,start,body,end)=>start+body.replace(/<tr>/g,()=>{const j=rows[i++];if(!j)return '<tr>';const enabled=eligible(j,role);return '<tr><td><input type="checkbox" data-jnl14-row value="'+j.id+'" aria-label="'+j.id+' 선택" '+(enabled?'':'disabled title="현재 상태에서는 일괄 처리할 수 없습니다."')+'></td>';})+end);if(!rows.length)html=html.replace(/colspan="(\d+)"/,(_,n)=>'colspan="'+(Number(n)+1)+'"');return html;},
  actions(role,B,A){if(!['admin','exportOperator','interpreter'].includes(role))return '';const button=(action,label)=>B(action,label,'btn primary','data-jnl14-bulk disabled');return '<div class="formfooter">'+(role==='interpreter'?button('jnl14-request','승인 요청')+A('JNL-05','상담일지 등록','btn primary'):button('jnl14-approve','승인')+button('jnl14-reject','반려'))+'</div>';},
  bind(value){context=value;pending=[];update();}
 };
 document.addEventListener('change',event=>{if(!context||context.current!=='JNL-14')return;if(event.target.matches('[data-jnl14-all]'))document.querySelectorAll('[data-jnl14-row]:not(:disabled)').forEach(el=>el.checked=event.target.checked);if(event.target.matches('[data-jnl14-all],[data-jnl14-row]'))update();});
 document.addEventListener('click',event=>{
  const button=event.target.closest('[data-action]');if(!button||!context||context.current!=='JNL-14')return;const action=button.dataset.action;if(!action.startsWith('jnl14-'))return;event.preventDefault();event.stopImmediatePropagation();
  const c=context;
  if(['jnl14-request','jnl14-approve','jnl14-reject'].includes(action)){
   const ids=selected(),rows=c.rows.filter(j=>ids.includes(j.id)&&eligible(j,c.role));if(!rows.length)return c.toast('처리할 상담일지를 선택해 주세요.');pending=rows.map(j=>j.id);
   const verb=action==='jnl14-request'?'승인 요청':action==='jnl14-approve'?'승인':'반려';
   c.modal('상담일지 일괄 '+verb,'<p>선택한 '+pending.length+'건을 '+verb+'하시겠습니까?</p>'+(action==='jnl14-reject'?'<label for="jnl14-reject-reason">공통 반려 사유 <em>*</em></label><textarea id="jnl14-reject-reason" rows="4" placeholder="선택한 상담일지에 공통으로 적용할 반려 사유를 입력하세요." required></textarea><p id="jnl14-reject-error" role="alert"></p>':''),action+'-confirm',verb);return;
  }
  if(!['jnl14-request-confirm','jnl14-approve-confirm','jnl14-reject-confirm'].includes(action))return;
  const request=action==='jnl14-request-confirm',reject=action==='jnl14-reject-confirm';if(request?c.role!=='interpreter':!reviewer(c.role))return c.toast('처리 권한이 없습니다.');
  const reason=document.getElementById('jnl14-reject-reason')?.value.trim()||'';if(reject&&!reason){document.getElementById('jnl14-reject-error').textContent='반려 사유를 입력해 주세요.';document.getElementById('jnl14-reject-reason').focus();return;}
  const rows=c.rows.filter(j=>pending.includes(j.id)&&eligible(j,c.role));if(rows.length!==pending.length||!rows.length)return c.toast('처리 상태가 변경되었습니다. 목록을 다시 확인해 주세요.');
  const state=request?'승인 요청':reject?'반려':'승인 완료';for(const j of rows){j.status=state;if(reject)j.reason=reason;else if(request){j.reason='';j.time=new Date().toLocaleString('sv-SE').slice(0,16);}j.history=j.history||[];j.history.unshift([state,(c.role==='admin'?'관리자':c.role==='exportOperator'?'수출상담 운영용역사':'통역원')+' · '+new Date().toLocaleTimeString('ko-KR')]);}
  document.getElementById('dialog').close();c.render();c.toast(rows.length+'건을 '+state+' 상태로 변경했습니다.');
 });
})();
