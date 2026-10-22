(()=>{
 function sync(){
  document.querySelectorAll('.field>span:first-child,.field>label:first-child,fieldset>legend').forEach(label=>{
   if(label.closest('.ui-spec-panel,.ui-spec-toolbar,.annotation-dialog'))return;
   const field=label.parentElement;
   const old=label.querySelector('em,.notice-required,.required-asterisk');
   const starred=Array.from(label.childNodes).some(n=>n.nodeType===3&&n.textContent.includes('*'));
   const required=!!field.querySelector('input[required],select[required],textarea[required],[aria-required="true"]')||starred||!!old;
   if(!required)return;
   let marker=old;
   if(!marker){Array.from(label.childNodes).filter(n=>n.nodeType===3).forEach(n=>{if(n.textContent.includes('*'))n.textContent=n.textContent.replace(/\*/g,'').trimEnd();});marker=document.createElement('span');label.append(marker);}
   marker.classList.add('required-asterisk');if(marker.textContent!=='*')marker.textContent='*';marker.setAttribute('role','img');marker.setAttribute('aria-label','필수');
  });
 }
 new MutationObserver(sync).observe(document.body,{childList:true,subtree:true});sync();
})();
