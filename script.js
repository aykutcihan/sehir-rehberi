const grid = document.getElementById('grid');
const filtersEl = document.getElementById('filters');
const modal = document.getElementById('modal');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalAddress = document.getElementById('modal-address');
const modalMap = document.getElementById('modal-map');
const modalLink = document.getElementById('modal-link');
const modalWaze = document.getElementById('modal-waze');
const modalWebsite = document.getElementById('modal-website');
const modalDownload = document.getElementById('modal-download');
const modalClose = document.getElementById('modal-close');

let places = [];
let activeCategory = 'Tümü';

fetch('data.json')
  .then((res) => res.json())
  .then((data) => {
    places = data;
    renderFilters();
    renderGrid();
  })
  .catch((err) => {
    grid.innerHTML = '<p>Veriler yüklenemedi. data.json dosyasını kontrol et.</p>';
    console.error(err);
  });

const CATEGORY_ORDER = ['Market', 'Çiftlik Ürünleri', 'Araba Tamir', 'Restoran', 'Online Market', 'Diğer'];

function renderFilters() {
  const present = new Set(places.map((p) => p.category));
  const categories = ['Tümü', ...CATEGORY_ORDER.filter((cat) => present.has(cat))];
  filtersEl.innerHTML = '';
  categories.forEach((cat) => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    if (cat === activeCategory) btn.classList.add('active');
    btn.addEventListener('click', () => {
      activeCategory = cat;
      renderFilters();
      renderGrid();
    });
    filtersEl.appendChild(btn);
  });
}

function renderGrid() {
  const items = places.filter(
    (p) => activeCategory === 'Tümü' || p.category === activeCategory
  );

  grid.innerHTML = '';
  items.forEach((place) => {
    const card = document.createElement('div');
    card.className = 'card';

    const image = document.createElement('div');
    image.className = 'card-image';
    if (place.image) {
      const img = document.createElement('img');
      img.src = place.image;
      img.alt = place.name;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'cover';
      img.onerror = () => {
        image.innerHTML = place.icon || '📍';
      };
      image.appendChild(img);
    } else {
      image.textContent = place.icon || '📍';
    }

    const body = document.createElement('div');
    body.className = 'card-body';
    body.innerHTML = `
      <div class="card-category">${place.category}</div>
      <h3 class="card-title">${place.name}</h3>
      <p class="card-desc">${place.description}</p>
    `;

    card.appendChild(image);
    card.appendChild(body);
    card.addEventListener('click', () => openModal(place));
    grid.appendChild(card);
  });
}

function openModal(place) {
  modalIcon.textContent = place.icon || '📍';
  modalTitle.textContent = place.name;
  modalDesc.textContent = place.description;

  if (place.address) {
    modalAddress.textContent = place.address;
    modalAddress.classList.remove('hidden');

    const query = encodeURIComponent(place.address);
    modalMap.src = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;
    modalMap.classList.remove('hidden');
    modalLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;
    modalLink.classList.remove('hidden');
    modalWaze.href = (place.lat && place.lng)
      ? `https://waze.com/ul?ll=${place.lat}%2C${place.lng}&navigate=yes`
      : `https://waze.com/ul?q=${query}&navigate=yes`;
    modalWaze.classList.remove('hidden');
  } else {
    modalAddress.classList.add('hidden');
    modalMap.classList.add('hidden');
    modalLink.classList.add('hidden');
    modalWaze.classList.add('hidden');
  }

  if (place.website) {
    modalWebsite.href = place.website;
    modalWebsite.textContent = place.websiteLabel || "Web Sitesini Aç ↗";
    modalWebsite.classList.remove('hidden');
  } else {
    modalWebsite.classList.add('hidden');
  }

  if (place.downloadUrl) {
    modalDownload.href = place.downloadUrl;
    modalDownload.classList.remove('hidden');
  } else {
    modalDownload.classList.add('hidden');
  }

  modal.classList.remove('hidden');
}

modalClose.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});
