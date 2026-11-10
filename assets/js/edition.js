/* Edition rail: section list built from the headings, active section on scroll, reading progress. */
(function(){
  var toc=document.getElementById('toc'), body=document.querySelector('.ed-body'); if(!toc||!body) return;
  var heads=Array.prototype.slice.call(body.querySelectorAll('h2')).map(function(h){ var id=h.id||(h.closest('[id]')&&h.closest('[id]').id); if(!id){ id='s-'+Math.random().toString(36).slice(2,7); h.id=id; } var n=h.querySelector('.n'); var label=h.textContent.replace(n?n.textContent:'','').trim(); return {id:id,label:label,el:h}; });
  toc.innerHTML=heads.map(function(x,i){ return '<a href="#'+x.id+'" data-i="'+i+'"><b>'+String(i+1).padStart(2,'0')+'</b>'+x.label+'</a>'; }).join('');
  var links=toc.querySelectorAll('a');
  function setActive(){ var y=scrollY+140, cur=0; heads.forEach(function(x,i){ var top=x.el.getBoundingClientRect().top+scrollY; if(top<=y) cur=i; }); links.forEach(function(l,i){ l.classList.toggle('on',i===cur); }); }
  var pct=document.getElementById('railPct'), bar=document.getElementById('railBar');
  function prog(){ var r=body.getBoundingClientRect(), top=r.top+scrollY, h=r.height-innerHeight; var p=Math.max(0,Math.min(1,(scrollY-top+innerHeight*0.6)/Math.max(1,h))); var v=Math.round(p*100); if(pct) pct.textContent=v+'%'; if(bar) bar.style.width=v+'%'; }
  addEventListener('scroll',function(){ setActive(); prog(); },{passive:true}); setActive(); prog();
})();
