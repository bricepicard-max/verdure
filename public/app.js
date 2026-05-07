const photoIndex = [
  { id: 1, file: '07aa2a3b-76ab-466a-8952-17db4482f62d.jpeg', category: 'exterieurs', title: 'Entrée aux volets verts', alt: 'Entrée extérieure de Verdure & Cie avec volets verts et pot fleuri' },
  { id: 2, file: '122bd0a4-81f2-48c4-b3d7-d9588da6b6d5.jpeg', category: 'exterieurs', title: 'Fleurs tropicales', alt: 'Fleurs colorées devant les volets verts de la villa' },
  { id: 3, file: '12435ca6-fd7c-49b0-a4d9-1eb8726d6ac0.jpeg', category: 'pieces', title: 'Salon lumineux', alt: 'Salon lumineux avec canapés clairs et rideaux bleus' },
  { id: 4, file: '1ec749fa-2e9b-41bb-9419-d97469494981.jpeg', category: 'bains', title: 'Vasque et miroir', alt: 'Meuble vasque avec grand miroir et plante verte' },
  { id: 5, file: '26961ceb-bdb4-407d-8813-52812b1f5ef3.jpeg', category: 'details', title: 'Petit-déjeuner en chambre', alt: 'Plateau petit-déjeuner avec viennoiserie, boisson et fruits' },
  { id: 6, file: '26e34c49-0570-4b30-9990-ca682e0186d9.jpeg', category: 'piscine', title: 'Piscine vue du balcon', alt: 'Piscine privée turquoise vue depuis le balcon' },
  { id: 7, file: '27f01268-cd72-4d08-843e-25cdaeac807b.jpeg', category: 'details', title: 'Baignoire et plateau', alt: 'Baignoire avec plateau petit-déjeuner et produits d’accueil' },
  { id: 8, file: '2bd78319-02cb-44a0-a86a-3809f2a4b5cd.jpeg', category: 'chambres', title: 'Chambre mansardée et billard', alt: 'Chambre mansardée avec lit et billard' },
  { id: 9, file: '2c4752c3-6fef-4aab-9557-9e70805db083.jpeg', category: 'details', title: 'Rhums arrangés', alt: 'Carafes de rhums arrangés sur une étagère' },
  { id: 10, file: '2ecdc930-03e7-4ad7-aeaa-669b5604807a.jpeg', category: 'details', title: 'Linge brodé', alt: 'Détail de linge brodé Verdure et Cie' },
  { id: 11, file: '30be735f-edf9-46f0-aad5-9c295b3d2c31.jpeg', category: 'exterieurs', title: 'Façade fleurie', alt: 'Entrée extérieure fleurie avec volets verts' },
  { id: 12, file: '3240e373-242e-4803-817b-a75f83611165.jpeg', category: 'details', title: 'Épices et bocaux', alt: 'Bocaux de cuisine et épices sur une étagère' },
  { id: 13, file: '39a4e136-1b35-427b-a1d3-ee262a0b05b5.jpeg', category: 'chambres', title: 'Chambre claire sous pente', alt: 'Chambre claire avec lit double sous pente' },
  { id: 14, file: '3ac246ef-2080-4fcc-b067-8df80409faf3.jpeg', category: 'pieces', title: 'Salle à manger', alt: 'Salle à manger avec table ronde et chaises beiges' },
  { id: 15, file: '44f37212-9abd-4ef3-ae11-01b1d77be377.jpeg', category: 'pieces', title: 'Coin coiffeuse', alt: 'Coin coiffeuse avec fauteuils roses et miroir' },
  { id: 16, file: '45129f01-c542-4e35-9a64-968af6df69f3.jpeg', category: 'pieces', title: 'Accès étage', alt: 'Vue intérieure vers un escalier avec tableau coloré' },
  { id: 17, file: '47a5602e-b8f6-4206-b4be-136f7aff61cf.jpeg', category: 'details', title: 'Bar d’accueil', alt: 'Carafes et verres sur une étagère' },
  { id: 18, file: '47edcd74-b053-4b6d-a2e1-7766d1b12fa6.jpeg', category: 'pieces', title: 'Salon depuis l’entrée', alt: 'Salon clair avec fauteuils verts et rideaux bleus' },
  { id: 19, file: '4c3a315e-7e67-4d8d-b7f1-28ea1fe0f657.jpeg', category: 'chambres', title: 'Chambre verte', alt: 'Lit avec parure verte à motifs tropicaux' },
  { id: 20, file: '4c515222-8085-4801-8f30-002642b838cb.jpeg', category: 'pieces', title: 'Billard', alt: 'Billard vert prêt pour une partie' },
  { id: 21, file: '4dfc06a5-add7-4480-8323-b9052f4da883.jpeg', category: 'chambres', title: 'Fauteuil de lecture', alt: 'Fauteuil sombre avec coussin jaune dans une chambre mansardée' },
  { id: 22, file: '4f779346-ce65-4d84-90e1-1066e9de24c9.jpeg', category: 'chambres', title: 'Chambre familiale', alt: 'Chambre avec grand lit double et coussins décoratifs' },
  { id: 23, file: '54332482-041a-4545-a8eb-ef03270b7f47.jpeg', category: 'pieces', title: 'Cuisine équipée', alt: 'Cuisine équipée noire et blanche avec table ronde' },
  { id: 24, file: '575d1ab7-e46b-4e97-b11d-b33298680e85.jpeg', category: 'chambres', title: 'Chambre chaleureuse', alt: 'Chambre mansardée avec lampe et coussins orange' },
  { id: 25, file: '58581d8b-1a5d-4777-99fe-909938c8b1e5.jpeg', category: 'pieces', title: 'Détail salon', alt: 'Détail de canapé et table basse dans le salon' },
  { id: 26, file: '5e91cb71-3dda-43be-b526-57c3ba724240.jpeg', category: 'chambres', title: 'Chambre bleue', alt: 'Lit double avec parure bleue et petit-déjeuner' },
  { id: 27, file: '6512a789-03e2-44b3-a898-1e262b4e3446.jpeg', category: 'bains', title: 'Peignoirs', alt: 'Peignoirs suspendus dans une salle d’eau' },
  { id: 28, file: '6fc1d7c1-0379-45a8-aa00-abe37bc13292.jpeg', category: 'piscine', title: 'Piscine de nuit', alt: 'Piscine privée éclairée de nuit' },
  { id: 29, file: '70556232-55c0-4add-8582-d039709d5974.jpeg', category: 'pieces', title: 'Repas intérieur', alt: 'Salle à manger ouverte sur le salon' },
  { id: 30, file: '74bd6d8a-dbcb-4242-a01d-c8651b6ad4dc.jpeg', category: 'details', title: 'Tableau tropical', alt: 'Tableau tropical coloré dans le salon' },
  { id: 31, file: '7bfcfefb-ba32-4ea5-880c-2b770789a8a6.jpeg', category: 'pieces', title: 'Plan de travail', alt: 'Plan de travail clair avec coupe de fruits' },
  { id: 32, file: '83923c27-7a68-4d10-8023-6a57f3dfa697.jpeg', category: 'pieces', title: 'Cuisine ouverte', alt: 'Cuisine ouverte noire et blanche' },
  { id: 33, file: '8710a34f-1f9f-4767-92c3-77b183f976fd.jpeg', category: 'bains', title: 'Douche végétale', alt: 'Salle d’eau avec douche à décor végétal' },
  { id: 34, file: '881d8516-0b9c-47e7-a17c-0e1c5b57c93b.jpeg', category: 'pieces', title: 'Vue salon repas', alt: 'Vue large du salon et de la salle à manger' },
  { id: 35, file: '8be27738-86fe-4da4-a417-2cc488b8b080.jpeg', category: 'details', title: 'Carnet d’accueil', alt: 'Carnet d’accueil Verdure et Cie' },
  { id: 36, file: '8f63657b-90ab-4bad-a850-fb4e4e266daa.jpeg', category: 'pieces', title: 'Cuisine complète', alt: 'Cuisine équipée avec four et plaques de cuisson' },
  { id: 37, file: '9612f8e9-7aeb-4614-b4bd-3fab5d9cac3c.jpeg', category: 'piscine', title: 'Serviettes piscine', alt: 'Serviettes vertes au bord de la piscine' },
  { id: 38, file: '9c19b279-96a8-4fb8-8e94-db75dd29da17.jpeg', category: 'bains', title: 'Salle d’eau claire', alt: 'Salle d’eau avec douche et meuble vasque' },
  { id: 39, file: 'a286e9f4-6334-452e-a4dc-90d5a7495bcd.jpeg', category: 'exterieurs', title: 'Chauffage extérieur', alt: 'Chauffage de terrasse dans le jardin' },
  { id: 40, file: 'a4b4d537-1e38-4aea-8b34-d71e0a83bf1a.jpeg', category: 'exterieurs', title: 'Terrasse cosy', alt: 'Salon extérieur décoré avec coussins et table basse' },
  { id: 41, file: 'a5ad5ed2-eba4-459e-8c98-be28971af39c.jpeg', category: 'exterieurs', title: 'Parasol et jardin', alt: 'Parasol clair devant la végétation du jardin' },
  { id: 42, file: 'ad13b5bc-6f24-48dc-916d-6d09f842b549.jpeg', category: 'pieces', title: 'Salon en détail', alt: 'Bougies et table basse dans le salon' },
  { id: 43, file: 'aea4ec18-218e-442b-a8a5-926dc2eaa838.jpeg', category: 'chambres', title: 'Chambre blanche', alt: 'Chambre blanche avec lit double et fleurs rouges' },
  { id: 44, file: 'b1e20cc8-f2ae-4342-96f2-2be80f0c7488.jpeg', category: 'chambres', title: 'Grand lit sous pente', alt: 'Grand lit double sous pente avec lampe de chevet' },
  { id: 45, file: 'b200b610-6919-494d-8bfd-4b076b84b968.jpeg', category: 'exterieurs', title: 'Assise extérieure', alt: 'Chaise placée devant une porte aux volets verts' },
  { id: 46, file: 'b52eb0f0-aef6-464b-9b03-649dce598010.jpeg', category: 'chambres', title: 'Chambre bleue complète', alt: 'Chambre avec lit double et parure bleue' },
  { id: 47, file: 'ba39cc50-fd36-4872-a5a0-fb5fa10f0121.jpeg', category: 'details', title: 'Coussin cœur', alt: 'Coussin cœur rose sur un lit' },
  { id: 48, file: 'c51bdbc0-2402-4cb1-bed6-d405fe1c7205.jpeg', category: 'exterieurs', title: 'Grande table extérieure', alt: 'Grande table en bois sur terrasse couverte' },
  { id: 49, file: 'c6390307-8f88-4207-b593-3315483da4fc.jpeg', category: 'details', title: 'Esprit marin', alt: 'Coussin décoratif Esprit marin' },
  { id: 50, file: 'c8b537a5-1609-4c8a-b72f-931e4a204d61.jpeg', category: 'bains', title: 'Baignoire îlot', alt: 'Baignoire îlot avec plateau et produits d’accueil' },
  { id: 51, file: 'd04151fa-ed05-41a0-8afb-62de188ccbc3.jpeg', category: 'piscine', title: 'Piscine et linge', alt: 'Serviettes Verdure et Cie posées au bord de la piscine' },
  { id: 52, file: 'd3f706b9-c5c0-4112-895e-ee81213de1f3.jpeg', category: 'details', title: 'Café et bougies', alt: 'Café, bougies et éléments décoratifs sur une table' },
  { id: 53, file: 'd4d3e0f7-ee45-4330-af8d-a9bd6c3085ce.jpeg', category: 'details', title: 'Pochette brodée', alt: 'Pochette de linge brodée Verdure et Cie' },
  { id: 54, file: 'd7fcc397-4e80-4584-a261-56d3e8d11f3d.jpeg', category: 'chambres', title: 'Chambre bleue lumineuse', alt: 'Chambre lumineuse avec lit double et parure bleue' },
  { id: 55, file: 'd868a371-fa3e-487d-b3ed-d4093b58bbcf.jpeg', category: 'details', title: 'Carafes décoratives', alt: 'Carafes décoratives posées sur une étagère' },
  { id: 56, file: 'dde13492-af8c-454c-a75d-c24becaa4ddf.jpeg', category: 'details', title: 'Étagère cuisine', alt: 'Étagère de cuisine avec pot et bocaux' },
  { id: 57, file: 'e1183664-d608-4767-8420-81f166242e8e.jpeg', category: 'exterieurs', title: 'Bougainvillier', alt: 'Bougainvillier fleuri devant les volets verts' },
  { id: 58, file: 'e13a6a57-7865-49b1-a5e4-bb8e22e19c0a.jpeg', category: 'pieces', title: 'Fauteuil rose', alt: 'Fauteuil rose capitonné dans un espace intérieur clair' },
  { id: 59, file: 'e1fac463-d33a-4cd2-92fd-0b669af7de93.jpeg', category: 'piscine', title: 'Piscine nocturne', alt: 'Piscine de nuit avec transats et éclairage extérieur' },
  { id: 60, file: 'e61e929d-5a06-4fcc-aa1a-befbd25548b5.jpeg', category: 'chambres', title: 'Suite rose', alt: 'Chambre avec lit et fauteuil rose capitonné' },
  { id: 61, file: 'ec9647e1-abf2-4c24-9759-c01fac768070.jpeg', category: 'pieces', title: 'Salle à manger lumineuse', alt: 'Grande table ronde dans la salle à manger' },
  { id: 62, file: 'f0bd3d0d-222c-40f4-8c3b-3a51a8c3b13d.jpeg', category: 'pieces', title: 'Repas et salon', alt: 'Salle à manger ouverte vers le salon' },
  { id: 63, file: 'f370c62e-dba7-45b6-bf3d-48c3b550de6b.jpeg', category: 'bains', title: 'Suite avec baignoire', alt: 'Suite avec chambre bleue et baignoire îlot' },
  { id: 64, file: 'f37d6862-3269-4ab1-8e40-e7121628f875.jpeg', category: 'details', title: 'Berceau suspendu', alt: 'Berceau suspendu en bois et tissu sur la terrasse' },
  { id: 65, file: 'f991c03d-1e67-42c8-89bb-55872989d8f2.jpeg', category: 'chambres', title: 'Fauteuil jaune', alt: 'Fauteuil de lecture avec coussin jaune' },
  { id: 66, file: 'f9bca146-a6c6-45a5-b13a-75cfb762da86.jpeg', category: 'details', title: 'Ambiance café', alt: 'Tasses et décorations sur table claire' },
  { id: 67, file: 'fb9bacde-eaa3-4e7c-8a52-986b688a2e6b.jpeg', category: 'exterieurs', title: 'Table conviviale', alt: 'Grande table de terrasse orientée vers la piscine' },
  { id: 68, file: 'ff93c392-67d3-4ab4-8bda-f715ad4e4f99.jpeg', category: 'exterieurs', title: 'Salon extérieur couvert', alt: 'Salon extérieur couvert avec fauteuils clairs et table basse' },
  { id: 69, file: 'facebook/facebook-001.jpg', category: 'piscine', title: 'Serviettes au bord de l’eau', alt: 'Serviettes Verdure et Cie posées au bord de la piscine' },
  { id: 70, file: 'facebook/facebook-002.jpg', category: 'details', title: 'Petit-déjeuner soigné', alt: 'Petit-déjeuner préparé avec tasse et viennoiserie' },
  { id: 71, file: 'facebook/facebook-003.jpg', category: 'pieces', title: 'Billard sous les combles', alt: 'Billard vert dans l’espace détente mansardé de la villa' },
  { id: 72, file: 'facebook/facebook-004.jpg', category: 'piscine', title: 'Terrasse sur la piscine', alt: 'Terrasse extérieure ouverte sur la piscine privée' },
  { id: 73, file: 'facebook/facebook-008.jpg', category: 'exterieurs', title: 'Fruits du jardin', alt: 'Fruit tropical dans la végétation du jardin de Verdure et Cie' },
  { id: 74, file: 'facebook/facebook-009.jpg', category: 'exterieurs', title: 'Allée éclairée', alt: 'Allée extérieure de nuit avec végétation et lumière douce' },
  { id: 75, file: 'facebook/facebook-010.jpg', category: 'details', title: 'Accueil près de la piscine', alt: 'Plateau d’accueil Verdure et Cie près de la piscine' },
  { id: 76, file: 'facebook/facebook-011.jpg', category: 'details', title: 'Attention de bienvenue', alt: 'Verres et plateau d’accueil préparés pour les voyageurs' },
  { id: 77, file: 'facebook/facebook-012.jpg', category: 'piscine', title: 'Piscine et accueil', alt: 'Vue de la piscine avec plateau d’accueil au premier plan' },
  { id: 78, file: 'facebook/facebook-013.jpg', category: 'piscine', title: 'Piscine le soir', alt: 'Piscine privée éclairée en début de soirée' },
  { id: 79, file: 'facebook/facebook-014.jpg', category: 'piscine', title: 'Reflets nocturnes', alt: 'Piscine de nuit avec éclairage et reflets dans l’eau' },
  { id: 80, file: 'facebook/facebook-015.jpg', category: 'piscine', title: 'Bain de nuit', alt: 'Piscine éclairée de nuit avec ambiance tropicale' },
  { id: 81, file: 'facebook/facebook-017.jpg', category: 'piscine', title: 'Soirée piscine', alt: 'Piscine privée illuminée avec terrasse autour du bassin' },
  { id: 82, file: 'facebook/facebook-021.jpg', category: 'exterieurs', title: 'Floraison tropicale', alt: 'Fleurs tropicales colorées dans le jardin' },
  { id: 83, file: 'facebook/facebook-022.jpg', category: 'pieces', title: 'Cuisine en détail', alt: 'Plan de travail et équipements de la cuisine de la villa' },
  { id: 84, file: 'facebook/facebook-023.jpg', category: 'details', title: 'Pause café', alt: 'Machine à café et tasse dans la cuisine' },
  { id: 85, file: 'facebook/facebook-024.jpg', category: 'details', title: 'Café Verdure', alt: 'Tasse et machine à café avec détail Verdure et Cie' },
  { id: 86, file: 'facebook/facebook-025.jpg', category: 'bains', title: 'Marbre et vasque', alt: 'Détail de salle d’eau avec vasque et finition marbrée' },
  { id: 87, file: 'facebook/facebook-026.jpg', category: 'exterieurs', title: 'Repos au jardin', alt: 'Hamac et espace détente dans le jardin' },
  { id: 88, file: 'facebook/facebook-027.jpg', category: 'exterieurs', title: 'Coin jeux extérieur', alt: 'Espace extérieur avec pelouse et équipements de détente' },
  { id: 89, file: 'facebook/facebook-028.jpg', category: 'details', title: 'Verre de bienvenue', alt: 'Verre servi dans une ambiance d’accueil conviviale' },
  { id: 90, file: 'facebook/facebook-031.jpg', category: 'details', title: 'Café face au sud', alt: 'Tasse Verdure et Cie avec vue dégagée vers l’extérieur' },
  { id: 91, file: 'facebook/facebook-032.jpg', category: 'details', title: 'Rideaux et lumière', alt: 'Détail textile et lumière naturelle dans la villa' },
  { id: 92, file: 'facebook/facebook-034.jpg', category: 'piscine', title: 'Piscine depuis la terrasse', alt: 'Piscine privée vue depuis la terrasse couverte' },
  { id: 93, file: 'facebook/facebook-036.jpg', category: 'exterieurs', title: 'Parasol au jardin', alt: 'Parasol clair installé dans le jardin tropical' },
  { id: 94, file: 'facebook/facebook-037.jpg', category: 'exterieurs', title: 'Chaise aux volets verts', alt: 'Chaise extérieure devant les volets verts de la villa' },
  { id: 95, file: 'facebook/facebook-038.jpg', category: 'details', title: 'Berceau suspendu', alt: 'Berceau suspendu dans un espace extérieur couvert' },
  { id: 96, file: 'facebook/facebook-039.jpg', category: 'pieces', title: 'Salon chaleureux', alt: 'Salon de la villa avec canapé, coussins et table basse' },
  { id: 97, file: 'facebook/facebook-040.jpg', category: 'pieces', title: 'Cuisine ouverte', alt: 'Cuisine ouverte équipée avec rangements et plan de travail' },
  { id: 98, file: 'facebook/facebook-041.jpg', category: 'details', title: 'Bocaux et épices', alt: 'Bocaux, épices et éléments de cuisine à disposition' },
  { id: 99, file: 'facebook/facebook-042.jpg', category: 'bains', title: 'Salle d’eau contemporaine', alt: 'Salle d’eau claire avec vasque et miroir' },
  { id: 100, file: 'facebook/facebook-043.jpg', category: 'details', title: 'Peignoir brodé', alt: 'Peignoir Verdure et Cie suspendu dans la villa' },
  { id: 101, file: 'facebook/facebook-044.jpg', category: 'details', title: 'Coussin d’accueil', alt: 'Coussin décoratif dans une ambiance chaleureuse' },
  { id: 102, file: 'facebook/facebook-046.jpg', category: 'details', title: 'Décor tropical', alt: 'Tableau tropical coloré dans la décoration intérieure' },
  { id: 103, file: 'facebook/facebook-053.jpg', category: 'exterieurs', title: 'Balcon et verdure', alt: 'Vue extérieure avec balcon et végétation tropicale' },
  { id: 104, file: 'facebook/facebook-054.jpg', category: 'piscine', title: 'Eau turquoise', alt: 'Gros plan sur l’eau turquoise de la piscine' },
  { id: 105, file: 'facebook/facebook-055.jpg', category: 'exterieurs', title: 'Façade et terrasse', alt: 'Extérieur de la villa avec terrasse et ouverture sur le jardin' },
  { id: 106, file: 'facebook/facebook-056.jpg', category: 'piscine', title: 'Détail piscine', alt: 'Détail de l’eau et du rebord de la piscine privée' },
  { id: 107, file: 'facebook/facebook-057.jpg', category: 'piscine', title: 'Piscine lumineuse', alt: 'Piscine privée avec eau claire et lumière tropicale' },
];

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.textContent = isOpen ? '×' : '☰';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      });
    });
  }

  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    if (link.getAttribute('href') === path) {
      link.setAttribute('aria-current', 'page');
    }
  });

  initGallery();
  initDates();
  initAvailabilityForm();
  initAdminClientForm();
  initClientPortal();
});

function initGallery() {
  const gallery = document.getElementById('photoGallery');
  if (!gallery) return;

  const render = (category) => {
    const photos = category === 'all'
      ? photoIndex
      : photoIndex.filter((photo) => photo.category === category);

    gallery.innerHTML = photos.map((photo) => `
      <figure class="gallery-card" data-category="${photo.category}">
        <button class="gallery-card__button" type="button" data-photo-id="${photo.id}" aria-label="Agrandir : ${photo.title}">
          <img src="/assets/images/${photo.file}" alt="${photo.alt}" loading="lazy">
          <span class="gallery-card__number">${String(photo.id).padStart(2, '0')}</span>
        </button>
        <figcaption>
          <strong>${photo.title}</strong>
          <span>${categoryLabel(photo.category)}</span>
        </figcaption>
      </figure>
    `).join('');
  };

  render('all');

  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('is-active'));
      button.classList.add('is-active');
      render(button.dataset.filter);
    });
  });

  gallery.addEventListener('click', (event) => {
    const button = event.target.closest('[data-photo-id]');
    if (!button) return;
    const photo = photoIndex.find((item) => item.id === Number(button.dataset.photoId));
    if (photo) openLightbox(photo);
  });
}

function categoryLabel(category) {
  return {
    exterieurs: 'Extérieurs',
    piscine: 'Piscine',
    pieces: 'Pièces de vie',
    chambres: 'Chambres',
    bains: 'Salles d’eau',
    details: 'Détails',
  }[category] || 'Photo';
}

function openLightbox(photo) {
  const existing = document.querySelector('.lightbox');
  if (existing) existing.remove();

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  lightbox.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="Fermer">×</button>
    <figure>
      <img src="/assets/images/${photo.file}" alt="${photo.alt}">
      <figcaption><span>${String(photo.id).padStart(2, '0')}</span>${photo.title}</figcaption>
    </figure>
  `;
  document.body.appendChild(lightbox);
  document.body.classList.add('is-lightbox-open');

  const close = () => {
    lightbox.remove();
    document.body.classList.remove('is-lightbox-open');
    document.removeEventListener('keydown', onKeydown);
  };
  const onKeydown = (event) => {
    if (event.key === 'Escape') close();
  };

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.closest('.lightbox__close')) close();
  });
  document.addEventListener('keydown', onKeydown);
}

function initDates() {
  const today = new Date().toISOString().split('T')[0];
  document.querySelectorAll('input[type="date"]').forEach((input) => {
    input.setAttribute('min', today);
  });
}

function initAvailabilityForm() {
  const form = document.getElementById('availabilityForm');
  if (!form) return;

  const submitBtn = document.getElementById('submitBtn');
  const error = document.getElementById('formError');

  const showError = (message) => {
    error.textContent = message;
    error.hidden = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'Envoyer la demande';
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    error.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Envoi...';

    const data = Object.fromEntries(new FormData(form).entries());
    data.name = (data.name || '').trim();
    data.email = (data.email || '').trim();
    data.phone = (data.phone || '').trim();
    data.message = (data.message || '').trim();

    if (!data.name || !data.email || !data.arrival || !data.departure) {
      showError('Merci de renseigner votre nom, votre email et les dates souhaitées.');
      return;
    }

    if (!data.email.includes('@')) {
      showError('Merci de saisir une adresse email valide.');
      return;
    }

    if (new Date(data.arrival) >= new Date(data.departure)) {
      showError('La date de départ doit être après la date d’arrivée.');
      return;
    }

    try {
      const response = await fetch('/api/send-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        showError(result.error || 'La demande n’a pas pu être envoyée.');
        return;
      }

      form.innerHTML = `
        <div class="form__success">
          <p class="eyebrow">Demande envoyée</p>
          <h3>Merci ${data.name}</h3>
          <p>Votre demande a bien été transmise. Une réponse sera envoyée à <strong>${data.email}</strong>.</p>
          <a class="btn btn--outline" href="/reservation">Retour aux disponibilités</a>
        </div>
      `;
    } catch (err) {
      showError('Connexion impossible au serveur. Réessayez dans quelques instants.');
    }
  });
}

function euro(cents) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format((cents || 0) / 100);
}

function initAdminClientForm() {
  const form = document.getElementById('adminClientForm');
  if (!form) return;

  const error = document.getElementById('adminError');
  const result = document.getElementById('adminResult');

  const showError = (message) => {
    error.textContent = message;
    error.hidden = false;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    error.hidden = true;
    result.hidden = true;

    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const response = await fetch('/api/admin/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': data.adminToken,
        },
        body: JSON.stringify(data),
      });
      const payload = await response.json();
      if (!response.ok) {
        showError(payload.error || 'Impossible de créer le dossier client.');
        return;
      }

      const client = payload.client;
      result.innerHTML = `
        <p class="eyebrow">Dossier créé</p>
        <h3>${client.guestName}</h3>
        <p>Lien privé à envoyer au client :</p>
        <p><a href="${client.clientUrl}" target="_blank" rel="noopener">${client.clientUrl}</a></p>
        <p>Acompte 30% : <strong>${euro(client.depositAmountCents)}</strong></p>
      `;
      result.hidden = false;
      form.reset();
    } catch (err) {
      showError('Connexion impossible au serveur.');
    }
  });
}

function initClientPortal() {
  const portal = document.getElementById('clientPortal');
  if (!portal) return;

  const token = window.location.pathname.split('/').filter(Boolean).pop();

  const load = async () => {
    const response = await fetch(`/api/client/${token}`);
    const payload = await response.json();
    if (!response.ok) {
      portal.innerHTML = `<article class="card"><h3>Dossier introuvable</h3><p>${payload.error || 'Le lien client est invalide.'}</p></article>`;
      return;
    }
    renderClientPortal(portal, token, payload.client, payload.signatures || []);
  };

  load().catch(() => {
    portal.innerHTML = '<article class="card"><h3>Erreur</h3><p>Impossible de charger le dossier client.</p></article>';
  });
}

function signedSet(signatures) {
  return new Set(signatures.map((signature) => signature.document_type));
}

function renderClientPortal(portal, token, client, signatures) {
  const signed = signedSet(signatures);
  const swikly = client.swiklyUrl
    ? `<a class="btn btn--outline btn--full" href="${client.swiklyUrl}" target="_blank" rel="noopener">Déposer la caution Swikly</a>`
    : '<p class="note">Le lien Swikly sera ajouté par l’hôte dès qu’il sera prêt.</p>';

  portal.innerHTML = `
    <aside class="client-summary">
      <h2>${client.guestName}</h2>
      <p>${client.arrival || 'Arrivée à préciser'} → ${client.departure || 'Départ à préciser'}</p>
      <dl>
        <div><dt>Voyageurs</dt><dd>${client.guests || '-'}</dd></div>
        <div><dt>Total séjour</dt><dd>${euro(client.totalAmountCents)}</dd></div>
        <div><dt>Acompte 30%</dt><dd>${euro(client.depositAmountCents)}</dd></div>
      </dl>
      <button class="btn btn--primary btn--full" type="button" id="payDeposit">Payer l’acompte Stripe</button>
      ${swikly}
      <p class="form__error" id="portalError" hidden></p>
    </aside>

    <section class="client-documents">
      ${documentCard('contract', 'Contrat de location', 'Je reconnais avoir lu et accepté le contrat de location Verdure & Cie.', signed.has('contract'))}
      ${documentCard('etat_des_lieux', 'État des lieux', 'Je reconnais que l’état des lieux sera réalisé à l’arrivée et au départ.', signed.has('etat_des_lieux'))}
      ${documentCard('reglement', 'Règlement intérieur', 'Je reconnais avoir lu et accepté le règlement intérieur Verdure & Cie.', signed.has('reglement'), '/reglement-interieur')}
    </section>
  `;

  portal.querySelectorAll('[data-sign-document]').forEach((button) => {
    button.addEventListener('click', async () => {
      await signDocument(token, client, button.dataset.signDocument, button.dataset.acceptedText);
      const response = await fetch(`/api/client/${token}`);
      const payload = await response.json();
      renderClientPortal(portal, token, payload.client, payload.signatures || []);
    });
  });

  const payButton = document.getElementById('payDeposit');
  payButton.addEventListener('click', async () => {
    const error = document.getElementById('portalError');
    error.hidden = true;
    payButton.disabled = true;
    payButton.textContent = 'Préparation du paiement...';
    try {
      const response = await fetch(`/api/client/${token}/stripe-deposit`, { method: 'POST' });
      const payload = await response.json();
      if (!response.ok) {
        error.textContent = payload.error || 'Paiement indisponible.';
        error.hidden = false;
        payButton.disabled = false;
        payButton.textContent = 'Payer l’acompte Stripe';
        return;
      }
      window.location.href = payload.url;
    } catch (err) {
      error.textContent = 'Impossible de contacter Stripe.';
      error.hidden = false;
      payButton.disabled = false;
      payButton.textContent = 'Payer l’acompte Stripe';
    }
  });
}

function documentCard(type, title, acceptedText, isSigned, link) {
  return `
    <article class="card document-sign-card ${isSigned ? 'is-signed' : ''}">
      <h3>${title}</h3>
      <p>${acceptedText}</p>
      ${link ? `<a href="${link}" target="_blank" rel="noopener">Lire le document</a>` : ''}
      <button class="btn ${isSigned ? 'btn--outline' : 'btn--primary'} btn--full" type="button" data-sign-document="${type}" data-accepted-text="${acceptedText}">
        ${isSigned ? 'Signer à nouveau' : 'Signer ce document'}
      </button>
      ${isSigned ? '<p class="signed-badge">Document signé</p>' : ''}
    </article>
  `;
}

// Scroll reveal
(function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  const sel = '.section__head, .card, .stat, .review-panel, .copy, .actions, .note, .rate-card, .contact-card, .form, .intro-grid > div, .intro-grid > aside';
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const sibs = Array.from(entry.target.parentElement.children).filter(el => el.classList.contains('reveal'));
      const idx = Math.max(0, sibs.indexOf(entry.target));
      entry.target.style.transitionDelay = `${idx * 0.1}s`;
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' });

  document.querySelectorAll(sel).forEach(el => {
    if (el.getBoundingClientRect().top > window.innerHeight * 0.88) {
      el.classList.add('reveal');
      io.observe(el);
    }
  });
})();

// Animation des compteurs
(function initCounters() {
  if (!('IntersectionObserver' in window)) return;
  const animate = (el) => {
    const raw = el.textContent.trim();
    const target = parseFloat(raw.replace(',', '.'));
    if (isNaN(target)) return;
    const hasComma = raw.includes(',');
    const start = performance.now();
    el.dataset.final = raw;
    const tick = (now) => {
      const t = Math.min((now - start) / 1200, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = hasComma
        ? (target * eased).toFixed(1).replace('.', ',')
        : Math.round(target * eased);
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = el.dataset.final;
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate(entry.target);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.review-panel strong, .stat strong').forEach(el => io.observe(el));
})();

// Parallaxe hero
(function initParallax() {
  const media = document.querySelector('.hero__media');
  if (!media) return;
  const heroEl = media.closest('.hero');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy > heroEl.offsetHeight) return;
    media.style.transform = `translateY(${sy * 0.12}px)`;
  }, { passive: true });
})();

async function signDocument(token, client, documentType, acceptedText) {
  const signerName = window.prompt('Nom et prénom pour la signature', client.guestName || '');
  if (!signerName) return;
  const signerEmail = window.prompt('Email du signataire', client.guestEmail || '');
  if (!signerEmail) return;
  const confirmation = window.prompt('Tapez exactement : Lu et approuvé');
  if (confirmation !== 'Lu et approuvé') {
    window.alert('La mention doit être exactement : Lu et approuvé');
    return;
  }

  const response = await fetch(`/api/client/${token}/sign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ documentType, signerName, signerEmail, acceptedText }),
  });
  const payload = await response.json();
  if (!response.ok) {
    window.alert(payload.error || 'Signature impossible.');
  }
}
