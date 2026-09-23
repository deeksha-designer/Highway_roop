const reveals=document.querySelectorAll('.reveal');
const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}),{threshold:.12});
reveals.forEach(el=>revealObserver.observe(el));

const counters=document.querySelectorAll('[data-count]');
const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;const el=entry.target;const end=Number(el.dataset.count);const suffix=el.dataset.suffix||'';let value=0;const step=Math.max(1,Math.ceil(end/28));const timer=setInterval(()=>{value=Math.min(end,value+step);el.textContent=value+suffix;if(value===end)clearInterval(timer)},36);counterObserver.unobserve(el)}),{threshold:.45});
counters.forEach(el=>counterObserver.observe(el));

const header=document.querySelector('.site-header');
const heroTrack=document.querySelector('.hero-track');
const heroPanel=document.querySelector('.hero-panel');
const heroTitle=document.querySelector('.hero h1');

function updateHero(){
  const start=heroTrack.offsetTop;
  const travel=Math.max(1,heroTrack.offsetHeight-window.innerHeight);
  const progress=Math.min(1,Math.max(0,(window.scrollY-start)/travel));
  const eased=1-Math.pow(1-progress,3);
  heroPanel.style.setProperty('--panel-x',`${-112*eased}%`);
  heroTitle.style.opacity=String(Math.max(.18,1-progress*.82));
  heroTitle.style.transform=`translate(-50%,calc(-50% - ${progress*18}px))`;
  header.classList.toggle('compact',window.scrollY>34);
}
window.addEventListener('scroll',updateHero,{passive:true});
window.addEventListener('resize',updateHero);
updateHero();

const video=document.querySelector('.hero video');
const videoControl=document.querySelector('.video-control');
videoControl.addEventListener('click',()=>{if(video.paused){video.play();videoControl.textContent='Ⅱ';videoControl.setAttribute('aria-label','Pause background video')}else{video.pause();videoControl.textContent='▶';videoControl.setAttribute('aria-label','Play background video')}});

const menu=document.querySelector('.menu-toggle');

const regionButtons=document.querySelectorAll('.region-tabs button');
const regionNumber=document.querySelector('#region-number');
const regionLabel=document.querySelector('#region-label');
regionButtons.forEach(button=>button.addEventListener('click',()=>{
  regionButtons.forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  regionNumber.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:360,easing:'ease-out'});
  regionLabel.animate([{opacity:0},{opacity:1}],{duration:360});
  regionNumber.textContent=button.dataset.number;
  regionLabel.textContent=button.dataset.label;
}));

const drawer=document.querySelector('.menu-drawer');
const overlay=document.querySelector('.menu-overlay');
const drawerClose=document.querySelector('.drawer-close');
const setDrawer=(open)=>{
  menu.setAttribute('aria-expanded',String(open));
  document.body.classList.toggle('menu-open',open);
  overlay.setAttribute('aria-hidden',String(!open));
};
menu.addEventListener('click',()=>setDrawer(menu.getAttribute('aria-expanded')!=='true'));
drawerClose.addEventListener('click',()=>setDrawer(false));
overlay.addEventListener('click',()=>setDrawer(false));
drawer.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setDrawer(false)));
window.addEventListener('keydown',event=>{if(event.key==='Escape')setDrawer(false)});

const globalReach=document.querySelector('.global-reach');
if(globalReach){
  const pins=document.createElement('div');
  pins.className='map-pins';
  pins.setAttribute('aria-label','Highway Roop global presence');
  [['india','India'],['europe','Europe'],['america','North America'],['asia','Asia Pacific']].forEach(([region,label])=>{
    const pin=document.createElement('span');
    pin.className=`pin pin-${region}`;
    pin.title=label;
    pins.append(pin);
  });
  globalReach.append(pins);
}

const reworkStyles=document.createElement('link');
reworkStyles.rel='stylesheet';
reworkStyles.href='rework.css';
document.head.append(reworkStyles);

const listingCard=document.querySelector('.listing-card');
if(listingCard){
  listingCard.querySelector('h3').textContent='Group Snapshot';
  listingCard.querySelector('small').textContent='Highway Roop at a glance';
  listingCard.querySelector('.listing-value strong').textContent='50+';
  listingCard.querySelector('.listing-value span').textContent='Years of combined legacy';
  listingCard.querySelector('.listing-bottom p').textContent='One integrated engineering group with 16 manufacturing facilities, three specialist businesses and relationships across global mobility markets.';
  document.querySelector('.investor-note').innerHTML='For verified corporate documents, please use the official <a href="#contact">company contact</a>.';
}

const footer=document.querySelector('footer');
if(footer){
  const connect=document.createElement('section');
  connect.className='footer-connect';
  connect.innerHTML='<p>CONNECT WITH US</p><div class="footer-actions"><a href="mailto:info@highwayroop.com"><i>✉</i><span>Email our team</span><b>↗</b></a><a href="#global"><i>⌖</i><span>Find a location</span><b>↗</b></a><a href="#careers"><i>↗</i><span>Explore careers</span><b>↗</b></a></div>';
  footer.prepend(connect);
}

const interactionStyles=document.createElement('link');
interactionStyles.rel='stylesheet';
interactionStyles.href='interaction-pass.css';
document.head.append(interactionStyles);

const searchButton=document.querySelector('.search');
if(searchButton){
  const searchPanel=document.createElement('div');
  searchPanel.className='search-panel';
  searchPanel.innerHTML='<button class="search-close" aria-label="Close search">×</button><form><input aria-label="Search site" placeholder="Search Highway Roop" autocomplete="off"><button aria-label="Submit search">↗</button></form>';
  document.body.append(searchPanel);
  const searchInput=searchPanel.querySelector('input');
  const closeSearch=()=>{searchPanel.classList.remove('open');document.body.classList.remove('menu-open')};
  searchButton.addEventListener('click',()=>{searchPanel.classList.add('open');searchInput.focus()});
  searchPanel.querySelector('.search-close').addEventListener('click',closeSearch);
  searchPanel.addEventListener('click',e=>{if(e.target===searchPanel)closeSearch()});
  searchPanel.querySelector('form').addEventListener('submit',e=>{e.preventDefault();const query=searchInput.value.trim().toLowerCase();closeSearch();if(query){const match=[...document.querySelectorAll('section[id]')].find(section=>section.innerText.toLowerCase().includes(query));match?.scrollIntoView({behavior:'smooth'})}});
}

const featureSections=[...document.querySelectorAll('.feature-section')].filter(section=>['innovation','quality','sustainability'].includes(section.id));
if(featureSections.length){
  const rail=document.createElement('div');
  rail.className='feature-rail';
  rail.innerHTML='<span class="feature-rail-label">FOCUS AREAS</span><button data-slide="innovation">INNOVATION</button><button data-slide="quality">QUALITY</button><button data-slide="sustainability">SUSTAINABILITY</button><div class="feature-rail-progress"><i></i></div><div class="feature-rail-controls"><button class="feature-prev" aria-label="Previous focus area">←</button><button class="feature-next" aria-label="Next focus area">→</button></div>';
  featureSections[0].before(rail);
  const buttons=[...rail.querySelectorAll('button')];const progress=rail.querySelector('i');let current=0;
  const setSlide=(index)=>{current=(index+featureSections.length)%featureSections.length;featureSections.forEach((section,i)=>{section.classList.toggle('slider-active',i===current);section.classList.toggle('slider-hidden',i!==current)});buttons.forEach((button,i)=>button.classList.toggle('active',i===current));progress.style.transform=`translateX(${current*100}%)`};
  buttons.slice(0,3).forEach((button,i)=>button.addEventListener('click',()=>setSlide(i)));
  rail.querySelector('.feature-prev').addEventListener('click',()=>setSlide(current-1));
  rail.querySelector('.feature-next').addEventListener('click',()=>setSlide(current+1));
  setSlide(0);setInterval(()=>setSlide(current+1),8000);
}

document.querySelectorAll('.pin').forEach(pin=>pin.addEventListener('click',()=>{
  document.querySelectorAll('.map-location').forEach(label=>label.remove());
  document.querySelectorAll('.pin').forEach(item=>item.classList.remove('selected'));
  pin.classList.add('selected');
  const label=document.createElement('div');label.className='map-location show';label.textContent=`${pin.title} · Highway Roop network`;label.style.setProperty('--pin-x',`${pin.offsetLeft}px`);label.style.setProperty('--pin-y',`${pin.offsetTop}px`);pin.parentElement.append(label);
}));

const premiumStyles=document.createElement('link');
premiumStyles.rel='stylesheet';premiumStyles.href='premium-pass.css';document.head.append(premiumStyles);

const oldCapabilities=document.querySelector('.capabilities');
if(oldCapabilities){
  const scale=document.createElement('section');scale.className='scale-slider';scale.id='capabilities';
  scale.innerHTML='<div class="scale-layout"><div class="scale-copy reveal"><span>FROM IDEA TO INDUSTRIAL SCALE</span><h2>Ideas engineered<br>for production.</h2><p>Explore how our connected capabilities turn complex concepts into repeatable, validated components at industrial scale.</p><a href="#contact"><i>→</i> Explore our capabilities</a></div><div class="scale-window"><div class="scale-track"><article class="scale-card"><figure><img src="assets/hero-manufacturing.png" alt="Highway Roop engineering and production"></figure><h3>Engineering &amp; product development</h3><p>Simulation, prototyping and design for manufacture.</p></article><article class="scale-card"><figure><img src="assets/businesses/highway.jpg" alt="Precision machining operation"></figure><h3>Precision manufacturing</h3><p>Forging, casting and high-accuracy machining.</p></article><article class="scale-card"><figure><img src="assets/businesses/chamundi.png" alt="Advanced casting facility"></figure><h3>Validation &amp; industrialisation</h3><p>Tooling, testing, finishing and serial production.</p></article></div></div></div><div class="scale-controls"><button class="scale-prev" aria-label="Previous capability">←</button><button class="scale-next" aria-label="Next capability">→</button><div class="scale-dots"><button class="active" aria-label="Capability 1"></button><button aria-label="Capability 2"></button><button aria-label="Capability 3"></button></div></div>';
  oldCapabilities.replaceWith(scale);
  const track=scale.querySelector('.scale-track');const cards=[...scale.querySelectorAll('.scale-card')];const dots=[...scale.querySelectorAll('.scale-dots button')];let scaleIndex=0;
  const setScale=index=>{scaleIndex=(index+cards.length)%cards.length;track.style.transform=`translateX(calc(-${scaleIndex*72}% - ${scaleIndex*18}px))`;dots.forEach((dot,i)=>dot.classList.toggle('active',i===scaleIndex))};
  scale.querySelector('.scale-prev').addEventListener('click',()=>setScale(scaleIndex-1));scale.querySelector('.scale-next').addEventListener('click',()=>setScale(scaleIndex+1));dots.forEach((dot,i)=>dot.addEventListener('click',()=>setScale(i)));
}

const careerSection=document.querySelector('.careers');
if(careerSection){
  const opportunity=document.createElement('a');opportunity.className='career-opportunity';opportunity.href='#contact';opportunity.innerHTML='<strong>Build your future with Highway Roop.<br>Explore current opportunities.</strong><span>→</span>';careerSection.append(opportunity);
}

const listingBottom=document.querySelector('.listing-card .listing-bottom');
if(listingBottom && !document.querySelector('.investor-mini-metrics')){
  const metrics=document.createElement('div');metrics.className='investor-mini-metrics';metrics.innerHTML='<div><strong>16</strong><span>MANUFACTURING FACILITIES</span></div><div><strong>3</strong><span>SPECIALIST BUSINESSES</span></div><div><strong>50+</strong><span>GLOBAL CUSTOMERS</span></div>';listingBottom.before(metrics);
}

const consistencyStyles=document.createElement('link');
consistencyStyles.rel='stylesheet';consistencyStyles.href='consistency-pass.css';document.head.append(consistencyStyles);

const investorCard=document.querySelector('.listing-card');
if(investorCard){
  investorCard.querySelector('h3').textContent='Group Snapshot';
  investorCard.querySelector('small').textContent='2026.09.23';
  investorCard.querySelector('.listing-value strong').textContent='50+';
  investorCard.querySelector('.listing-value span').textContent='YEARS';
  investorCard.querySelector('.listing-bottom').innerHTML='<div class="investor-statline"><span>Manufacturing facilities</span><strong>16</strong></div><div class="investor-statline"><span>Specialist businesses</span><strong>3</strong></div><span class="status-mark" aria-hidden="true">›</span>';
  const investorLinks=[...document.querySelectorAll('.investor-link')];
  if(investorLinks[0]){investorLinks[0].querySelector('h3').textContent='Auditor’s Reports';investorLinks[0].querySelector('p').textContent='Quarterly & Annual Consolidated Reports'}
  if(investorLinks[1]){investorLinks[1].querySelector('h3').textContent='Our Business Performance';investorLinks[1].querySelector('p').textContent='Quarterly performance data'}
}

const primaryNavLinks=[...document.querySelectorAll('.main-bar nav a')];
const activateNav=link=>{primaryNavLinks.forEach(item=>item.classList.remove('active'));link?.classList.add('active')};
primaryNavLinks.forEach(link=>link.addEventListener('click',()=>activateNav(link)));
const navSections=primaryNavLinks.map(link=>({link,section:document.querySelector(link.getAttribute('href'))})).filter(item=>item.section);
const navObserver=new IntersectionObserver(entries=>{const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(visible){activateNav(navSections.find(item=>item.section===visible.target)?.link)}},{rootMargin:'-25% 0px -55% 0px',threshold:[0,.2,.5]});
navSections.forEach(item=>navObserver.observe(item.section));

const careerImage=document.querySelector('.careers .feature-image img');
if(careerImage){
  careerImage.src='assets/careers-indian-team.png';
  careerImage.alt='Indian Highway Roop manufacturing professionals in an advanced production facility';
}
const businessLabel=document.querySelector('.business-intro>span');
if(businessLabel) businessLabel.textContent='OUR BUSINESSES';
const careerHeading=document.querySelector('.careers .feature-content h2');
if(careerHeading) careerHeading.innerHTML='Build what moves<br>the world.';
const customersLabel=document.querySelector('.customers-head>span');
if(customersLabel) customersLabel.textContent='09 / TRUSTED WORLDWIDE';
