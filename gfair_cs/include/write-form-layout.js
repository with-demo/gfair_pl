(()=>{
 const app=document.getElementById('app');if(!app)return;
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/write-form-layout.css?v=jnl05-basic-info-20261022',document.currentScript.src);document.head.append(css);
 function arrange(){
  app.querySelectorAll('form .formgrid,form.formgrid,form .notice-form-grid,form .management-form,form .group-detail-form,form .group-access-body').forEach(grid=>{
   if(grid.closest('.filters,.login-form,.survey-paper'))return;
   grid.classList.add('write-form-rows');
   grid.querySelectorAll(':scope > .field,:scope > fieldset:has(>legend)').forEach(field=>{
    if(field.classList.contains('write-form-row'))return;
    const label=field.firstElementChild;if(!label||!label.matches('span,label,legend'))return;
    const controls=document.createElement('div');controls.className='write-form-controls';
    Array.from(field.childNodes).filter(node=>node!==label&&!node.classList?.contains('ui-spec-pin')).forEach(node=>controls.append(node));
    field.append(controls);field.classList.add('write-form-row');
   });
  });
 }
 new MutationObserver(arrange).observe(app,{childList:true,subtree:true});arrange();
})();
