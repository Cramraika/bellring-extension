const DEFAULTS = {
  tier: 'team',
  volume: 70,
  muteAll: false,
  evtSale: true,
  evtBroadcast: true,
  evtPrivate: true,
};

const $ = (id) => document.getElementById(id);
const tierBtns = document.querySelectorAll('.tier');
const volume = $('volume');
const volReadout = $('volReadout');
const volIcon = $('volIcon');
const muteAll = $('muteAll');
const saved = $('saved');

let savedTimer = null;
const flashSaved = () => {
  saved.classList.add('show');
  clearTimeout(savedTimer);
  savedTimer = setTimeout(() => saved.classList.remove('show'), 1200);
};

const persist = (patch) => {
  chrome.storage.local.set(patch, flashSaved);
};

const renderTier = (tier) => {
  tierBtns.forEach((b) => {
    b.setAttribute('aria-pressed', b.dataset.tier === tier ? 'true' : 'false');
  });
};

const renderVolume = (v, muted) => {
  volReadout.textContent = v;
  volume.value = v;
  const icon = muted || v === 0
    ? 'fa-volume-xmark'
    : v < 33 ? 'fa-volume-low'
    : v < 66 ? 'fa-volume' : 'fa-volume-high';
  volIcon.innerHTML = `<i class="fa-solid ${icon}"></i>`;
  volume.disabled = muted;
  volume.style.opacity = muted ? '0.4' : '1';
};

chrome.storage.local.get(DEFAULTS, (state) => {
  renderTier(state.tier);
  renderVolume(state.volume, state.muteAll);
  muteAll.checked = state.muteAll;
  $('evtSale').checked = state.evtSale;
  $('evtBroadcast').checked = state.evtBroadcast;
  $('evtPrivate').checked = state.evtPrivate;
});

tierBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const tier = btn.dataset.tier;
    renderTier(tier);
    persist({ tier });
  });
});

volume.addEventListener('input', () => {
  const v = Number(volume.value);
  renderVolume(v, muteAll.checked);
});
volume.addEventListener('change', () => {
  persist({ volume: Number(volume.value) });
});

muteAll.addEventListener('change', () => {
  renderVolume(Number(volume.value), muteAll.checked);
  persist({ muteAll: muteAll.checked });
});

['evtSale', 'evtBroadcast', 'evtPrivate'].forEach((id) => {
  $(id).addEventListener('change', (e) => persist({ [id]: e.target.checked }));
});
