const CA={
  prng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},
  fmt(B,S){const f=s=>[...s].sort((a,b)=>a-b).join('');return 'B'+f(B)+'/S'+f(S)},
  parse(s){const m=/^B(\d*)\/S(\d*)$/i.exec(s||'');if(!m)return null;const f=x=>new Set(x.split('').map(Number).filter(n=>n<=8));return{B:f(m[1]),S:f(m[2])}},
  step(g,c,r,B,S,dead){
    const n=new Uint8Array(c*r),b=new Uint8Array(9),s=new Uint8Array(9);B.forEach(k=>b[k]=1);S.forEach(k=>s[k]=1);
    for(let y=0;y<r;y++){const u=((y+r-1)%r)*c,m=y*c,d=((y+1)%r)*c;
      for(let x=0;x<c;x++){const l=(x+c-1)%c,h=(x+1)%c;
        const k=g[u+l]+g[u+x]+g[u+h]+g[m+l]+g[m+h]+g[d+l]+g[d+x]+g[d+h];
        n[m+x]=g[m+x]?s[k]:b[k]}}
    if(dead){for(let x=0;x<c;x++)n[x]=n[(r-1)*c+x]=0;for(let y=0;y<r;y++)n[y*c]=n[y*c+c-1]=0}
    return n},
  plot(c,h){
    const d=devicePixelRatio||1,w=c.clientWidth,ht=c.clientHeight;if(!w)return;c.width=w*d;c.height=ht*d;
    const x=c.getContext('2d');x.setTransform(d,0,0,d,0,0);
    const L=44,T=10,Bt=20,pw=w-L-10,ph=ht-T-Bt,v=h.slice(-1000);let m=.02;for(const p of v)if(p*1.25>m)m=p*1.25;
    x.font='11px Poppins,sans-serif';x.fillStyle=CA.css('--dim');x.strokeStyle=CA.css('--line');x.lineWidth=1;x.textAlign='right';
    for(let k=0;k<=2;k++){const y=T+ph-ph*k/2;x.beginPath();x.moveTo(L,y);x.lineTo(L+pw,y);x.stroke();x.fillText((m*k/2*100).toFixed(1)+'%',L-6,y+4)}
    x.textAlign='left';x.fillText('live cells, last '+v.length+' steps'+(v.length?': '+(v[v.length-1]*100).toFixed(2)+'%':''),L,ht-4);
    if(v.length>1){x.strokeStyle=CA.css('--orange');x.lineWidth=2;x.beginPath();v.forEach((p,i)=>{const px=L+i*pw/(v.length-1),py=T+ph-p/m*ph;i?x.lineTo(px,py):x.moveTo(px,py)});x.stroke()}},
  samples(){try{return JSON.parse(localStorage.getItem('ca_samples'))||[]}catch(e){return[]}},
  css(v){return getComputedStyle(document.documentElement).getPropertyValue(v).trim()}
};
(function(){
  const R=document.documentElement;let t;
  try{t=localStorage.getItem('ca_theme')}catch(e){}
  if(!t)t=matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';
  function set(v){R.dataset.theme=v;try{localStorage.setItem('ca_theme',v)}catch(e){}
    const b=document.getElementById('themeBtn');if(b)b.textContent=v==='dark'?'Light mode':'Dark mode';
    dispatchEvent(new Event('themechange'))}
  set(t);
  addEventListener('DOMContentLoaded',()=>{
    set(R.dataset.theme);
    document.getElementById('themeBtn').addEventListener('click',()=>set(R.dataset.theme==='dark'?'light':'dark'));
    document.querySelectorAll('.rainbow').forEach(e=>{
      const c=['--pink','--teal','--orange','--yellow'];let i=0;
      e.innerHTML=[...e.textContent].map(ch=>ch===' '?' ':`<span style="color:var(${c[i++%4]})">${ch}</span>`).join('')});
  });
})();
