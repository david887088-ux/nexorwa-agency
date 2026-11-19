/* =====================================================================
   NEXORA — SITE SETTINGS  (the ONLY file you need to edit for business details)
   Every page reads these values. Leave a value as '' (empty) and that item
   stays hidden on the live site — nothing is ever invented.
   Items marked [REQUIRED BEFORE LAUNCH] should be filled in before going live.
   ===================================================================== */
window.NEXORA_CONFIG = {

  /* --- Website address ---------------------------------------------------
     [REQUIRED BEFORE LAUNCH] Your real domain, without a trailing slash.
     Also use VS Code "Find in Files" (Cmd+Shift+F) to replace every
     https://YOUR-DOMAIN.com in *.html, sitemap.xml and robots.txt.          */
  siteUrl: 'https://YOUR-DOMAIN.com',

  /* --- Business identity -------------------------------------------------- */
  businessName: 'NEXORA',
  legalName: '',            // [REQUIRED BEFORE LAUNCH] registered name (company / sole proprietor) — used in the privacy policy

  /* --- Contacts (empty = hidden) ------------------------------------------ */
  email: '',                // e.g. 'hello@your-domain.com' — the contact form sends here (via FormSubmit)
  phone: '',                // international format, e.g. '+380 50 000 0000'
  telegram: '',             // username without @
  whatsapp: '',             // digits only, international format, e.g. '380500000000'
  instagram: '',            // full URL
  facebook: '',             // full URL
  linkedin: '',             // full URL
  behance: '',              // full URL
  formEndpoint: '',         // optional: your own form endpoint (e.g. Formspree). Overrides `email`.

  /* --- Office address for the map & directions section --------------------
     Leave everything empty if you work only online — the map section then
     hides itself (or shows a setup hint while setupHints is true).          */
  address: {
    street: '',             // e.g. 'Khreshchatyk St, 1'
    city: '',               // e.g. 'Kyiv'
    postalCode: '',         // e.g. '01001'
    region: '',             // optional
    country: ''             // e.g. 'Ukraine'
  },
  hours: { uk: '', en: '', de: '' },   // e.g. { uk:'Пн–Пт, 9:00–18:00', en:'Mon–Fri, 9:00–18:00', de:'Mo–Fr, 9:00–18:00' }

  /* --- Response-time promise -----------------------------------------------
     Set to 2 ONLY if you can really answer every enquiry within 2 hours
     during the working hours above. 0 = no promise shown anywhere.          */
  responseTimeHours: 0,

  /* --- Google Analytics 4 --------------------------------------------------
     Your Measurement ID, e.g. 'G-ABC123XYZ'. Empty = analytics never loads.
     Analytics only starts after a visitor accepts it in the cookie banner.  */
  ga4Id: '',

  /* --- Customer reviews -----------------------------------------------------
     Add ONLY real reviews from real clients, with their permission.
     Example (copy, then fill in):
       { name:'Olena K.', company:'Studio X', text:'…their words…', rating:5,
         date:'2026-10-01', source:'Google', url:'https://…link to the original…' }
     While the list is empty, visitors see a friendly "first reviews coming" note. */
  reviews: [],
  reviewsUrl: '',           // optional: link to your Google Business / Clutch / Facebook reviews page

  /* --- Pricing ------------------------------------------------------------- */
  currency: '$',
  prices: { start: 490, business: 1190, premium: 2490 },   // starting prices — set your real ones

  /* --- Privacy policy details ---------------------------------------------- */
  privacy: {
    controllerAddress: '',  // [REQUIRED BEFORE LAUNCH] postal address of the data controller
    privacyEmail: '',       // email for data-protection requests (defaults to `email` if empty)
    dpo: '',                // Data Protection Officer name/contact, only if you have appointed one
    authority: '',          // your supervisory authority, e.g. 'Ukrainian Parliament Commissioner for Human Rights' or a German state DPA
    lastUpdated: '2026-11-19'
  },

  /* --- Setup hints ----------------------------------------------------------
     true  = missing details are shown as dashed "setup needed" boxes so you can see them.
     false = missing details are simply hidden.  [Set to false before launch]   */
  setupHints: true
};
