(function () {
  'use strict';

  /* ---------- Theme toggle (light / dark / system) ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById('theme-toggle');
  var STORAGE_KEY = 'khumo-ems-theme';

  function applyStoredTheme() {
    var stored = null;
    try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) { /* storage unavailable */ }
    if (stored === 'light' || stored === 'dark') {
      root.setAttribute('data-theme', stored);
    }
    // If nothing stored, CSS prefers-color-scheme handles it automatically.
  }

  function currentEffectiveTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit) return explicit;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  themeToggle.addEventListener('click', function () {
    var next = currentEffectiveTheme() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (e) { /* storage unavailable */ }
  });

  applyStoredTheme();

  /* ---------- Mobile burger menu ---------- */
  var burger = document.getElementById('burger');
  var mobileNav = document.getElementById('mobile-nav');
  var backdrop = document.getElementById('mobile-backdrop');

  function openMenu() {
    mobileNav.classList.add('open');
    backdrop.classList.add('open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileNav.classList.remove('open');
    backdrop.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', function () {
    var isOpen = mobileNav.classList.contains('open');
    if (isOpen) { closeMenu(); } else { openMenu(); }
  });

  backdrop.addEventListener('click', closeMenu);

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();