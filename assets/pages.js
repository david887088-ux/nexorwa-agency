/* =====================================================================
   NEXORA — shared script for inner pages (case studies, privacy, thank-you, 404)
   Handles: language switching (UA/EN/DE), header & mobile menu, footer
   contacts, mobile order bar, reveal animations. Page-specific text lives
   in window.PAGE_I18N; optional window.PAGE_RENDER(t, lang) re-renders
   dynamic parts after every language change.
   ===================================================================== */
(function(){
  'use strict';
  var CFG = Object.assign({ address:{}, hours:{}, reviews:[], privacy:{} }, window.NEXORA_CONFIG || {});
  var COMMON = {
    uk:{'nav.services':'Послуги','nav.work':'Портфоліо','nav.process':'Процес','nav.pricing':'Ціни','nav.about':'Про нас','nav.contact':'Контакти','nav.faq':'FAQ','nav.cta':'Почати проєкт','nav.menu':'Меню','lang.label':'Мова',
        'footer.tag':'Преміальна діджитал-агенція. Сайти, креативи, відео та реклама для амбітних брендів.','footer.nav':'Навігація','footer.more':'Більше','footer.cases':'Кейси','footer.privacy':'Політика конфіденційності','footer.cookies':'Налаштування cookie','footer.social':'Соцмережі','footer.rights':'Усі права захищено.','footer.top':'Нагору',
        'bc.home':'Головна','bc.cases':'Кейси','bc.label':'Навігаційний ланцюжок','mcta.order':'Замовити проєкт','mcta.msg':'Написати','reply':'Відповідаємо протягом {n} год у робочий час'},
    en:{'nav.services':'Services','nav.work':'Work','nav.process':'Process','nav.pricing':'Pricing','nav.about':'About','nav.contact':'Contact','nav.faq':'FAQ','nav.cta':'Start a project','nav.menu':'Menu','lang.label':'Language',
        'footer.tag':'Premium digital agency. Websites, creatives, video and advertising for ambitious brands.','footer.nav':'Navigation','footer.more':'More','footer.cases':'Case studies','footer.privacy':'Privacy policy','footer.cookies':'Cookie settings','footer.social':'Social','footer.rights':'All rights reserved.','footer.top':'Back to top',
        'bc.home':'Home','bc.cases':'Case studies','bc.label':'Breadcrumb','mcta.order':'Order a project','mcta.msg':'Message us','reply':'We reply within {n} hours during working hours'},
    de:{'nav.services':'Leistungen','nav.work':'Projekte','nav.process':'Ablauf','nav.pricing':'Preise','nav.about':'Über uns','nav.contact':'Kontakt','nav.faq':'FAQ','nav.cta':'Projekt starten','nav.menu':'Menü','lang.label':'Sprache',
        'footer.tag':'Premium-Digitalagentur. Websites, Creatives, Videos und Werbung für ambitionierte Marken.','footer.nav':'Navigation','footer.more':'Mehr','footer.cases':'Case Studies','footer.privacy':'Datenschutz','footer.cookies':'Cookie-Einstellungen','footer.social':'Social Media','footer.rights':'Alle Rechte vorbehalten.','footer.top':'Nach oben',
        'bc.home':'Startseite','bc.cases':'Case Studies','bc.label':'Brotkrumen-Navigation','mcta.order':'Projekt anfragen','mcta.msg':'Schreiben','reply':'Wir antworten innerhalb von {n} Stunden während der Geschäftszeiten'}
  };
  var PAGE = window.PAGE_I18N || {};
  var LANGS = [['uk','UA'],['en','EN'],['de','DE']];
  var $ = function(s, el){ return (el || document).querySelector(s); };
  var $$ = function(s, el){ return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var store = { get:function(k){ try { return localStorage.getItem(k); } catch(e){ return null; } }, set:function(k, v){ try { localStorage.setItem(k, v); } catch(e){} } };
  var esc = function(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); };
  var lang = 'en';
  function t(k){ var p = PAGE[lang] || {}, c = COMMON[lang] || {}; return p[k] != null ? p[k] : c[k] != null ? c[k] : (PAGE.en || {})[k] != null ? PAGE.en[k] : COMMON.en[k] != null ? COMMON.en[k] : k; }

  function detect(){
    var q = new URLSearchParams(location.search).get('lang'); if (q && COMMON[q]) return q;
    var s = store.get('nexora-lang'); if (s && COMMON[s]) return s;
    var list = navigator.languages || [navigator.language || 'en'];
    for (var i = 0; i < list.length; i++){ var c = String(list[i]).slice(0,2).toLowerCase(); if (c === 'uk' || c === 'ru') return 'uk'; if (c === 'de') return 'de'; if (c === 'en') return 'en'; }
    return 'en';
  }
  function apply(){
    document.documentElement.lang = lang;
    var tk = document.documentElement.dataset.titleKey, dk = document.documentElement.dataset.descKey;
    if (tk) document.title = t(tk);
    if (dk) { var m = $('meta[name="description"]'); if (m) m.setAttribute('content', t(dk)); }
    $$('[data-i18n]').forEach(function(el){ el.textContent = t(el.dataset.i18n); });
    $$('[data-i18n-html]').forEach(function(el){ el.innerHTML = t(el.dataset.i18nHtml); });
    $$('[data-i18n-aria]').forEach(function(el){ el.setAttribute('aria-label', t(el.dataset.i18nAria)); });
    $$('[data-i18n-list]').forEach(function(el){ el.innerHTML = t(el.dataset.i18nList).split('|').map(function(x){ return '<li>' + esc(x) + '</li>'; }).join(''); });
    $$('.lang-switch button').forEach(function(b){ b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    var n = +CFG.responseTimeHours || 0;
    $$('[data-reply]').forEach(function(el){ el.hidden = !n; if (n) el.textContent = t('reply').replace('{n}', n); });
    if (typeof window.PAGE_RENDER === 'function') window.PAGE_RENDER(t, lang, CFG, esc);
    pills();
  }
  function setLang(l){
    if (!COMMON[l]) return; lang = l; store.set('nexora-lang', l);
    try { var u = new URL(location.href); u.searchParams.set('lang', l); history.replaceState(null, '', u); } catch(e){}
    apply(); document.dispatchEvent(new CustomEvent('nexora:lang', { detail:l }));
  }
  function pills(){
    $$('.lang-switch').forEach(function(el){
      var a = $('button[data-lang="' + lang + '"]', el), p = $('.pill', el);
      if (!a || !p || !a.offsetWidth) return;
      p.style.width = a.offsetWidth + 'px'; p.style.transform = 'translateX(' + (a.offsetLeft - 4) + 'px)';
    });
  }

  var ICON = {
    tg:'<path d="M21.5 4.2L2.9 11.4c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.1.9.8.9.5 0 .7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.5.2 1.8-.8l3.3-15.4c.3-1.3-.5-1.9-1.4-1.4zM8.6 14.2l9.6-6.1c.5-.3.9-.1.5.2l-8.2 7.4-.3 3.4-1.6-4.9z" fill="currentColor" stroke="none"/>',
    wa:'<path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm4.5 12.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1-1.4-.7-2.4-1.3-3.3-2.9-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.7c.1.2 1.9 2.9 4.6 4.1 1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.8-1.2.2-.6.2-1.1.1-1.2l-.4-.4z" fill="currentColor" stroke="none"/>',
    ig:'<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/>',
    fb:'<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
    in:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/>',
    be:'<path d="M3 7h5a2.5 2.5 0 0 1 0 5H3zM3 12h5.5a2.5 2.5 0 0 1 0 5H3zM14 7h5M13.5 14h7a3.5 3.5 0 1 0-1 2.5"/>'
  };
  var icon = function(k){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + ICON[k] + '</svg>'; };

  function chrome(){
    // language switchers
    $$('.lang-switch').forEach(function(el){
      el.innerHTML = '<span class="pill"></span>' + LANGS.map(function(l){ return '<button type="button" data-lang="' + l[0] + '" aria-pressed="false">' + l[1] + '</button>'; }).join('');
      el.addEventListener('click', function(e){ var b = e.target.closest('button'); if (b) setLang(b.dataset.lang); });
    });
    // header + mobile menu
    var header = $('#header'), burger = $('#burger'), menu = $('#menu'), lastY = 0;
    function toggle(open){ open = open == null ? !menu.classList.contains('open') : open; menu.classList.toggle('open', open); burger.setAttribute('aria-expanded', open); menu.setAttribute('aria-hidden', !open); document.body.classList.toggle('lock', open); if (open) requestAnimationFrame(pills); }
    if (burger) { burger.addEventListener('click', function(){ toggle(); }); $$('#menu a').forEach(function(a){ a.addEventListener('click', function(){ toggle(false); }); }); document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && menu.classList.contains('open')) toggle(false); }); }
    addEventListener('scroll', function(){
      var y = scrollY; header.classList.toggle('scrolled', y > 30); header.classList.toggle('hide', y > lastY && y > 500 && !menu.classList.contains('open')); lastY = y;
      var max = document.documentElement.scrollHeight - innerHeight; document.documentElement.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    }, { passive:true });
    // socials
    var soc = [];
    if (CFG.instagram) soc.push(['ig','Instagram',CFG.instagram]);
    if (CFG.facebook) soc.push(['fb','Facebook',CFG.facebook]);
    if (CFG.telegram) soc.push(['tg','Telegram','https://t.me/' + CFG.telegram]);
    if (CFG.whatsapp) soc.push(['wa','WhatsApp','https://wa.me/' + CFG.whatsapp]);
    if (CFG.linkedin) soc.push(['in','LinkedIn',CFG.linkedin]);
    if (CFG.behance) soc.push(['be','Behance',CFG.behance]);
    var sEl = $('#socials'); if (sEl) { sEl.innerHTML = soc.map(function(s){ return '<a href="' + esc(s[2]) + '" target="_blank" rel="noopener" aria-label="' + s[1] + '">' + icon(s[0]) + '</a>'; }).join(''); if (!soc.length) sEl.parentElement.hidden = true; }
    var a = CFG.address || {}, line = [a.street, [a.postalCode, a.city].filter(Boolean).join(' '), a.region, a.country].filter(Boolean).join(', ');
    var fa = $('#footAddr'); if (fa && line) { fa.hidden = false; fa.textContent = line; }
    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
    var m = $('#mctaMsg'); if (m) { var href = CFG.telegram ? 'https://t.me/' + CFG.telegram : CFG.whatsapp ? 'https://wa.me/' + CFG.whatsapp : CFG.email ? 'mailto:' + CFG.email : m.getAttribute('href'); m.href = href; if (/^https?:/.test(href)) { m.target = '_blank'; m.rel = 'noopener'; } }
    // reveal
    var io = 'IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches ? new IntersectionObserver(function(en){ en.forEach(function(x){ if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }); }, { threshold:.1 }) : null;
    $$('.rv').forEach(function(el){ io ? io.observe(el) : el.classList.add('in'); });
    // glow cards
    document.addEventListener('pointermove', function(e){ var g = e.target.closest && e.target.closest('.gc'); if (g) { var r = g.getBoundingClientRect(); g.style.setProperty('--mx', (e.clientX - r.left) + 'px'); g.style.setProperty('--my', (e.clientY - r.top) + 'px'); } }, { passive:true });
    addEventListener('resize', pills);
    if (document.fonts) document.fonts.ready.then(pills);
  }

  window.NX = { t:t, esc:esc, cfg:CFG, lang:function(){ return lang; }, setLang:setLang, $:$, $$:$$ };
  function boot(){ chrome(); lang = detect(); apply(); document.body.classList.add('ready'); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
