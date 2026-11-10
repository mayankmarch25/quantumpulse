(function(){
  var bar=document.getElementById('prog');
  if(bar) addEventListener('scroll',function(){var h=document.documentElement;bar.style.width=((h.scrollTop/(h.scrollHeight-h.clientHeight)*100)||0)+'%';},{passive:true});
  var tt=document.getElementById('themeToggle');
  if(tt) tt.addEventListener('click',function(){
    var root=document.documentElement;
    var cur=root.getAttribute('data-theme')||'dark';   /* dark is the default */
    var next=cur==='dark'?'light':'dark';
    root.setAttribute('data-theme',next);
    try{localStorage.setItem('qp-theme',next);}catch(e){}
    dispatchEvent(new Event('qp-theme'));
  });
  var nt=document.getElementById('navToggle'), nav=document.getElementById('siteNav');
  if(nt&&nav) nt.addEventListener('click',function(){
    var open=nav.classList.toggle('open');
    nt.setAttribute('aria-expanded',open?'true':'false');
    nt.setAttribute('aria-label',open?'Close menu':'Open menu');
  });
  var toTop=document.getElementById('toTop');
  if(toTop){
    addEventListener('scroll',function(){ toTop.classList.toggle('show', window.scrollY>600); },{passive:true});
    toTop.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  }
})();
