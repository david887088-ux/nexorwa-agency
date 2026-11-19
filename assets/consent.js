/* =====================================================================
   NEXORA — Cookie consent manager + Google Analytics 4 (GDPR)
   - Nothing non-essential runs before the visitor chooses.
   - "Reject all" is as easy as "Accept all".
   - Google Analytics is NOT loaded at all until Analytics consent is given.
   - Google Maps (external media) only loads after consent or a click.
   - Consent can be changed any time via any element with [data-consent-open].
   Public API: window.NexoraConsent.{get(), set(), open(), on(fn), track(name, params)}
   ===================================================================== */
(function(){
  'use strict';
  var CFG = window.NEXORA_CONFIG || {};
  var KEY = 'nexora-consent', VERSION = 1;
  var script = document.currentScript;
  var ROOT = script ? new URL('..', script.src).href : './';
  var listeners = [], state = null, gaLoaded = false;

  var T = {
    uk:{title:'Ми цінуємо вашу приватність',text:'Ми використовуємо необхідне сховище для роботи сайту. З вашого дозволу — також Google Analytics для анонімної статистики та Google Maps для карти. Ви можете змінити вибір будь-коли.',
        accept:'Прийняти все',reject:'Відхилити все',settings:'Налаштування',save:'Зберегти вибір',policy:'Політика конфіденційності',
        nec:'Необхідні',necD:'Мова, ваш вибір щодо cookie. Завжди активні.',ana:'Аналітика',anaD:'Google Analytics 4: відвідування та взаємодії без реклами й персоналізації.',med:'Зовнішні медіа',medD:'Google Maps: завантажується лише після вашої згоди.',always:'Завжди'},
    en:{title:'We value your privacy',text:'We use essential storage to run this site. With your permission we also use Google Analytics for anonymous statistics and Google Maps for the map. You can change your choice at any time.',
        accept:'Accept all',reject:'Reject all',settings:'Settings',save:'Save choices',policy:'Privacy policy',
        nec:'Essential',necD:'Language and your cookie choice. Always active.',ana:'Analytics',anaD:'Google Analytics 4: visits and interactions, no advertising or personalisation.',med:'External media',medD:'Google Maps: loaded only after your consent.',always:'Always on'},
    de:{title:'Wir respektieren Ihre Privatsphäre',text:'Wir verwenden technisch notwendige Speicherung für den Betrieb dieser Website. Mit Ihrer Einwilligung nutzen wir außerdem Google Analytics für anonyme Statistiken und Google Maps für die Karte. Sie können Ihre Auswahl jederzeit ändern.',
        accept:'Alle akzeptieren',reject:'Alle ablehnen',settings:'Einstellungen',save:'Auswahl speichern',policy:'Datenschutzerklärung',
        nec:'Notwendig',necD:'Sprache und Ihre Cookie-Auswahl. Immer aktiv.',ana:'Statistik',anaD:'Google Analytics 4: Besuche und Interaktionen, ohne Werbung oder Personalisierung.',med:'Externe Medien',medD:'Google Maps: wird erst nach Ihrer Einwilligung geladen.',always:'Immer aktiv'}
  };
  function lang(){ var l = (document.documentElement.lang || 'en').slice(0,2); return T[l] ? l : 'en'; }
  function t(k){ return T[lang()][k]; }

  function read(){ try { var s = JSON.parse(localStorage.getItem(KEY)); return s && s.v === VERSION ? s : null; } catch(e){ return null; } }
  function write(s){ try { localStorage.setItem(KEY, JSON.stringify(s)); } catch(e){} }

  /* ---------- Google Analytics 4 ---------- */
  var gaId = (CFG.ga4Id || '').trim();
  var gaValid = /^G-[A-Z0-9]{4,}$/i.test(gaId);
  window.dataLayer = window.dataLayer || [];
  function gtag(){ window.dataLayer.push(arguments); }
  function loadGA(){
    if (!gaValid || gaLoaded) return;
    gaLoaded = true;
    gtag('consent', 'default', { analytics_storage:'denied', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied' });
    gtag('consent', 'update', { analytics_storage:'granted' });
    gtag('js', new Date());
    gtag('config', gaId, { allow_google_signals:false, allow_ad_personalization_signals:false });
    var s = document.createElement('script'); s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(gaId);
    document.head.appendChild(s);
  }
  function revokeGA(){
    if (gaLoaded) gtag('consent', 'update', { analytics_storage:'denied' });
    if (gaValid) window['ga-disable-' + gaId] = true;
    // remove existing GA cookies on this domain and parent domains
    var host = location.hostname.split('.'), names = document.cookie.split(';').map(function(c){ return c.split('=')[0].trim(); }).filter(function(n){ return /^_ga/.test(n); });
    names.forEach(function(n){ for (var i = 0; i < host.length; i++){ var d = host.slice(i).join('.'); document.cookie = n + '=; Max-Age=0; path=/; domain=' + d; } document.cookie = n + '=; Max-Age=0; path=/'; });
  }

  function apply(){
    if (!state) return;
    if (state.analytics) { if (gaValid) window['ga-disable-' + gaId] = false; loadGA(); } else revokeGA();
    listeners.forEach(function(fn){ try { fn(state); } catch(e){} });
    document.dispatchEvent(new CustomEvent('nexora:consent', { detail: state }));
  }
  function set(next){
    state = { v:VERSION, analytics:!!next.analytics, media:!!next.media, ts:new Date().toISOString() };
    write(state); apply(); hide();
  }

  /* ---------- UI ---------- */
  var css = '.nx-cc{position:fixed;left:20px;bottom:20px;z-index:1200;width:min(440px,calc(100% - 28px));background:rgba(12,12,14,.96);color:#f4f4f5;border:1px solid rgba(255,255,255,.16);border-radius:22px;padding:24px;font:15px/1.55 Manrope,system-ui,sans-serif;box-shadow:0 30px 80px -20px rgba(0,0,0,.9);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);transform:translateY(20px);opacity:0;transition:transform .5s cubic-bezier(.22,1,.36,1),opacity .5s}'
   + '.nx-cc.on{transform:none;opacity:1}.nx-cc h2{font:700 17px/1.3 Unbounded,system-ui,sans-serif;margin:0 0 8px;letter-spacing:-.01em}.nx-cc p{margin:0;color:#a5a5ad;font-size:14px}'
   + '.nx-cc a{color:#fff;text-decoration:underline;text-underline-offset:3px}.nx-cc .nx-row{display:flex;flex-wrap:wrap;gap:8px;margin-top:18px}'
   + '.nx-cc button{font:600 14px Manrope,system-ui,sans-serif;height:44px;padding:0 18px;border-radius:999px;cursor:pointer;border:1px solid rgba(255,255,255,.28);background:transparent;color:#fff;flex:1 1 auto;transition:background .3s,color .3s}'
   + '.nx-cc button:hover{background:rgba(255,255,255,.08)}.nx-cc button.nx-p{background:#fff;color:#050505;border-color:#fff}.nx-cc button.nx-p:hover{background:#e6e6e6}'
   + '.nx-cc .nx-cats{display:none;margin-top:16px;border-top:1px solid rgba(255,255,255,.1)}.nx-cc.adv .nx-cats{display:block}'
   + '.nx-cat{display:flex;gap:14px;align-items:flex-start;justify-content:space-between;padding:12px 0;border-bottom:1px solid rgba(255,255,255,.08)}.nx-cat b{display:block;font-size:14px}.nx-cat small{display:block;color:#8e8e95;font-size:12.5px;line-height:1.45}'
   + '.nx-sw{position:relative;flex-shrink:0;width:44px;height:26px;margin-top:2px}.nx-sw input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}.nx-sw i{position:absolute;inset:0;border-radius:99px;background:#2a2a2f;transition:background .3s;pointer-events:none}'
   + '.nx-sw i::after{content:"";position:absolute;left:3px;top:3px;width:20px;height:20px;border-radius:50%;background:#fff;transition:transform .3s}.nx-sw input:checked+i{background:#fff}.nx-sw input:checked+i::after{transform:translateX(18px);background:#050505}'
   + '.nx-sw input:focus-visible+i{outline:2px solid #fff;outline-offset:3px}.nx-sw input:disabled+i{opacity:.55}'
   + '@media(max-width:680px){.nx-cc{left:14px;bottom:calc(84px + env(safe-area-inset-bottom));padding:20px}}';
  var box = null;
  function build(){
    if (box) return box;
    var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
    box = document.createElement('div'); box.className = 'nx-cc'; box.setAttribute('role','dialog'); box.setAttribute('aria-modal','false'); box.setAttribute('aria-labelledby','nx-cc-t');
    document.body.appendChild(box);
    box.addEventListener('click', function(e){
      var b = e.target.closest('button'); if (!b) return;
      var a = b.getAttribute('data-a');
      if (a === 'accept') set({ analytics:true, media:true });
      else if (a === 'reject') set({ analytics:false, media:false });
      else if (a === 'settings') { box.classList.toggle('adv'); }
      else if (a === 'save') set({ analytics: box.querySelector('#nx-ana').checked, media: box.querySelector('#nx-med').checked });
    });
    return box;
  }
  function render(){
    var s = state || { analytics:false, media:false };
    box.innerHTML = '<h2 id="nx-cc-t">' + t('title') + '</h2><p>' + t('text') + ' <a href="' + ROOT + 'privacy.html">' + t('policy') + '</a></p>'
      + '<div class="nx-cats">'
      + cat('nec', '<span class="nx-sw"><input type="checkbox" checked disabled aria-label="' + t('nec') + '"><i></i></span>')
      + cat('ana', '<span class="nx-sw"><input type="checkbox" id="nx-ana"' + (s.analytics ? ' checked' : '') + ' aria-label="' + t('ana') + '"><i></i></span>')
      + cat('med', '<span class="nx-sw"><input type="checkbox" id="nx-med"' + (s.media ? ' checked' : '') + ' aria-label="' + t('med') + '"><i></i></span>')
      + '<div class="nx-row"><button type="button" class="nx-p" data-a="save">' + t('save') + '</button></div></div>'
      + '<div class="nx-row"><button type="button" data-a="reject">' + t('reject') + '</button><button type="button" data-a="settings">' + t('settings') + '</button><button type="button" class="nx-p" data-a="accept">' + t('accept') + '</button></div>';
  }
  function cat(k, sw){ return '<div class="nx-cat"><span><b>' + t(k) + '</b><small>' + t(k + 'D') + '</small></span>' + sw + '</div>'; }
  function show(adv){ build(); render(); box.classList.toggle('adv', !!adv); requestAnimationFrame(function(){ box.classList.add('on'); }); }
  function hide(){ if (box) box.classList.remove('on', 'adv'); }

  window.NexoraConsent = {
    get: function(){ return state; },
    set: function(patch){ var s = state || { analytics:false, media:false }; set({ analytics: patch.analytics ?? s.analytics, media: patch.media ?? s.media }); },
    open: function(){ show(true); },
    on: function(fn){ listeners.push(fn); if (state) fn(state); },
    track: function(name, params){ if (state && state.analytics && gaLoaded) gtag('event', name, params || {}); },
    gaEnabled: function(){ return gaValid; }
  };

  function init(){
    state = read();
    document.addEventListener('click', function(e){ var o = e.target.closest && e.target.closest('[data-consent-open]'); if (o) { e.preventDefault(); show(true); } });
    document.addEventListener('nexora:lang', function(){ if (box && box.classList.contains('on')) { var adv = box.classList.contains('adv'); render(); box.classList.toggle('adv', adv); } });
    var addr = CFG.address || {}, needsConsent = gaValid || !!(addr.street || addr.city);
    // Only ask when something actually needs consent (GA4 configured or a map to show)
    if (state) apply(); else if (needsConsent) setTimeout(function(){ show(false); }, 900);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
