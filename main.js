document.querySelectorAll('[data-print]').forEach(button=>button.addEventListener('click',()=>window.print()));
const sectionLinks=[...document.querySelectorAll('.rail nav a')];
const sections=[...document.querySelectorAll('main > section[id]')];
if(sections.length){
  const observer=new IntersectionObserver(entries=>{
    const current=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
    if(!current)return;
    sectionLinks.forEach(link=>{
      if(link.hash==='#'+current.target.id)link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  },{rootMargin:'-12% 0px -55% 0px'});
  sections.forEach(section=>observer.observe(section));
}
