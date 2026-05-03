/* Verdure & Cie — App */
document.addEventListener('DOMContentLoaded',()=>{

  // Nav mobile
  const t=document.getElementById('navToggle'),l=document.getElementById('navLinks')
  if(t&&l){
    t.addEventListener('click',()=>{t.textContent=l.classList.toggle('active')?'✕':'☰'})
    l.querySelectorAll('.nav__link').forEach(a=>a.addEventListener('click',()=>{l.classList.remove('active');t.textContent='☰'}))
  }

  // Shadow nav
  const nav=document.querySelector('.nav')
  window.addEventListener('scroll',()=>{nav.style.boxShadow=window.scrollY>80?'0 2px 20px rgba(0,0,0,.08)':'none'})

  // Galerie
  (function(){
    const g=document.getElementById('galleryGrid')
    if(!g)return
    const photos=[
      {f:'piscine.jpeg',w:true},
      {f:'26e34c49-0570-4b30-9990-ca682e0186d9.jpeg'},
      {f:'terrasse.jpeg'},
      {f:'panorama.jpeg',w:true},
      {f:'cuisine.jpeg'},
      {f:'6fc1d7c1-0379-45a8-aa00-abe37bc13292.jpeg'},
      {f:'hero.jpeg'},
      {f:'fb9bacde-eaa3-4e7c-8a52-986b688a2e6b.jpeg'},
      {f:'exterieur.jpeg'},
      {f:'salon.jpeg',w:true},
      {f:'d04151fa-ed05-41a0-8afb-62de188ccbc3.jpeg'},
      {f:'salle-de-bain.jpeg'},
      {f:'c6390307-8f88-4207-b593-3315483da4fc.jpeg'},
      {f:'e1183664-d608-4767-8420-81f166242e8e.jpeg'},
      {f:'c8b537a5-1609-4c8a-b72f-931e4a204d61.jpeg'},
      {f:'d3f706b9-c5c0-4112-895e-ee81213de1f3.jpeg'},
    ]
    photos.forEach((p,i)=>{
      const item=document.createElement('div')
      item.className='gallery__item'+(p.w?' gallery__item--wide':'')
      item.innerHTML=`<img src="/assets/images/${p.f}" alt="Verdure &amp; Cie" loading="lazy">`
      g.appendChild(item)
    })
  })()

  // Formulaire
  const form=document.getElementById('reservationForm')
  if(form){
    const btn=document.getElementById('submitBtn'),err=document.getElementById('formError'),fn=document.getElementById('formFootnote')
    const cfg=window.VERDURE_CONFIG||{},stripeReady=!!cfg.publishableKey

    if(stripeReady){
      btn.textContent="Payer l'acompte (30%) — Carte bancaire"
      fn.textContent='💳 Paiement sécurisé Stripe'
    }

    form.addEventListener('submit',async(e)=>{
      e.preventDefault();err.style.display='none';btn.disabled=true

      const name=form.querySelector('#name').value.trim()
      const email=form.querySelector('#email').value.trim()
      const phone=form.querySelector('#phone').value.trim()
      const arrival=form.querySelector('#arrival').value
      const departure=form.querySelector('#departure').value
      const guests=form.querySelector('#guests').value
      const message=form.querySelector('#message').value.trim()

      if(!name||!email||!arrival||!departure)return show('Champs obligatoires : nom, email, dates.')
      if(!email.includes('@'))return show('Email invalide.')
      if(new Date(arrival)>=new Date(departure))return show('Le départ doit être après l\'arrivée.')

      if(stripeReady){
        btn.textContent='Redirection Stripe...'
        try{
          const r=await fetch('/api/create-checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,phone,arrival,departure,guests,message})})
          const d=await r.json()
          if(d.url)window.location.href=d.url;else show(d.error||'Erreur paiement')
        }catch(e){show('Erreur connexion')}
      }else{
        btn.textContent='Envoi...'
        try{
          const r=await fetch('/api/send-request',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,email,phone,arrival,departure,guests,message})})
          const d=await r.json()
          if(d.success){
            form.innerHTML=`<div class="form__success"><div style="font-size:3rem">✉️</div><h3>Merci ${name}!</h3><p>Je vous réponds sous 24h à <strong>${email}</strong>.</p><a href="/" class="btn btn--ghost" style="margin-top:16px;color:var(--green);border-color:var(--green)">Retour</a></div>`
          }else show(d.error||'Erreur envoi')
        }catch(e){show('Erreur connexion serveur')}
      }
      function show(m){err.textContent=m;err.style.display='block';btn.disabled=false;btn.textContent=stripeReady?"Payer l'acompte (30%) — Carte bancaire":'Envoyer la demande'}
    })
  }

  // Date min = aujourd'hui
  const today=new Date().toISOString().split('T')[0]
  document.querySelectorAll('input[type="date"]').forEach(e=>e.setAttribute('min',today))

  // Scroll animations
  const obs=new IntersectionObserver(e=>{e.forEach(e=>{if(e.isIntersecting){e.target.style.opacity='1';e.target.style.transform='translateY(0)'}})},{threshold:.1})
  document.querySelectorAll('.card,.pricing__card,.infos__card,.stat,.gallery__item').forEach(e=>{e.style.opacity='0';e.style.transform='translateY(24px)';e.style.transition='opacity .6s ease-out, transform .6s ease-out';obs.observe(e)})
})
