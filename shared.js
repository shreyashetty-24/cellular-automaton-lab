const CA={
  prng(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},
  fmt(B,S){const f=s=>[...s].sort((a,b)=>a-b).join('');return 'B'+f(B)+'/S'+f(S)},
  parse(s){const m=/^B(\d*)\/S(\d*)$/i.exec(s||'');if(!m)return null;const f=x=>new Set(x.split('').map(Number).filter(n=>n<=8));return{B:f(m[1]),S:f(m[2])}},
  step(g,c,r,B,S){
    const n=new Uint8Array(c*r),b=new Uint8Array(9),s=new Uint8Array(9);B.forEach(k=>b[k]=1);S.forEach(k=>s[k]=1);
    for(let y=0;y<r;y++){const u=((y+r-1)%r)*c,m=y*c,d=((y+1)%r)*c;
      for(let x=0;x<c;x++){const l=(x+c-1)%c,h=(x+1)%c;
        const k=g[u+l]+g[u+x]+g[u+h]+g[m+l]+g[m+h]+g[d+l]+g[d+x]+g[d+h];
        n[m+x]=g[m+x]?s[k]:b[k]}}
    return n},
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
