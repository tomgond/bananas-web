// Bananas V2 interactions: category loading, masonry gallery, and lightbox overlays.
(function () {
  const portfolioData = {
    branding: [
      {
        id: 'athena',
        title: 'Athena Identity',
        description: 'Tech-forward identity with geometric marks and bold contrasts.',
        images: ['main', '01', '02', '03'],
      },
      {
        id: 'eretz-ir',
        title: 'Eretz Ir Civic Identity',
        description: 'Civic system built on modular shapes for community hubs.',
        images: ['main', '1', '4', '12', '13', '14', '15', '16', '17'],
      },
      {
        id: 'gaya',
        title: 'Gaya Hospitality',
        description: 'Hospitality visuals pairing warmth with structured layouts.',
        images: ['main', '35', '36', '37', '38'],
      },
      {
        id: 'matanya-bread',
        title: 'Matanya Bread',
        description: 'Handcrafted bakery identity and packaging story.',
        images: ['main'],
      },
      {
        id: 'oasis',
        title: 'Oasis Community Hub',
        description: 'Community-forward logo with breezy, optimistic accents.',
        images: ['main'],
      },
    ],
    events: [
      {
        id: 'building-on-quality-2025',
        title: 'Building on Quality 2025',
        description: 'Planning conference wall-to-wall visual story.',
        images: [
          'planning25-072',
          'main',
          'planning25-014',
          'planning25-016',
          'planning25-026',
          'planning25-027',
          'planning25-055',
          'planning25-092',
          'planning25-125',
          'planning25-183',
          'planning25-275',
          'planning25-441',
          'whatsapp-image-2025-09-16-at-11-46-52',
        ],
      },
      {
        id: 'autojob',
        title: 'Autojob HR Summit',
        description: 'Rapid-fire live illustration wall for HR innovators.',
        images: ['img-2620', 'img-2628', 'img-2629', 'img-2631', 'img-2633', 'img-2638', 'main'],
      },
      {
        id: 'planners-2025',
        title: 'Yearly Planners Convention',
        description: 'Immersive graphic recording across the main hall.',
        images: [
          'main',
          'img',
          'yearly-convention-1',
          'yearly-convention-102',
          'yearly-convention-138',
          'yearly-convention-2',
          'yearly-convention-3',
          'yearly-convention-36',
          'yearly-convention-37',
          'yearly-convention-38',
          'yearly-convention-39',
          'yearly-convention-4',
          'yearly-convention-5',
          'yearly-convention-55',
          'yearly-convention-56',
          'yearly-convention-7',
          'yearly-convention-70',
          'yearly-convention-70-copy',
          'yearly-convention-90',
          'yearly-convention-93',
          'yearly-convention-96',
        ],
      },
      {
        id: 'health-il-2019',
        title: 'Health IL 2019',
        description: 'Healthcare summit captured in layered sketch panels.',
        images: ['main', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      },
      {
        id: 'jewish-agency',
        title: 'Jewish Agency Strategy Lab',
        description: 'Visual facilitation of strategy sessions and discussions.',
        images: [
          'main',
          'mg-0012-2',
          'mg-9507',
          'mg-9509',
          'mg-9513',
          'mg-9515',
          'mg-9517',
          'mg-9519',
          'mg-9536',
          'mg-9541',
          'mg-9570',
          'mg-9655',
          'mg-9656',
          'mg-9705-2',
        ],
      },
      {
        id: 'kayamut',
        title: 'Kayamut Summit',
        description: 'Climate pledges mapped live during summit sessions.',
        images: [
          'main',
          'heschel25-001',
          'heschel25-002',
          'heschel25-004',
          'heschel25-005',
          'heschel25-007',
          'heschel25-009',
          'heschel25-010',
          'heschel25-018',
          'heschel25-030',
          'heschel25-031',
          'heschel25-035',
          'heschel25-081',
          'heschel25-242',
        ],
      },
      {
        id: 'kayamut-2022',
        title: 'Kayamut 2022',
        description: 'Illustrated wall capturing a day of panels and talks.',
        images: [
          'main',
          '22',
          '476104287-1057423943049284-1045302103718501907-n',
          '476125248-1057424043049274-1507369839186955676-n',
          '476155992-1057424219715923-3103359124723835896-n',
          '476200488-1057424056382606-44256041989446229-n',
          '476242550-1057424186382593-5042097565740331508-n',
          '476244760-1057423989715946-5554761020277479525-n',
          '476248801-1057424113049267-2828390857167364224-n',
          '476433901-1057424033049275-5520132546036160827-n',
          '476748218-1057423856382626-118652543843709729-n',
          'screenshot-2025-02-12-at-12-56-16',
          'screenshot-2025-02-12-at-12-56-56',
        ],
      },
      {
        id: 'kayamut-community-2024',
        title: 'Kayamut Community 2024',
        description: 'Community climate forum with live visual notes.',
        images: [
          'main',
          '1',
          '466163404-996461055812240-6194539209486910017-n',
          '466392176-996461395812206-8663560867627433290-n',
          '466616786-996459879145691-6259909503053316732-n',
          '466621155-996459829145696-7257951084330576060-n',
          '466642782-996459619145717-2868371301447535920-n',
          '466655549-996459689145710-5633860955829696852-n',
          '466656955-996461295812216-1094384331114492083-n',
          '466680239-996459892479023-6282726539513396909-n',
          '466739250-996459519145727-4139377124278626247-n',
          '466852532-996458485812497-9097735613386712148-n',
          '466913029-996461442478868-2471575273199627420-n',
          '466914257-996459939145685-912842190047332796-n',
          '466971795-996460175812328-307130429571726631-n',
        ],
      },
      {
        id: 'ofek',
        title: 'Ofek Leadership Summit',
        description: 'Leadership summit recorded through layered boards.',
        images: [
          'main',
          'asi0008',
          'asi0010-websize',
          'asi0017-websize',
          'asi0020-websize',
          'asi0023-websize',
          'asi0027-websize',
          'asi0033-websize',
          'asi0046-websize',
          'asi0129-websize',
          'asi0400-websize',
          'asi0400-websize-1',
          'asi0855-websize',
          'asi0863-websize',
        ],
      },
    ],
    illustrations: [
      {
        id: 'gallery',
        title: 'Illustration Sketchbook',
        description: 'Marker, ink, and mixed-media explorations.',
        images: [
          '07',
          '08',
          '08-1',
          '09',
          '1',
          '1-recovered',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '2',
          '2-10-10',
          '3',
          '4',
          '35',
          '36',
          '39',
          'pepole-done1',
        ],
      },
    ],
  };

  const featuredProjects = [
    {
      category: 'events',
      projectId: 'building-on-quality-2025',
      image: 'planning25-275',
      title: 'Building on Quality 2025',
      copy: 'Live illustration wall for a national planning conference — built as a single sweeping mural.',
    },
    {
      category: 'branding',
      projectId: 'athena',
      image: 'main',
      title: 'Athena Identity',
      copy: 'A geometric logotype and bold signage kit for a B2B innovator.',
    },
    {
      category: 'events',
      projectId: 'autojob',
      image: 'img-2620',
      title: 'Autojob HR Summit',
      copy: 'On-the-spot sketching that kept the HR crowd engaged and awake.',
    },
  ];

  const galleryEl = document.querySelector('[data-gallery]');
  const pageCategory = document.body.dataset.category;
  const pageType = document.body.dataset.page;
  const modalEl = document.querySelector('#lightbox-modal');
  const modalContent = document.querySelector('#lightbox-content');
  const modalTitle = document.querySelector('#lightbox-title');

  function buildImagePath(category, projectId, base, size = 'thumb') {
    return `images/sections/${category}/${projectId}/${base}-${size}.webp`;
  }

  function openLightbox(category, project) {
    if (!modalEl || !modalContent || !modalTitle) return;
    modalContent.innerHTML = '';
    modalTitle.textContent = project.title;

    project.images.forEach((imgName) => {
      const img = document.createElement('img');
      img.src = buildImagePath(category, project.id, imgName, 'wide');
      img.alt = `${project.title} detail`;
      img.className = 'lightbox-img';
      modalContent.appendChild(img);
    });

    modalEl.classList.add('active');
    modalEl.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!modalEl) return;
    modalEl.classList.remove('active');
    modalEl.setAttribute('aria-hidden', 'true');
  }

  function loadCategory(categoryName) {
    if (!galleryEl) return;
    const projects = portfolioData[categoryName];
    if (!projects) return;

    galleryEl.innerHTML = '';

    projects.forEach((project) => {
      const thumbName = project.cover || project.images[0];
      const card = document.createElement('div');
      card.className = 'gallery-item';
      card.innerHTML = `
        <img src="${buildImagePath(categoryName, project.id, thumbName, 'thumb')}" alt="${project.title}" loading="lazy">
        <div class="overlay"><h3>${project.title}</h3></div>
      `;
      card.addEventListener('click', () => openLightbox(categoryName, project));
      galleryEl.appendChild(card);
    });
  }

  function renderFeatured() {
    const container = document.querySelector('[data-featured-container]');
    if (!container) return;
    container.innerHTML = '';

    featuredProjects.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'featured-row';
      row.innerHTML = `
        <div class="featured-media">
          <img src="${buildImagePath(item.category, item.projectId, item.image, 'wide')}" alt="${item.title}">
        </div>
        <div class="featured-copy">
          <p class="eyebrow">${item.category}</p>
          <h3>${item.title}</h3>
          <p>${item.copy}</p>
          <div class="hero-actions">
            <a class="cta is-outline" href="#gallery" data-category-jump="${item.category}">View ${item.category}</a>
            <button class="cta" type="button" data-lightbox="${item.category}" data-project="${item.projectId}">Open lightbox</button>
          </div>
        </div>
      `;
      const lightboxButton = row.querySelector('[data-lightbox]');
      lightboxButton?.addEventListener('click', () => {
        const project = (portfolioData[item.category] || []).find((p) => p.id === item.projectId);
        if (project) {
          openLightbox(item.category, project);
        }
      });
      container.appendChild(row);
    });
  }

  function wireCategoryPills() {
    const pills = document.querySelectorAll('[data-category-toggle]');
    const jumpLinks = document.querySelectorAll('[data-category-jump]');
    if (!pills.length) return;
    pills.forEach((pill) => {
      pill.addEventListener('click', () => {
        const category = pill.getAttribute('data-category-toggle');
        pills.forEach((btn) => btn.classList.toggle('is-active', btn === pill));
        loadCategory(category);
        const gallerySection = document.querySelector('#gallery');
        if (gallerySection) gallerySection.scrollIntoView({ behavior: 'smooth' });
      });
    });
    jumpLinks.forEach((link) => {
      link.addEventListener('click', (evt) => {
        evt.preventDefault();
        const category = link.getAttribute('data-category-jump');
        const targetPill = Array.from(pills).find((pill) => pill.getAttribute('data-category-toggle') === category);
        if (targetPill) targetPill.click();
      });
    });
  }

  function initNavToggle() {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.menu-toggle');
    if (!nav || !toggle) return;
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  function initModalClose() {
    const closeBtn = document.querySelector('.modal__close');
    closeBtn?.addEventListener('click', closeLightbox);
    modalEl?.addEventListener('click', (evt) => {
      if (evt.target === modalEl) closeLightbox();
    });
    document.addEventListener('keyup', (evt) => {
      if (evt.key === 'Escape') closeLightbox();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderFeatured();
    wireCategoryPills();
    initNavToggle();
    initModalClose();

    const defaultCategory = pageCategory || 'events';
    if (galleryEl) {
      loadCategory(defaultCategory);
      const pills = Array.from(document.querySelectorAll('[data-category-toggle]'));
      pills.forEach((pill) => {
        const cat = pill.getAttribute('data-category-toggle');
        pill.classList.toggle('is-active', cat === defaultCategory);
      });
    }
  });
})();
