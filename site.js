(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var els = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach(function(e){e.classList.add('in');}); return; }
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
  },{threshold:0.12, rootMargin:'0px 0px -8% 0px'});
  els.forEach(function(e){ io.observe(e); });
  var h = document.querySelector('header');
  window.addEventListener('scroll', function(){ h.classList.toggle('scrolled', window.scrollY > 8); }, {passive:true});
})();
