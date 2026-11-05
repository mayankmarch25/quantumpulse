/* Quantum Pulse figure library. Each [data-fig] block is self-contained; no ids, so a figure can appear more than once on a page. */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function q(root, role){ return root.querySelector('[data-role="'+role+'"]'); }
  function act(root, name, fn){ var b=root.querySelector('[data-act="'+name+'"]'); if(b) b.addEventListener('click', fn); return b; }
  function pct(x){ return Math.round(x*100)+'%'; }
  function probs(deg){ var t=deg*Math.PI/180; var a=Math.cos(t/2), b=Math.sin(t/2); return {a:a,b:b,p0:a*a,p1:b*b}; }

  /* qubit arrow on a flat Bloch circle */
  function bloch(stage){
    if(!stage) return { set:function(){} };
    stage.innerHTML='<svg viewBox="0 0 240 240" aria-hidden="true">'
      +'<circle cx="120" cy="120" r="92" fill="none" class="stroke-line" stroke-width="1.5"/>'
      +'<ellipse cx="120" cy="120" rx="92" ry="24" fill="none" class="stroke-line" stroke-width="1" stroke-dasharray="4 4"/>'
      +'<line x1="120" y1="28" x2="120" y2="212" class="stroke-line" stroke-width="1" stroke-dasharray="2 4"/>'
      +'<text x="120" y="17" text-anchor="middle" class="lbl-ink">|0⟩</text>'
      +'<text x="120" y="232" text-anchor="middle" class="lbl-ink">|1⟩</text>'
      +'<g class="arrow" style="transform-box:view-box;transform-origin:120px 120px">'
      +'<line x1="120" y1="120" x2="120" y2="38" class="stroke-cobalt" stroke-width="3.5" stroke-linecap="round"/>'
      +'<polygon points="120,26 111,44 129,44" class="fill-cobalt"/></g>'
      +'<circle cx="120" cy="120" r="4" class="fill-ink"/></svg>';
    var arrow=stage.querySelector('.arrow');
    return { set:function(deg,mode){ arrow.setAttribute('class','arrow'+(mode?' '+mode:'')); arrow.style.transform='rotate('+deg+'deg)'; } };
  }
  function spin(el){ el.classList.remove('flip'); void el.offsetWidth; el.classList.add('flip'); }

  var init = {
    coin: function(root){
      var h=0,t=0, coin=q(root,'coin');
      function draw(){ var n=h+t; q(root,'tn').textContent=n; q(root,'ts').textContent=n?pct(h/n):'–';
        q(root,'bh').style.width=n?(h/n*100)+'%':'0%'; q(root,'bt').style.width=n?(t/n*100)+'%':'0%'; q(root,'vh').textContent=h; q(root,'vt').textContent=t; }
      function once(cb){ spin(coin); var r=Math.random()<0.5; setTimeout(function(){ coin.textContent=r?'H':'T'; if(r)h++; else t++; draw(); if(cb)cb(); }, reduce?0:260); }
      act(root,'flip1',function(){ once(); });
      act(root,'flip20',function(){ var i=0; (function loop(){ if(i++<20) once(function(){ setTimeout(loop, reduce?0:90); }); })(); });
      act(root,'reset',function(){ h=0;t=0; coin.textContent='?'; coin.classList.remove('flip'); draw(); });
    },

    bloch: function(root){
      var mode=root.dataset.mode||'slider', b=bloch(q(root,'stage')), range=q(root,'range');
      if(mode==='measure'){
        var n0=0,n1=0,busy=false;
        function setup(){ var d=+range.value; q(root,'deg').textContent=d+'°'; b.set(d); q(root,'exp').textContent=pct(probs(d).p1); }
        function draw(){ var n=n0+n1; q(root,'t0').textContent=n0; q(root,'t1').textContent=n1; q(root,'obs').textContent=n?pct(n1/n):'–'; }
        range.addEventListener('input',setup); setup();
        act(root,'m1',function(){ if(busy) return; busy=true; var d=+range.value, one=Math.random()<probs(d).p1; b.set(one?180:0,'snap'); if(one)n1++; else n0++; draw();
          setTimeout(function(){ b.set(d,'slow'); setTimeout(function(){busy=false;}, reduce?0:200); }, reduce?0:420); });
        act(root,'m50',function(){ if(busy) return; busy=true; var i=0, d=+range.value, p=probs(d);
          if(reduce){ for(i=0;i<50;i++){ if(Math.random()<p.p1) n1++; else n0++; } draw(); busy=false; return; }
          (function loop(){ if(i++<50){ var one=Math.random()<p.p1; b.set(one?180:0,'snap'); if(one)n1++; else n0++; draw(); setTimeout(loop,120); } else { b.set(d,'slow'); busy=false; } })(); });
        act(root,'reset',function(){ n0=0;n1=0; draw(); setup(); });
      } else {
        function draw(){ var d=+range.value, p=probs(d); q(root,'deg').textContent=d+'°'; b.set(d);
          q(root,'b0').style.width=(p.p0*100)+'%'; q(root,'b1').style.width=(p.p1*100)+'%'; q(root,'v0').textContent=pct(p.p0); q(root,'v1').textContent=pct(p.p1);
          q(root,'a').textContent=p.a.toFixed(3); q(root,'b').textContent=p.b.toFixed(3); q(root,'a2').textContent=p.p0.toFixed(2); q(root,'b2').textContent=p.p1.toFixed(2); }
        range.addEventListener('input',draw); draw();
      }
    },

    compare: function(root){
      var b=bloch(q(root,'stage')), coin=q(root,'coin'), run=root.querySelector('[data-act="run"]'); b.set(0);
      function bars(h,t,a,c){ q(root,'ch').style.width=h+'%'; q(root,'ct').style.width=t+'%'; q(root,'qa').style.width=a+'%'; q(root,'qb').style.width=c+'%';
        q(root,'chv').textContent=h+'%'; q(root,'ctv').textContent=t+'%'; q(root,'qav').textContent=a+'%'; q(root,'qbv').textContent=c+'%'; }
      function reset(){ bars(0,0,100,0); q(root,'chv').textContent='–'; q(root,'ctv').textContent='–'; coin.textContent='?'; coin.classList.remove('flip'); b.set(0,'slow');
        q(root,'lblc').textContent='before: unflipped'; q(root,'lblq').textContent='before: pointing to 0'; run.disabled=false; }
      act(root,'reset',reset);
      run.addEventListener('click',function(){ run.disabled=true; var T=reduce?0:1;
        setTimeout(function(){ spin(coin); coin.textContent='?'; bars(50,50,50,50); b.set(90,'slow');
          q(root,'lblc').innerHTML='after 1st shuffle: <b>50 / 50</b>'; q(root,'lblq').innerHTML='after 1st quarter turn: <b>50 / 50</b>'; }, 100*T);
        setTimeout(function(){ spin(coin); bars(50,50,100,0); b.set(0,'slow');
          q(root,'lblc').innerHTML='after 2nd shuffle: <b>still 50 / 50</b>'; q(root,'lblq').innerHTML='after 2nd quarter turn: <b>back to 0, 100%</b>';
          setTimeout(function(){ run.disabled=false; }, 600*T); }, 1700*T);
      });
    },

    pulse: function(root){
      var b=bloch(q(root,'stage')), svg=q(root,'wave'), W=600, mid=62, c=300, sg=70, A=40, lam=13, pts=[], env=[], cum=[0], total=0;
      for(var x=0;x<=W;x+=2){ var e=Math.exp(-((x-c)*(x-c))/(2*sg*sg)); env.push([x,mid-A*e]); pts.push([x,mid-A*e*Math.sin(2*Math.PI*x/lam)]); total+=e; cum.push(total); }
      function path(a){ return 'M'+a.map(function(p){return p[0]+' '+p[1].toFixed(2);}).join(' L'); }
      svg.innerHTML='<path d="'+path(env)+'" fill="none" class="stroke-muted" stroke-width="1" stroke-dasharray="3 4" opacity=".7"/>'
        +'<path d="'+path(pts)+'" fill="none" class="stroke-cobalt" stroke-width="2" stroke-linejoin="round"/>'
        +'<line data-role="cur" x1="0" y1="8" x2="0" y2="116" class="stroke-gold" stroke-width="2"/>'
        +'<text x="300" y="118" text-anchor="middle" class="lbl">π pulse · time →</text>';
      var cur=q(root,'cur'), read=q(root,'deg'), toggle=root.querySelector('[data-act="toggle"]'), running=!reduce, t0=null, dur=4200, hold=900;
      function frame(ts){ if(!running) return; if(t0===null) t0=ts; var el=(ts-t0)%(dur+hold); var f=Math.min(el/dur,1);
        var idx=Math.round(f*(cum.length-1)); var deg=180*cum[idx]/total; cur.setAttribute('x1',f*W); cur.setAttribute('x2',f*W); b.set(deg,'none'); read.textContent=Math.round(deg)+'°'; requestAnimationFrame(frame); }
      if(reduce){ cur.setAttribute('x1',W); cur.setAttribute('x2',W); b.set(180,'none'); read.textContent='180°'; toggle.textContent='Play'; } else requestAnimationFrame(frame);
      toggle.addEventListener('click',function(){ running=!running; toggle.textContent=running?'Pause':'Play'; if(running){ t0=null; requestAnimationFrame(frame); } });
    },

    amplitude: function(root){
      var range=q(root,'range');
      function draw(){ var a=+range.value, b=Math.sqrt(Math.max(0,1-a*a)); q(root,'out').textContent=a.toFixed(2); q(root,'b').textContent=b.toFixed(3); q(root,'a2').textContent=(a*a).toFixed(2); q(root,'b2').textContent=(b*b).toFixed(2);
        q(root,'b0').style.width=(a*a*100)+'%'; q(root,'b1').style.width=(b*b*100)+'%'; q(root,'v0').textContent=pct(a*a); q(root,'v1').textContent=pct(b*b); }
      range.addEventListener('input',draw); draw();
    },

    switch: function(){}
  };

  document.querySelectorAll('[data-fig]').forEach(function(el){ var f=init[el.dataset.fig]; if(f) f(el); });
})();
