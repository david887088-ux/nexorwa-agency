/* NEXORA — portfolio concept mockups (shared by the home page and case-study pages).
   These are DEMO concept projects, not client work. */
(function(){
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Portfolio concept projects (demo work, NOT client work).
// Each preview is a full mini-website drawn in code and shown inside laptop + phone frames.
// Optional: set `image` to a real screenshot URL (e.g. 'img/aurum.jpg') to show it on the laptop screen instead.
let UID = 0;
const arches = (u) => { let s = ''; for (let r = 0; r < 2; r++) for (let i = 0; i < 6; i++) { const x = 136 + i * 38, y = 54 + r * 48, lit = (i * 3 + r) % 4 !== 0;
  s += `<path d="M${x} ${y+30} V${y+10} A10 10 0 0 1 ${x+20} ${y+10} V${y+30}Z" fill="${lit ? `url(#${u}c)` : '#1a1713'}"/>` + (lit ? `<ellipse cx="${x+10}" cy="${y+22}" rx="20" ry="16" fill="url(#${u}d)" opacity=".35"/>` : ''); } return s; };
const SCENES = {
car: u => `<defs>
  <radialGradient id="${u}a" cx="62%" cy="-10%" r="90%"><stop offset="0" stop-color="#fff1cf" stop-opacity=".45"/><stop offset=".45" stop-color="#c9a24a" stop-opacity=".1"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
  <linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1b160d"/><stop offset="1" stop-color="#040302"/></linearGradient>
  <linearGradient id="${u}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dd99"/><stop offset=".3" stop-color="#c9a24a"/><stop offset=".65" stop-color="#5b4418"/><stop offset="1" stop-color="#140e04"/></linearGradient>
  <linearGradient id="${u}d" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#4a505c"/><stop offset=".5" stop-color="#14161b"/><stop offset="1" stop-color="#050607"/></linearGradient>
  <radialGradient id="${u}e"><stop offset="0" stop-color="#8a8a8a"/><stop offset=".5" stop-color="#2b2b2b"/><stop offset=".72" stop-color="#0c0c0c"/><stop offset="1" stop-color="#000"/></radialGradient>
  <linearGradient id="${u}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="${u}m"><rect x="0" y="158" width="400" height="62" fill="url(#${u}f)"/></mask></defs>
  <rect width="400" height="220" fill="#0a0806"/><rect y="148" width="400" height="72" fill="url(#${u}b)"/><rect width="400" height="220" fill="url(#${u}a)"/>
  <path d="M0 148H400" stroke="#c9a24a" stroke-opacity=".18"/><ellipse cx="244" cy="159" rx="150" ry="9" fill="#000" opacity=".8"/>
  <g id="${u}g" transform="translate(30 0)">
   <path d="M88 150C92 136 110 130 140 126L176 108C190 101 214 99 238 100C262 101 280 110 296 124L322 130C334 133 340 140 340 150V158H88Z" fill="url(#${u}c)"/>
   <path d="M182 112C194 106 214 104 236 105C252 106 266 113 277 124L172 126Z" fill="url(#${u}d)"/><path d="M229 105L233 125" stroke="#2a2010" stroke-width="2.5"/>
   <path d="M100 139C150 131 250 129 334 139" stroke="#fff6dc" stroke-opacity=".55" stroke-width=".8" fill="none"/><path d="M150 127C200 122 260 122 300 127" stroke="#fff" stroke-opacity=".25" stroke-width="1.6" fill="none"/>
   <path d="M326 136l12 3v4l-13-2z" fill="#fffbe8"/><ellipse cx="336" cy="140" rx="14" ry="5" fill="#fff6d0" opacity=".25"/><rect x="88" y="139" width="7" height="3" rx="1" fill="#ff4a2e"/>
   <circle cx="140" cy="154" r="22" fill="#0a0805"/><circle cx="296" cy="154" r="22" fill="#0a0805"/>
   <circle cx="140" cy="155" r="19" fill="url(#${u}e)"/><circle cx="140" cy="155" r="10" fill="none" stroke="#d8b665" stroke-width="1.4"/><circle cx="140" cy="155" r="3" fill="#d8b665"/>
   <circle cx="296" cy="155" r="19" fill="url(#${u}e)"/><circle cx="296" cy="155" r="10" fill="none" stroke="#d8b665" stroke-width="1.4"/><circle cx="296" cy="155" r="3" fill="#d8b665"/>
  </g><g mask="url(#${u}m)" opacity=".5"><use href="#${u}g" transform="translate(0 316) scale(1 -1)"/></g>`,
fashion: u => `<defs>
  <radialGradient id="${u}a" cx="64%" cy="40%" r="65%"><stop offset="0" stop-color="#4a4238"/><stop offset=".55" stop-color="#1c1915"/><stop offset="1" stop-color="#090807"/></radialGradient>
  <linearGradient id="${u}b" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0b0b0d"/><stop offset=".45" stop-color="#2e2e33"/><stop offset=".6" stop-color="#232327"/><stop offset="1" stop-color="#08080a"/></linearGradient>
  <linearGradient id="${u}c" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a3a40"/><stop offset="1" stop-color="#121214"/></linearGradient>
  <linearGradient id="${u}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f4efe6"/><stop offset="1" stop-color="#cfc6b6"/></linearGradient>
  <linearGradient id="${u}e" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#${u}a)"/><rect x="200" y="-10" width="70" height="240" fill="url(#${u}e)" transform="skewX(-14)"/>
  <g transform="translate(46 4)"><ellipse cx="200" cy="212" rx="74" ry="6" fill="#000" opacity=".6"/>
   <ellipse cx="200" cy="16" rx="12" ry="15" fill="#2c2722"/><path d="M188 26Q200 22 212 26L214 52Q200 46 186 52Z" fill="#2c2722"/>
   <path d="M128 84L114 196L134 198L142 104Z" fill="url(#${u}c)"/><path d="M272 84L286 196L266 198L258 104Z" fill="url(#${u}c)"/>
   <path d="M142 62Q170 50 200 48Q230 50 258 62L274 86L268 210H132L126 86Z" fill="url(#${u}b)"/>
   <path d="M184 50L200 106L216 50Q200 45 184 50Z" fill="url(#${u}d)"/><path d="M196.5 62H203.5L207 114L200 124L193 114Z" fill="#141416"/><path d="M196 56h8l-1 7h-6z" fill="#1d1d20"/>
   <path d="M184 50L164 72L182 98L174 110L200 152Z" fill="url(#${u}c)"/><path d="M216 50L236 72L218 98L226 110L200 152Z" fill="url(#${u}c)"/>
   <path d="M184 50L164 72L182 98" stroke="#fff" stroke-opacity=".18" fill="none"/><path d="M232 112l16-5 2 7-16 4z" fill="#e7dccb"/>
   <path d="M150 170h28M222 170h28" stroke="#000" stroke-opacity=".55"/><circle cx="200" cy="170" r="2.4" fill="#3a3a3f"/><circle cx="200" cy="188" r="2.4" fill="#3a3a3f"/></g>`,
estate: u => `<defs>
  <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0d2624"/><stop offset=".45" stop-color="#2c5a54"/><stop offset=".76" stop-color="#e09a72"/><stop offset="1" stop-color="#f6c896"/></linearGradient>
  <radialGradient id="${u}b"><stop offset="0" stop-color="#fff1d6"/><stop offset=".4" stop-color="#ffcf9a" stop-opacity=".5"/><stop offset="1" stop-color="#ffcf9a" stop-opacity="0"/></radialGradient>
  <linearGradient id="${u}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe0a6"/><stop offset=".55" stop-color="#c98a46"/><stop offset="1" stop-color="#5a3a1c"/></linearGradient>
  <linearGradient id="${u}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#79e0d2"/><stop offset="1" stop-color="#13706a"/></linearGradient>
  <linearGradient id="${u}e" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2efe8"/><stop offset="1" stop-color="#c9c4b9"/></linearGradient>
  <linearGradient id="${u}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1a17"/><stop offset="1" stop-color="#050b0a"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#${u}a)"/><circle cx="330" cy="150" r="64" fill="url(#${u}b)"/><circle cx="330" cy="150" r="15" fill="#fff0d6" opacity=".9"/>
  <path d="M0 160Q60 140 120 150T240 146T400 150V220H0Z" fill="#0f2421"/>
  <g transform="translate(20 0)"><rect x="140" y="122" width="200" height="46" fill="url(#${u}e)"/><rect x="150" y="129" width="126" height="35" fill="url(#${u}c)"/>
   <path d="M181 129v35M213 129v35M245 129v35" stroke="#2a2016" stroke-width="1.2"/><rect x="286" y="129" width="44" height="35" fill="#2b2a28"/>
   <rect x="182" y="86" width="186" height="34" fill="url(#${u}e)"/><rect x="192" y="92" width="116" height="24" fill="url(#${u}c)"/>
   <path d="M221 92v24M250 92v24M279 92v24" stroke="#2a2016" stroke-width="1.2"/><rect x="174" y="82" width="202" height="5" fill="#e9e5dc"/>
   <rect x="132" y="118" width="214" height="5" fill="#e9e5dc"/><circle cx="232" cy="140" r="16" fill="#fff3d0" opacity=".25"/><rect x="300" y="120" width="68" height="3" fill="#000" opacity=".25"/></g>
  <rect x="100" y="168" width="290" height="2.5" fill="#d9d3c6"/><rect x="110" y="170" width="270" height="14" fill="url(#${u}d)"/>
  <rect x="170" y="171" width="126" height="10" fill="url(#${u}c)" opacity=".35"/><path d="M120 176h40M200 179h60M300 175h50" stroke="#fff" stroke-opacity=".4" stroke-width=".8"/>
  <rect y="184" width="400" height="36" fill="url(#${u}f)"/>
  <ellipse cx="96" cy="140" rx="9" ry="34" fill="#081512"/><ellipse cx="112" cy="150" rx="7" ry="24" fill="#0a1a17"/><ellipse cx="386" cy="146" rx="8" ry="28" fill="#081512"/>`,
hotel: u => `<defs>
  <linearGradient id="${u}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#04060c"/><stop offset="1" stop-color="#121829"/></linearGradient>
  <linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#29241d"/><stop offset="1" stop-color="#110f0c"/></linearGradient>
  <linearGradient id="${u}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe6b3"/><stop offset="1" stop-color="#e09a4a"/></linearGradient>
  <radialGradient id="${u}d"><stop offset="0" stop-color="#ffd59a" stop-opacity=".9"/><stop offset="1" stop-color="#ffd59a" stop-opacity="0"/></radialGradient></defs>
  <rect width="400" height="220" fill="url(#${u}a)"/><circle cx="60" cy="36" r="10" fill="#f3ead8" opacity=".85"/>
  <g fill="#fff"><circle cx="30" cy="70" r=".8"/><circle cx="96" cy="22" r="1"/><circle cx="150" cy="14" r=".7"/><circle cx="380" cy="20" r="1"/><circle cx="20" cy="18" r=".6"/><circle cx="110" cy="60" r=".6"/></g>
  <rect x="120" y="44" width="250" height="150" fill="url(#${u}b)"/><rect x="114" y="38" width="262" height="7" fill="#3a332a"/><rect x="120" y="140" width="250" height="2" fill="#3a332a"/>
  ${arches(u)}
  <circle cx="245" cy="176" r="62" fill="url(#${u}d)" opacity=".7"/><path d="M225 194V164A20 20 0 0 1 265 164V194Z" fill="url(#${u}c)"/>
  <rect x="214" y="146" width="62" height="5" fill="#d9c3a1"/>
  <circle cx="204" cy="170" r="16" fill="url(#${u}d)"/><circle cx="286" cy="170" r="16" fill="url(#${u}d)"/><circle cx="204" cy="170" r="3" fill="#ffe2a8"/><circle cx="286" cy="170" r="3" fill="#ffe2a8"/>
  <rect y="194" width="400" height="26" fill="#07070a"/><rect x="225" y="194" width="40" height="26" fill="url(#${u}c)" opacity=".18"/>
  <ellipse cx="204" cy="204" rx="4" ry="9" fill="#ffd59a" opacity=".25"/><ellipse cx="286" cy="204" rx="4" ry="9" fill="#ffd59a" opacity=".25"/>
  <path d="M0 220V150Q30 120 60 140Q90 110 112 150V220Z" fill="#05060a"/>`,
food: u => `<defs>
  <radialGradient id="${u}a" cx="60%" cy="50%" r="70%"><stop offset="0" stop-color="#2d2723"/><stop offset="1" stop-color="#0b0908"/></radialGradient>
  <radialGradient id="${u}b"><stop offset="0" stop-color="#fbf9f4"/><stop offset=".85" stop-color="#e6e0d4"/><stop offset="1" stop-color="#c9c1b2"/></radialGradient>
  <radialGradient id="${u}c" cx="45%" cy="40%"><stop offset="0" stop-color="#a24a26"/><stop offset=".7" stop-color="#5a2110"/><stop offset="1" stop-color="#2a0e06"/></radialGradient>
  <radialGradient id="${u}d" cx="40%" cy="35%"><stop offset="0" stop-color="#7a1428"/><stop offset="1" stop-color="#2a0510"/></radialGradient>
  <linearGradient id="${u}e" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f0f0f0"/><stop offset="1" stop-color="#7a7a7a"/></linearGradient>
  <radialGradient id="${u}f"><stop offset="0" stop-color="#ffcf7a" stop-opacity=".5"/><stop offset="1" stop-color="#ffcf7a" stop-opacity="0"/></radialGradient></defs>
  <rect width="400" height="220" fill="url(#${u}a)"/><circle cx="80" cy="50" r="70" fill="url(#${u}f)"/>
  <rect x="40" y="128" width="90" height="70" rx="4" fill="#e7dccb" transform="rotate(-12 85 163)" opacity=".9"/>
  <circle cx="254" cy="117" r="77" fill="#000" opacity=".45"/><circle cx="250" cy="110" r="74" fill="url(#${u}b)"/><circle cx="250" cy="110" r="54" fill="none" stroke="#000" stroke-opacity=".06" stroke-width="2"/>
  <path d="M206 132C226 150 270 152 292 130" stroke="#d66a3f" stroke-width="5" stroke-linecap="round" fill="none" opacity=".85"/>
  <g transform="rotate(-18 248 104)"><ellipse cx="248" cy="104" rx="38" ry="24" fill="url(#${u}c)"/><path d="M222 96h46M220 106h54M226 116h42" stroke="#1a0703" stroke-width="2.4" opacity=".55"/></g>
  <path d="M268 112q14-2 20 10q-12 6-22-2z" fill="#c4584a"/>
  <circle cx="284" cy="92" r="7" fill="#4c8a3f"/><circle cx="292" cy="102" r="5" fill="#6aa84f"/><circle cx="278" cy="84" r="4" fill="#3b6e33"/><circle cx="214" cy="112" r="4" fill="#6aa84f"/>
  <circle cx="230" cy="128" r="2" fill="#f2c14e"/><circle cx="240" cy="132" r="1.6" fill="#f2c14e"/><circle cx="262" cy="88" r="1" fill="#fff"/><circle cx="236" cy="94" r="1" fill="#fff"/>
  <circle cx="352" cy="44" r="26" fill="url(#${u}d)"/><circle cx="352" cy="44" r="26" fill="none" stroke="#fff" stroke-opacity=".3"/><path d="M336 32a20 20 0 0 1 14-8" stroke="#fff" stroke-opacity=".5" fill="none" stroke-width="2"/>
  <circle cx="80" cy="50" r="9" fill="#efe6d6"/><circle cx="80" cy="50" r="2.5" fill="#ffcf7a"/>
  <rect x="160" y="52" width="6" height="128" rx="3" fill="url(#${u}e)"/>
  <g fill="url(#${u}e)"><rect x="340" y="104" width="5" height="96" rx="2.5"/><rect x="334" y="78" width="1.8" height="28" rx=".9"/><rect x="338.5" y="78" width="1.8" height="28" rx=".9"/><rect x="343" y="78" width="1.8" height="28" rx=".9"/><rect x="347.5" y="78" width="1.8" height="28" rx=".9"/><rect x="334" y="100" width="15.3" height="8" rx="3"/></g>`,
saas: u => `<defs>
  <linearGradient id="${u}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#060814"/><stop offset="1" stop-color="#0d1734"/></linearGradient>
  <linearGradient id="${u}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5b82ff" stop-opacity=".55"/><stop offset="1" stop-color="#5b82ff" stop-opacity="0"/></linearGradient>
  <radialGradient id="${u}c"><stop offset="0" stop-color="#5b82ff" stop-opacity=".45"/><stop offset="1" stop-color="#5b82ff" stop-opacity="0"/></radialGradient>
  <linearGradient id="${u}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".08"/><stop offset="1" stop-color="#fff" stop-opacity=".02"/></linearGradient></defs>
  <rect width="400" height="220" fill="url(#${u}a)"/><circle cx="310" cy="40" r="130" fill="url(#${u}c)"/><circle cx="110" cy="210" r="90" fill="url(#${u}c)" opacity=".6"/>
  <rect x="160" y="28" width="220" height="140" rx="10" fill="url(#${u}d)" stroke="#fff" stroke-opacity=".12"/>
  <rect x="174" y="40" width="50" height="5" rx="2.5" fill="#fff" opacity=".6"/><rect x="174" y="50" width="30" height="4" rx="2" fill="#fff" opacity=".25"/><rect x="330" y="40" width="36" height="12" rx="6" fill="#5b82ff"/>
  <path d="M174 80H366M174 105H366M174 130H366" stroke="#fff" stroke-opacity=".06"/>
  <path d="M174 150L196 132L218 138L240 112L262 120L284 96L306 104L328 78L350 86L366 66V156H174Z" fill="url(#${u}b)"/>
  <path d="M174 150L196 132L218 138L240 112L262 120L284 96L306 104L328 78L350 86L366 66" stroke="#7c9bff" stroke-width="2" fill="none"/>
  <circle cx="328" cy="78" r="7" fill="#7c9bff" opacity=".3"/><circle cx="328" cy="78" r="3.5" fill="#fff"/>
  <rect x="300" y="52" width="48" height="16" rx="4" fill="#fff"/><rect x="306" y="58" width="34" height="4" rx="2" fill="#0b1430" opacity=".6"/>
  <rect x="96" y="112" width="112" height="78" rx="10" fill="#0e1636" stroke="#fff" stroke-opacity=".12"/>
  <circle cx="126" cy="151" r="16" fill="none" stroke="#fff" stroke-opacity=".08" stroke-width="6"/><circle cx="126" cy="151" r="16" fill="none" stroke="#5b82ff" stroke-width="6" stroke-dasharray="70 101" transform="rotate(-90 126 151)"/>
  <rect x="152" y="140" width="42" height="5" rx="2.5" fill="#fff" opacity=".7"/><rect x="152" y="150" width="28" height="4" rx="2" fill="#fff" opacity=".3"/><rect x="152" y="159" width="34" height="4" rx="2" fill="#5b82ff" opacity=".8"/>
  <rect x="96" y="36" width="52" height="64" rx="10" fill="#0e1636" stroke="#fff" stroke-opacity=".12"/>
  <circle cx="112" cy="54" r="7" fill="#5b82ff" opacity=".8"/><circle cx="132" cy="54" r="7" fill="#fff" opacity=".2"/><rect x="106" y="70" width="32" height="4" rx="2" fill="#fff" opacity=".4"/><rect x="106" y="80" width="22" height="4" rx="2" fill="#fff" opacity=".2"/>`
};
const scene = (kind, vb = '0 0 400 220', cls = '') => { const u = 's' + (UID++) + '_'; return `<svg class="${cls}" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${SCENES[kind](u)}</svg>`; };

const PROJECTS = [
  { name:'AURUM Motors', slug:'aurum-motors', scene:'car', accent:'#c9a24a', bg:'#0a0806', font:"'Unbounded',sans-serif", focus:270, image:'',
    kicker:'PERFORMANCE COLLECTION', h:'Drive the<br>extraordinary', sub:'Hand-picked supercars with white-glove delivery.',
    nav:['Models','Services','Finance','Contact'], btn:['Explore models','Test drive'],
    feats:[['V12','Flagship engines'],['360°','Virtual showroom'],['24/7','Concierge']],
    cardsTitle:'Featured models', cards:[['Aurum GT','from €189 000'],['Aurum Spyder','from €214 000'],['Aurum S','from €156 000']],
    band:'Experience the drive', crops:['170 92 130 98','90 100 120 90','260 104 120 90'] },
  { name:'NOIR Atelier', slug:'noir-atelier', scene:'fashion', accent:'#e7dccb', bg:'#0b0a09', font:"Georgia,'Times New Roman',serif", focus:246, image:'',
    kicker:'AUTUMN / WINTER', h:'Tailored<br>in silence', sub:'Modern menswear cut from Italian wool.',
    nav:['New in','Suits','Outerwear','Journal'], btn:['Shop now','Lookbook'],
    feats:[['Free','Express shipping'],['30 days','Easy returns'],['Made','to measure']],
    cardsTitle:'New arrivals', cards:[['Wool overcoat','€690'],['Merino knit','€220'],['Tailored blazer','€540']],
    band:'The Lookbook', crops:['176 40 140 105','214 84 110 82','160 100 160 120'] },
  { name:'Vertex Estates', slug:'vertex-estates', scene:'estate', accent:'#43b08f', bg:'#07100d', font:"'Unbounded',sans-serif", focus:270, image:'',
    kicker:'PRIME LOCATIONS', h:'Homes that<br>define you', sub:'Exceptional villas and penthouses in prime locations.',
    nav:['Buy','Rent','Sell','Agents'], btn:['View listings','Book a viewing'],
    feats:[['Villas','Coastal living'],['Penthouses','City views'],['Private','Viewings']],
    cardsTitle:'Featured listings', cards:[['Ocean Villa','€2.4M'],['Sky Penthouse','€1.8M'],['Garden House','€950K']],
    band:'Find your place', crops:['150 80 140 105','250 70 140 105','100 120 140 105'] },
  { name:'Maison Lumière', slug:'maison-lumiere', scene:'hotel', accent:'#d9c3a1', bg:'#0c0b0a', font:"Georgia,'Times New Roman',serif", focus:245, image:'',
    kicker:'BOUTIQUE HOTEL & SPA', h:'Where nights<br>shine brighter', sub:'Suites, spa and fine dining in the old town.',
    nav:['Suites','Spa','Dining','Offers'], btn:['Book your stay','Suites'],
    feats:[['Spa','& Wellness'],['Fine','Dining'],['Rooftop','Bar']],
    cardsTitle:'Suites', cards:[['Deluxe Room','from €340 / night'],['Lumière Suite','from €520 / night'],['Penthouse','from €890 / night']],
    band:'Stay in the light', crops:['200 120 100 75','124 48 120 90','280 52 100 75'] },
  { name:'Ember & Salt', slug:'ember-and-salt', scene:'food', accent:'#d66a3f', bg:'#0d0908', font:"Georgia,'Times New Roman',serif", focus:255, image:'',
    kicker:'OPEN FIRE KITCHEN', h:'Cooked over<br>live fire', sub:'Seasonal menu, natural wine, warm evenings.',
    nav:['Menu','Wine','Events','Visit'], btn:['Reserve a table','Menu'],
    feats:[['Seasonal','Menu'],['Natural','Wines'],['Chef’s','Table']],
    cardsTitle:'Signature dishes', cards:[['Dry-aged ribeye','€42'],['Charred octopus','€28'],['Smoked burrata','€16']],
    band:'Fire. Salt. Time.', crops:['196 62 120 90','300 8 104 78','30 14 120 90'] },
  { name:'Quantum Desk', slug:'quantum-desk', scene:'saas', accent:'#5b82ff', bg:'#070912', font:"'Unbounded',sans-serif", focus:270, image:'',
    kicker:'AI WORKSPACE', h:'Work at the<br>speed of thought', sub:'One platform for projects, docs and analytics.',
    nav:['Product','Pricing','Docs','Login'], btn:['Start free','Watch demo'],
    feats:[['Real-time','Analytics'],['Smart','Automation'],['50+','Integrations']],
    cardsTitle:'Built for teams', cards:[['Analytics','Learn more →'],['Automation','Learn more →'],['Integrations','Learn more →']],
    band:'Your team, in sync', crops:['160 28 220 165','90 105 124 93','290 46 96 72'] }
];

function siteHTML(p, phone){
  const heroVB = phone ? `${p.focus - 75} 0 150 220` : '0 0 400 220';
  return `<div class="site" style="--fh:${p.font}">
    <div class="s-nav"><span class="s-logo">${esc(p.name.toUpperCase())}</span><span class="s-links">${p.nav.map(n => `<i>${n}</i>`).join('')}</span><span class="s-cta">${p.btn[1]}</span></div>
    <div class="s-hero">${scene(p.scene, heroVB, 'scene')}<div class="s-copy"><div class="s-kick">${p.kicker}</div><div class="s-h">${p.h}</div><div class="s-p">${p.sub}</div>
      <div class="s-btns"><span class="s-btn">${p.btn[0]}</span><span class="s-btn o">${p.btn[1]}</span></div></div></div>
    <div class="s-feats">${p.feats.map(([b, s]) => `<div><b>${b}</b><span>${s}</span></div>`).join('')}</div>
    <div class="s-sec"><div class="s-title">${p.cardsTitle}</div><div class="s-cards">${p.cards.map(([n, pr], i) => `<div class="s-card"><div class="ph">${scene(p.scene, p.crops[i])}</div><b>${n}</b><span>${pr}</span></div>`).join('')}</div></div>
    <div class="s-band">${scene(p.scene, '0 70 400 90', 'scene')}<div class="s-band-t">${p.band}</div></div>
    <div class="s-foot"><span>© ${esc(p.name)}</span><span>Instagram · Contact</span></div>
  </div>`;
}
function deviceHTML(p){
  const screen = p.image ? `<img src="${p.image}" alt="${esc(p.name)}" loading="lazy" class="shot">` : siteHTML(p, false);
  return `<div class="stage" style="--a:${p.accent};--mbg:${p.bg}">
    <div class="laptop"><div class="lid"><div class="screen">${screen}</div></div><div class="base"></div></div>
    <div class="phone"><div class="screen">${siteHTML(p, true)}</div></div>
  </div>`;
}


window.NEXORA_MOCKUPS = { PROJECTS, deviceHTML, siteHTML, scene };
})();
