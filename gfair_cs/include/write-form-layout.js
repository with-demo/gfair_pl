(()=>{
 const app=document.getElementById('app');if(!app)return;
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/write-form-layout.css?v=single-full-width-20261023',document.currentScript.src);document.head.append(css);
 function arrange(){
  app.querySelectorAll('form .formgrid,form.formgrid,form .form-rows,form .notice-form-grid,form .management-form,form .group-detail-form,form .group-access-body').forEach(grid=>{
   if(grid.closest('.filters,.login-form,.survey-paper'))return;
   grid.classList.add('write-form-rows');
   grid.querySelectorAll(':scope > .field,:scope > fieldset:has(>legend)').forEach(field=>{
    if(field.classList.contains('write-form-row'))return;
    const label=field.firstElementChild;if(!label||!label.matches('span,label,legend'))return;
    const controls=document.createElement('div');controls.className='write-form-controls';
    Array.from(field.childNodes).filter(node=>node!==label&&!node.classList?.contains('ui-spec-pin')).forEach(node=>controls.append(node));
    field.append(controls);field.classList.add('write-form-row');
   });
   const rows=[...grid.children].filter(row=>row.classList.contains('write-form-row'));rows.forEach(row=>row.classList.remove('write-form-single'));let pending=null;
   rows.forEach(row=>{const full=row.matches('fieldset,.wide,:has(textarea),:has(input[type=file])');if(full){if(pending)pending.classList.add('write-form-single');pending=null;}else pending=pending?null:row;});if(pending)pending.classList.add('write-form-single');

  });
 }
 new MutationObserver(arrange).observe(app,{childList:true,subtree:true});arrange();
})();
