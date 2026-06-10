const grid = document.getElementById('grid');
const filtersEl = document.getElementById('filters');
const modal = document.getElementById('modal');
const modalIcon = document.getElementById('modal-icon');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalAddress = document.getElementById('modal-address');
const modalMap = document.getElementById('modal-map');
const modalLink = document.getElementById('modal-link');
const modalWebsite = document.getElementById('modal-website');
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

function renderFilters() {
  const categories = ['Tümü', ...new Set(places.map((p) => p.category))];
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
  modalAddress.textContent = place.address;

  const query = encodeURIComponent(place.address);
  modalMap.src = `https://maps.google.com/maps?q=${query}&z=15&output=embed`;
  modalLink.href = `https://www.google.com/maps/search/?api=1&query=${query}`;

  if (place.website) {
    modalWebsite.href = place.website;
    modalWebsite.classList.remove('hidden');
  } else {
    modalWebsite.classList.add('hidden');
  }

  modal.classList.remove('hidden');
}

modalClose.addEventListener('click', () => modal.classList.add('hidden'));
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.add('hidden');
});
