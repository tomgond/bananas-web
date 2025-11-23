const portfolioData = [
  {
    title: 'מיתוג כנס חדשנות עירונית',
    category: 'conferences',
    categoryLabel: 'כנסים',
    thumbnail: 'assets/conferences/sample1.jpg',
    description: 'עיצוב חווייתי לכנס מקצועי עם קו גרפי צהוב וגמיש.',
    gallery: [
      'assets/conferences/sample1.jpg',
      'assets/conferences/sample2.jpg',
      'assets/conferences/sample3.jpg'
    ]
  },
  {
    title: 'מיתוסים · סיפור מותג ירקות',
    category: 'myths',
    categoryLabel: 'מיתוסים',
    thumbnail: 'assets/myths/sample1.jpg',
    description: 'בניית עולם ויזואלי שמח ומתפתח סביב סיפור מקורי.',
    gallery: [
      'assets/myths/sample1.jpg',
      'assets/myths/sample2.jpg'
    ]
  },
  {
    title: 'איור סדרת אריזות בננות',
    category: 'illustrations',
    categoryLabel: 'איורים',
    thumbnail: 'assets/illustrations/sample1.jpg',
    description: 'איורים ידידותיים ומדויקים שמכניסים אופי למותג.',
    gallery: [
      'assets/illustrations/sample1.jpg',
      'assets/illustrations/sample2.jpg'
    ]
  },
  {
    title: 'קמפיין דיגיטל · סטודיו בננות',
    category: 'digital',
    categoryLabel: 'דיגיטל',
    thumbnail: 'assets/digital/sample1.jpg',
    description: 'עיצוב פיד צבעוני, באנרים ואתרי נחיתה עם זהות קבועה.',
    gallery: [
      'assets/digital/sample1.jpg',
      'assets/digital/sample2.jpg'
    ]
  },
  {
    title: 'מיתוג ועיצוב במה למפגש קהילה',
    category: 'conferences',
    categoryLabel: 'כנסים',
    thumbnail: 'assets/conferences/sample4.jpg',
    description: 'שילוב שילוט, מצגות ועמדות צילום שכולם מרגישים חלק מהסיפור.',
    gallery: [
      'assets/conferences/sample4.jpg',
      'assets/conferences/sample5.jpg'
    ]
  },
  {
    title: 'מיתוסים · סיפור מותג נועז',
    category: 'myths',
    categoryLabel: 'מיתוסים',
    thumbnail: 'assets/myths/sample3.jpg',
    description: 'פיתוח מיתוס ויזואלי עם שילוב איורים ומסרים קצרים.',
    gallery: [
      'assets/myths/sample3.jpg',
      'assets/myths/sample4.jpg'
    ]
  }
];

const portfolioGrid = document.getElementById('portfolioGrid');
const filterButtons = document.querySelectorAll('.filter');
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');
const navLinks = document.querySelector('.nav-links');
const burger = document.querySelector('.burger');
let currentGallery = [];
let currentIndex = 0;

function createCard(project) {
  const card = document.createElement('article');
  card.className = 'portfolio-card';
  card.innerHTML = `
    <img src="${project.thumbnail}" alt="${project.title}">
    <div class="portfolio-info">
      <span class="category-tag">${project.categoryLabel}</span>
      <h3>${project.title}</h3>
    </div>
  `;
  card.addEventListener('click', () => openModal(project));
  return card;
}

function renderGrid(category = 'all') {
  portfolioGrid.innerHTML = '';
  const filtered = category === 'all' ? portfolioData : portfolioData.filter(item => item.category === category);
  filtered.forEach(project => portfolioGrid.appendChild(createCard(project)));
}

function setActiveFilter(target) {
  filterButtons.forEach(btn => {
    btn.classList.toggle('active', btn === target);
    btn.setAttribute('aria-selected', btn === target);
  });
}

function openModal(project) {
  currentGallery = project.gallery;
  currentIndex = 0;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description + ' (תיאור להחלפה מהפייסבוק).';
  updateModalImage();
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

function updateModalImage() {
  modalImage.src = currentGallery[currentIndex];
}

function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  updateModalImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  updateModalImage();
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const category = btn.dataset.filter;
    renderGrid(category);
    setActiveFilter(btn);
  });
});

renderGrid();

document.querySelectorAll('[data-scroll]').forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.querySelector(btn.dataset.scroll);
    target?.scrollIntoView({ behavior: 'smooth' });
  });
});

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

document.querySelector('.modal-nav.next').addEventListener('click', nextImage);
document.querySelector('.modal-nav.prev').addEventListener('click', prevImage);

document.addEventListener('keydown', (e) => {
  if (modal.classList.contains('open')) {
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
  }
});

burger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  burger.classList.toggle('active', isOpen);
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});
