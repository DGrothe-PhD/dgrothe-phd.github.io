const toggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const topLangsLight = document.getElementById('top-langs-light');
const topLangsDark = document.getElementById('top-langs-dark');
const statsDark = document.getElementById('stats-dark');
const statsLight = document.getElementById('stats-light');
const body = document.body;
const header = body.querySelector('header');

const isFile = location.protocol === 'file:';
const targetOrigin = isFile ? '*' : location.origin;
const inIframe = window.parent !== window;

let themeStorage = null;
try { themeStorage = window.localStorage; } catch (e) {}

function applyTheme(isDark) {
  body.classList.toggle('dark-mode', isDark);
  document.documentElement.classList.toggle('dark-mode', isDark);
  if (header) header.classList.toggle('dark-mode', isDark);
  if (sunIcon) sunIcon.classList.toggle('hidden', isDark);
  if (moonIcon) moonIcon.classList.toggle('hidden', !isDark);
  if (topLangsLight) topLangsLight.classList.toggle('hidden', isDark);
  if (topLangsDark) topLangsDark.classList.toggle('hidden', !isDark);
  if (statsLight) statsLight.classList.toggle('hidden', isDark);
  if (statsDark) statsDark.classList.toggle('hidden', !isDark);
}

function isDarkNow() {
  return body.classList.contains('dark-mode');
}

function sendThemeTo(win) {
  if (win) win.postMessage({ type: 'theme', dark: isDarkNow() }, targetOrigin);
}

function sendThemeToAllIframes() {
  document.querySelectorAll('iframe').forEach(f => sendThemeTo(f.contentWindow));
}

// 1. Startzustand aus dem Speicher (vermeidet Aufblitzen, gilt für beide Seiten)
try {
  if (themeStorage && themeStorage.getItem('theme') === 'dark') applyTheme(true);
} catch (e) {}

// 2. Elternfenster: Theme an jeden iframe schicken, sobald er geladen ist
document.querySelectorAll('iframe').forEach(f => {
  f.addEventListener('load', () => sendThemeTo(f.contentWindow));
});

// 3. Klick (nur dort aktiv, wo der Button existiert)
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    const isDark = !isDarkNow();
    applyTheme(isDark);
    try { if (themeStorage) themeStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
    sendThemeToAllIframes();
  });
}

// 4. Nachrichten empfangen
window.addEventListener('message', (e) => {
  const d = e.data;
  if (!d || typeof d !== 'object') return;
  if (!isFile && e.origin !== location.origin) return;

  if (d.type === 'theme' && e.source === window.parent) {
    applyTheme(!!d.dark);
  }
  if (d.type === 'theme-request') {
    const known = Array.from(document.querySelectorAll('iframe'))
      .some(f => f.contentWindow === e.source);
    if (known) sendThemeTo(e.source);
  }
});

// 5. iframe: beim Start das aktuelle Theme vom Elternfenster erfragen
if (inIframe) {
  window.parent.postMessage({ type: 'theme-request' }, targetOrigin);
}