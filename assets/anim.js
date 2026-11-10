(function(){if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
document.documentElement.classList.add('anim');
var sel='.s-head,.svc>.sv,.prom>div,.who,.talk,.step,.next,.priv,#plans .card,#plans .plan,.tile,.final .wrap>*,#features .card,.facts li,.prod1,.rail>*';
var els=[].slice.call(document.querySelectorAll(sel));
els.forEach(function(e){var sib=e.parentElement?[].indexOf.call(e.parentElement.children,e):0;e.classList.add('rv');e.style.setProperty('--d',Math.min(sib,5)*0.09+'s');});
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
els.forEach(function(e){io.observe(e);});
setTimeout(function(){els.forEach(function(e){e.classList.add('in')})},6000);
})();
