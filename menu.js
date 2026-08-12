/* =========================================================================
   LOGICA MENU - Ladispoli Summer Sport
   =========================================================================
   Questo file costruisce automaticamente il pulsante hamburger e il
   menu laterale usando l'elenco definito in menu-config.js.

   Non serve modificare questo file per aggiungere pagine: basta
   editare menu-config.js.

   Va incluso DOPO menu-config.js in ogni pagina, ad esempio:

   <link rel="stylesheet" href="menu.css">
   ...
   <script src="menu-config.js" defer></script>
   <script src="menu.js" defer></script>
   ========================================================================= */

(function () {

  function buildMenu() {

    // Overlay scuro dietro al menu
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    document.body.appendChild(overlay);

    // Pulsante hamburger
    const btn = document.createElement('button');
    btn.className = 'menu-toggle';
    btn.setAttribute('aria-label', 'Apri menu');
    btn.innerHTML = '<span></span><span></span><span></span>';
    document.body.appendChild(btn);

    // Contenitore menu laterale
    const nav = document.createElement('nav');
    nav.className = 'side-menu';

    const header = document.createElement('div');
    header.className = 'side-menu-header';
    header.innerHTML =
      '<span>Menu</span><button type="button" class="menu-close" aria-label="Chiudi menu">&times;</button>';
    nav.appendChild(header);

    const ul = document.createElement('ul');

    // Nome del file della pagina corrente, per evidenziare la voce attiva
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    const pages = (typeof PAGES !== 'undefined') ? PAGES : [];

    pages.forEach(function (page) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = page.href;
      a.textContent = page.title;

      if (page.href.toLowerCase() === currentPage) {
        a.classList.add('active');
      }

      li.appendChild(a);
      ul.appendChild(li);
    });

    nav.appendChild(ul);
    document.body.appendChild(nav);

    function openMenu() {
      nav.classList.add('open');
      overlay.classList.add('open');
      btn.classList.add('open');
      btn.setAttribute('aria-label', 'Chiudi menu');
    }

    function closeMenu() {
      nav.classList.remove('open');
      overlay.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-label', 'Apri menu');
    }

    btn.addEventListener('click', function () {
      if (nav.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    overlay.addEventListener('click', closeMenu);
    header.querySelector('.menu-close').addEventListener('click', closeMenu);

    // Chiude il menu con il tasto ESC
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildMenu);
  } else {
    buildMenu();
  }

})();
