(()=>{
 'use strict';
 const detail=()=>document.querySelector('#app .journal-detail-view');
 let original='';
 const toast=message=>{const node=document.getElementById('toast');if(!node)return;node.textContent=message;node.hidden=false;clearTimeout(toast.timer);toast.timer=setTimeout(()=>node.hidden=true,2600)};
 function enterEdit(view){
  original=view.innerHTML;
  view.querySelectorAll('.journal-pair').forEach((pair,index)=>{
   const label=pair.querySelector('.journal-label')?.textContent.replace(/\*/g,'').trim()||'';
   const control=pair.querySelector('.journal-control');if(!control)return;
   const tagList=control.querySelector('.hashtag-list');
   if(tagList){const input=document.createElement('input');input.type='text';input.value=[...tagList.querySelectorAll('.hashtag-label')].map(x=>x.textContent.replace(/^#/,'')).join(', ');input.dataset.j16Edit='hashtags';tagList.replaceWith(input);return}
   const fields=[...control.querySelectorAll('input:not([type=radio]):not([type=checkbox]),textarea')];
   fields.forEach((field,fieldIndex)=>{if(fieldIndex>0&&field.value==='USD')return;field.removeAttribute('readonly');field.removeAttribute('aria-readonly');field.dataset.j16Edit=label+'-'+fieldIndex});
   control.querySelectorAll('input[type=radio],input[type=checkbox]').forEach((field,fieldIndex)=>{field.disabled=false;field.name='j16-'+index;field.dataset.j16Edit=label+'-'+fieldIndex});
  });
  const footer=view.querySelector('.formfooter');if(footer)footer.innerHTML='<button type="button" class="btn primary" data-j16-save>저장</button><button type="button" class="btn" data-j16-cancel>취소</button>';
  view.dataset.editing='true';
 }
 function leaveEdit(view,save){
  if(!view)return;
  if(!save){view.innerHTML=original;delete view.dataset.editing;return}
  view.querySelectorAll('[data-j16-edit]').forEach(field=>{if(field.type==='radio'||field.type==='checkbox'){field.disabled=true;return}field.setAttribute('readonly','');field.setAttribute('aria-readonly','true')});
  const hashtags=view.querySelector('input[data-j16-edit="hashtags"]');if(hashtags){const list=document.createElement('div');list.className='hashtag-list';hashtags.value.split(',').map(x=>x.trim().replace(/^#/,'')).filter(Boolean).forEach(tag=>{const chip=document.createElement('span');chip.className='hashtag-label';chip.textContent='#'+tag;list.append(chip)});hashtags.replaceWith(list)}
  const footer=view.querySelector('.formfooter');if(footer)footer.innerHTML='<button type="button" class="btn primary" data-action="edit-export-journal">수정</button><a class="btn primary" href="#JNL-14">목록</a>';
  delete view.dataset.editing;toast('수정 내용을 현재 화면에 반영했습니다. 서버 저장은 연계 후 적용됩니다.');
 }
 document.addEventListener('click',event=>{
  const edit=event.target.closest('[data-action="edit-export-journal"]');
  if(edit){const view=detail();if(!view)return;event.preventDefault();event.stopImmediatePropagation();enterEdit(view);return}
  if(event.target.closest('[data-j16-save]')){event.preventDefault();event.stopImmediatePropagation();leaveEdit(detail(),true);return}
  if(event.target.closest('[data-j16-cancel]')){event.preventDefault();event.stopImmediatePropagation();leaveEdit(detail(),false)}
 },true);
})();
