/* Quantum Pulse hero: an interference field behind the title and a slowly turning qubit sphere. Pure canvas, no libraries. */
(function(){
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function css(name){ return getComputedStyle(document.documentElement).getPropertyValue(name).trim(); }
  function rgb(hex){ hex=hex.replace('#',''); if(hex.length===3) hex=hex.split('').map(function(c){return c+c;}).join(''); var n=parseInt(hex,16); return [(n>>16)&255,(n>>8)&255,n&255]; }

  /* ---------- interference field ---------- */
  var f=document.getElementById('ifield');
  if(f){
    var fx=f.getContext('2d'), W,H, t0=null;
    function size(){ var r=f.parentElement.getBoundingClientRect(); W=f.width=Math.floor(r.width); H=f.height=Math.floor(r.height); }
    size(); addEventListener('resize',size);
    function drawField(t){
      fx.clearRect(0,0,W,H);
      var c1=rgb(css('--cobalt')), c2=rgb(css('--cyan')), light=document.documentElement.getAttribute('data-theme')==='light';
      var gap=24, k=2*Math.PI/110, w=t*0.0016;
      var s1=[W*0.18,H*0.9], s2=[W*0.62,H*0.1];
      for(var y=gap/2;y<H;y+=gap){ for(var x=gap/2;x<W;x+=gap){
        var d1=Math.hypot(x-s1[0],y-s1[1]), d2=Math.hypot(x-s2[0],y-s2[1]);
        var a=(Math.sin(k*d1-w)+Math.sin(k*d2-w))/2;          /* -1..1 */
        var b=(a+1)/2;                                          /* 0..1 */
        var r=0.8+2.4*b, mix=b;
        var col=[c1[0]+(c2[0]-c1[0])*mix, c1[1]+(c2[1]-c1[1])*mix, c1[2]+(c2[2]-c1[2])*mix];
        var alpha=light? 0.10+0.35*b : 0.08+0.6*b*b;
        fx.beginPath(); fx.arc(x,y,r,0,6.283); fx.fillStyle='rgba('+(col[0]|0)+','+(col[1]|0)+','+(col[2]|0)+','+alpha.toFixed(3)+')'; fx.fill();
      }}
    }
    if(reduce){ drawField(0); }
    else (function loop(ts){ if(t0===null)t0=ts; drawField(ts-t0); requestAnimationFrame(loop); })(0);
    addEventListener('qp-theme',function(){ if(reduce) drawField(0); });
  }

  /* ---------- turning Bloch sphere ---------- */
  var c=document.getElementById('bloch3d');
  if(c){
    var g=c.getContext('2d'), S=c.width, R=S*0.40, cx=S/2, cy=S/2, tilt=0.35, t1=null;
    var thS=document.getElementById('hTheta'), phS=document.getElementById('hPhi'), thO=document.getElementById('hThetaOut'), phO=document.getElementById('hPhiOut'), p0=document.getElementById('hP0'), p1=document.getElementById('hP1'), res=document.getElementById('hRes'), mb=document.getElementById('hMeasure');
    var thDeg=thS?+thS.value:50, phDeg=phS?+phS.value:0, shown=thDeg, snapping=false;
    function readout(){ var t=thDeg*Math.PI/180, a=Math.cos(t/2), b=Math.sin(t/2); if(p0) p0.textContent=Math.round(a*a*100)+'%'; if(p1) p1.textContent=Math.round(b*b*100)+'%'; if(thO) thO.textContent=thDeg+'°'; if(phO) phO.textContent=phDeg+'°'; }
    if(thS) thS.addEventListener('input',function(){ thDeg=+thS.value; if(!snapping) shown=thDeg; readout(); if(res) res.textContent=''; if(reduce) drawSphere(1200); });
    if(phS) phS.addEventListener('input',function(){ phDeg=+phS.value; readout(); if(reduce) drawSphere(1200); });
    if(mb) mb.addEventListener('click',function(){ if(snapping) return; var t=thDeg*Math.PI/180, pr1=Math.sin(t/2)*Math.sin(t/2), one=Math.random()<pr1; snapping=true; var target=one?180:0; if(res) res.textContent='→ got '+(one?'1':'0'); var start=shown, t0s=null; (function anim(ts){ if(t0s===null)t0s=ts; var f=Math.min((ts-t0s)/(reduce?1:260),1); shown=start+(target-start)*f; if(reduce) drawSphere(1200); if(f<1) requestAnimationFrame(anim); else setTimeout(function(){ var s2=shown, t1s=null; (function back(ts2){ if(t1s===null)t1s=ts2; var f2=Math.min((ts2-t1s)/(reduce?1:500),1); shown=s2+(thDeg-s2)*f2; if(reduce) drawSphere(1200); if(f2<1) requestAnimationFrame(back); else snapping=false; })(0); }, reduce?0:700); })(0); });
    readout();
    function P(x,y,z,a){ /* rotate about y by a, then tilt about x; orthographic */
      var x1=x*Math.cos(a)+z*Math.sin(a), z1=-x*Math.sin(a)+z*Math.cos(a);
      var y1=y*Math.cos(tilt)-z1*Math.sin(tilt), z2=y*Math.sin(tilt)+z1*Math.cos(tilt);
      return [cx+x1*R, cy-y1*R, z2];
    }
    function stroke(pts,color,width){ g.beginPath(); for(var i=0;i<pts.length;i++){ var p=pts[i]; if(i===0) g.moveTo(p[0],p[1]); else g.lineTo(p[0],p[1]); } g.strokeStyle=color; g.lineWidth=width; g.stroke(); }
    function drawSphere(t){
      g.clearRect(0,0,S,S);
      var a=t*0.00018, line=css('--line'), cob=rgb(css('--cobalt')), cy_=rgb(css('--cyan')), gold=css('--gold'), ink=css('--ink'), mut=css('--muted');
      /* glow disc */
      var grd=g.createRadialGradient(cx,cy,R*0.2,cx,cy,R*1.15); grd.addColorStop(0,'rgba('+cob[0]+','+cob[1]+','+cob[2]+',.10)'); grd.addColorStop(1,'rgba('+cob[0]+','+cob[1]+','+cob[2]+',0)');
      g.fillStyle=grd; g.beginPath(); g.arc(cx,cy,R*1.15,0,6.283); g.fill();
      /* latitudes */
      for(var la=-60;la<=60;la+=30){ var th=la*Math.PI/180, pts=[]; for(var i=0;i<=72;i++){ var ph=i/72*6.283; pts.push(P(Math.cos(th)*Math.cos(ph),Math.sin(th),Math.cos(th)*Math.sin(ph),a)); } stroke(pts, la===0? 'rgba('+cy_[0]+','+cy_[1]+','+cy_[2]+',.55)' : line, la===0?1.4:1); }
      /* longitudes */
      for(var lo=0;lo<180;lo+=30){ var ph2=lo*Math.PI/180, pts2=[]; for(var j=0;j<=72;j++){ var th2=j/72*6.283; pts2.push(P(Math.cos(th2)*Math.cos(ph2),Math.sin(th2),Math.cos(th2)*Math.sin(ph2),a)); } stroke(pts2,line,1); }
      /* outline */
      g.beginPath(); g.arc(cx,cy,R,0,6.283); g.strokeStyle='rgba('+cob[0]+','+cob[1]+','+cob[2]+',.7)'; g.lineWidth=1.5; g.stroke();
      /* axis */
      var top=P(0,1,0,a), bot=P(0,-1,0,a); g.setLineDash([3,5]); stroke([bot,top],mut,1); g.setLineDash([]);
      /* state arrow: theta 50deg from top, phi turning with the sphere plus a little extra */
      var th3=shown*Math.PI/180, ph3=phDeg*Math.PI/180; var v=P(Math.sin(th3)*Math.cos(ph3),Math.cos(th3),Math.sin(th3)*Math.sin(ph3),a);
      var front=v[2]>0;
      g.beginPath(); g.moveTo(cx,cy); g.lineTo(v[0],v[1]); g.strokeStyle='rgb('+cob[0]+','+cob[1]+','+cob[2]+')'; g.lineWidth=front?3.5:2.5; g.globalAlpha=front?1:.55; g.stroke();
      g.beginPath(); g.arc(v[0],v[1],front?7:5,0,6.283); g.fillStyle=gold; g.shadowColor=gold; g.shadowBlur=front?18:6; g.fill(); g.shadowBlur=0; g.globalAlpha=1;
      g.beginPath(); g.arc(cx,cy,3.5,0,6.283); g.fillStyle=ink; g.fill();
      /* labels */
      g.font='600 '+Math.round(S*0.045)+'px IBM Plex Mono, monospace'; g.fillStyle=ink; g.textAlign='center';
      g.fillText('|0⟩',top[0],top[1]-12); g.fillText('|1⟩',bot[0],bot[1]+Math.round(S*0.05));
    }
    if(reduce){ drawSphere(1200); }
    else (function loop(ts){ if(t1===null)t1=ts; drawSphere(ts-t1); requestAnimationFrame(loop); })(0);
    addEventListener('qp-theme',function(){ if(reduce) drawSphere(1200); });
  }
})();
