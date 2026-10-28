import{account as y,api as l}from"./account.js";let n;export function initDon(s){return n=s,{don:r}}const $=["A+","A-","B+","B-","AB+","AB-","O+","O-"],p=s=>`<option value="">Choisis</option>${$.map(i=>`<option value="${i}" ${i===s?"selected":""}>${i}</option>`).join("")}`,m=s=>new Date(s).toLocaleString("fr-FR",{day:"numeric",month:"short",hour:"2-digit",minute:"2-digit"}),q=s=>`tel:+${String(s).replace(/[^\d]/g,"")}`,v=`<div class="panel"><h3>Qui peut donner ?</h3>
  <ul class="muted">
    <li>En g\xE9n\xE9ral entre 18 et 65 ans, et au moins 50 kg.</li>
    <li>Au moins 8 semaines entre deux dons de sang.</li>
    <li>En bonne sant\xE9 : le centre v\xE9rifie sur place ta tension, ton poids et ton taux de fer.</li>
  </ul>
  <p class="muted small-note">Le don se fait au centre de transfusion sanguine ou dans un h\xF4pital. Les crit\xE8res peuvent varier : demande-leur avant de venir.</p>
  <p class="disclaimer">En cas d'urgence, appelle d'abord l'h\xF4pital ou le centre de transfusion : l'application ne remplace pas leur avis.</p></div>`;async function r(){const s=n.view;if(!y()){s.innerHTML=`<div class="view-in"><div class="page-head"><h1>Don <span class="grad-text">du sang</span></h1><p>Donne ton sang ou demande-en pour un proche.</p></div>
      <div class="panel"><p>Connecte-toi pour t'inscrire comme donneur ou faire une demande. Ton num\xE9ro n'est donn\xE9 qu'au demandeur qui a besoin de toi, et seulement si tu r\xE9ponds \xAB Je peux donner \xBB.</p><a class="btn primary" href="#/compte">Se connecter</a></div>${v}</div>`;return}s.innerHTML='<div class="view-in"><div class="page-head"><h1>Don <span class="grad-text">du sang</span></h1><p>Donneurs volontaires et demandes pr\xE8s de chez toi.</p></div><div class="panel"><p class="muted">Chargement\u2026</p></div></div>';let t=null,d=[],c=[];try{({donor:t}=await l("don_get")),t&&({requests:d}=await l("don_requests")),{requests:c}=await l("blood_list")}catch(e){s.querySelector(".panel").innerHTML=`<p class="muted">${n.esc(e.message)}</p>`;return}const b=`<form class="panel glow" id="dn-form" autocomplete="off">
    <h3>${t?"Mon profil de donneur":"Je peux donner mon sang"}</h3>
    <div class="f-grid">
      <label class="field s6"><span>Groupe sanguin</span><select name="blood_group" required>${p(t?.blood_group)}</select></label>
      <label class="field s6"><span>Ville</span><input name="city" required maxlength="60" value="${n.esc(t?.city||"")}"></label>
      <label class="field s6"><span>Quartier</span><input name="quartier" maxlength="80" value="${n.esc(t?.quartier||"")}"></label>
      <label class="field s6"><span>Dernier don (facultatif)</span><input name="last_donation" type="date" max="${new Date().toISOString().slice(0,10)}" value="${n.esc(t?.last_donation||"")}"></label>
    </div>
    <label class="check"><input type="checkbox" name="available" ${!t||t.available?"checked":""}> Disponible : on peut me proposer une demande</label>
    ${t?"":`<label class="check"><input type="checkbox" name="consent" required> J'accepte que mon num\xE9ro soit donn\xE9 \xE0 un demandeur seulement si je r\xE9ponds \xAB Je peux donner \xBB \xE0 sa demande.</label>`}
    <p class="gate-err" id="dn-err" role="alert"></p>
    <div class="row"><button class="btn primary" type="submit">${t?"Enregistrer":"M'inscrire comme donneur"}</button>${t?'<button class="btn" type="button" id="dn-del">Ne plus \xEAtre donneur</button>':""}</div>
    <p class="muted small-note">Ton groupe sanguin est indiqu\xE9 sur ta carte de donneur ou au centre de transfusion.</p>
  </form>`,g=t?.available&&d.length?d.map(e=>`<div class="place">
      <div class="place-h"><b>Groupe ${n.esc(e.blood_group)} \xB7 ${n.esc(e.city)}</b>${e.urgent?'<span class="pt garde">Urgent</span>':""}</div>
      <small class="muted">${n.esc([e.hospital,e.quartier,m(e.created_at)].filter(Boolean).join(" \xB7 "))}</small>
      ${e.reason?`<p>${n.esc(e.reason)}</p>`:""}
      <p class="muted small-note">En r\xE9pondant \xAB Je peux donner \xBB, ton num\xE9ro sera donn\xE9 au demandeur.</p>
      <div class="row">${e.answer?`<span class="tag">Tu as r\xE9pondu : ${e.answer==="yes"?"oui":"non"}</span>`:`<button class="btn small primary" data-yes="${e.id}">Je peux donner</button><button class="btn small" data-no="${e.id}">Pas disponible</button>`}</div>
    </div>`).join(""):"",h=t?`<h2 class="sec-label">Demandes pr\xE8s de toi</h2>
    <div class="res-list">${t.available?g||`<div class="panel"><p class="muted">Aucune demande compatible pour l'instant. Cette liste se met \xE0 jour \xE0 chaque ouverture.</p></div>`:'<div class="panel"><p class="muted">Tu es en pause : r\xE9active ton profil pour recevoir des demandes.</p></div>'}</div>`:"",f=c.length?c.map(e=>`<div class="place">
      <div class="place-h"><b>Groupe ${n.esc(e.blood_group)} \xB7 ${n.esc(e.city)}</b><span class="tag">${e.status==="open"?"Ouverte":"Cl\xF4tur\xE9e"}</span></div>
      <small class="muted">${n.esc([e.hospital,m(e.created_at)].filter(Boolean).join(" \xB7 "))}</small>
      ${e.urgent?'<span class="pt garde">Urgent</span>':""}
      ${e.offers.length?`<p><b>Donneurs qui peuvent venir :</b></p>${e.offers.map(a=>`<div class="row"><span>${n.esc(a.name)}</span>${a.phone?`<a class="btn small primary" href="${q(a.phone)}">Appeler</a>`:""}</div>`).join("")}`:`<p class="muted">Aucun donneur n'a encore r\xE9pondu.</p>`}
      ${e.status==="open"?`<div class="row"><button class="btn small" data-close="${e.id}">Cl\xF4turer la demande</button></div>`:""}
    </div>`).join(""):`<div class="panel"><p class="muted">Tu n'as pas fait de demande ces 30 derniers jours.</p></div>`;s.innerHTML=`<div class="view-in">
    <div class="page-head"><h1>Don <span class="grad-text">du sang</span></h1><p>Donneurs volontaires et demandes pr\xE8s de chez toi.</p></div>
    ${v}
    ${b}
    ${h}
    <h2 class="sec-label">Demander du sang</h2>
    <form class="panel" id="rq-form" autocomplete="off">
      <p class="muted">Pour une urgence, appelle d'abord l'h\xF4pital : il a son propre stock. Ta demande pr\xE9vient les donneurs compatibles de ta ville.</p>
      <div class="f-grid">
        <label class="field s6"><span>Groupe sanguin demand\xE9</span><select name="blood_group" required>${p("")}</select></label>
        <label class="field s6"><span>Ville</span><input name="city" required maxlength="60" value="${n.esc(t?.city||"")}"></label>
        <label class="field s6"><span>Quartier</span><input name="quartier" maxlength="80"></label>
        <label class="field s6"><span>H\xF4pital ou centre</span><input name="hospital" maxlength="120"></label>
        <label class="field s12"><span>Pour quoi ? (facultatif)</span><input name="reason" maxlength="200" placeholder="ex. op\xE9ration pr\xE9vue demain"></label>
      </div>
      <label class="check"><input type="checkbox" name="urgent"> C'est urgent</label>
      <p class="gate-err" id="rq-err" role="alert"></p>
      <div class="row"><button class="btn primary" type="submit">Envoyer la demande</button></div>
    </form>
    <h2 class="sec-label">Mes demandes</h2>
    <div class="res-list">${f}</div>
  </div>`;const u=(e,a)=>{const o=s.querySelector(e);o&&(o.textContent=a.message)};s.querySelector("#dn-form").onsubmit=async e=>{e.preventDefault();const a=Object.fromEntries(new FormData(e.target));try{await l("don_save",{blood_group:a.blood_group,city:a.city,quartier:a.quartier,last_donation:a.last_donation,available:a.available==="on",consent:a.consent==="on"}),n.toast("Profil de donneur enregistr\xE9."),r()}catch(o){u("#dn-err",o)}},s.querySelector("#dn-del")?.addEventListener("click",async()=>{if(confirm("Ne plus \xEAtre donneur ? Ton num\xE9ro ne sera plus propos\xE9 aux demandeurs."))try{await l("don_delete"),n.toast("Tu n'es plus inscrit comme donneur."),r()}catch(e){u("#dn-err",e)}}),s.querySelector("#rq-form").onsubmit=async e=>{e.preventDefault();const a=Object.fromEntries(new FormData(e.target));try{const o=await l("blood_create",{blood_group:a.blood_group,city:a.city,quartier:a.quartier,hospital:a.hospital,reason:a.reason,urgent:a.urgent==="on"});n.toast(o.donors?`Demande envoy\xE9e \xE0 ${o.donors} donneur${o.donors>1?"s":""} compatible${o.donors>1?"s":""}.`:"Demande envoy\xE9e. Aucun donneur compatible inscrit pour l'instant : appelle l'h\xF4pital.",6e3),r()}catch(o){u("#rq-err",o)}},s.querySelectorAll("[data-yes],[data-no]").forEach(e=>e.onclick=async()=>{const a=e.dataset.yes?"yes":"no";try{await l("don_answer",{request_id:e.dataset.yes||e.dataset.no,answer:a}),n.toast(a==="yes"?"Merci ! Le demandeur a ton num\xE9ro.":"Merci d'avoir r\xE9pondu."),r()}catch(o){n.toast(o.message,5e3)}}),s.querySelectorAll("[data-close]").forEach(e=>e.onclick=async()=>{if(confirm("Cl\xF4turer cette demande ?"))try{await l("blood_close",{id:e.dataset.close}),r()}catch(a){n.toast(a.message,5e3)}})}
