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
  { id: 82, file: 'facebook/facebook-021.jpg', category: 'exterieurs', title: 'Floraison tropicale', alt: 'Fleurs tropicales colorées dans le jardin' },
  { id: 83, file: 'facebook/facebook-022.jpg', category: 'pieces', title: 'Cuisine en détail', alt: 'Plan de travail et équipements de la cuisine de la villa' },
  { id: 84, file: 'facebook/facebook-023.jpg', category: 'details', title: 'Pause café', alt: 'Machine à café et tasse dans la cuisine' },
  { id: 86, file: 'facebook/facebook-025.jpg', category: 'bains', title: 'Marbre et vasque', alt: 'Détail de salle d’eau avec vasque et finition marbrée' },
  { id: 87, file: 'facebook/facebook-026.jpg', category: 'exterieurs', title: 'Repos au jardin', alt: 'Hamac et espace détente dans le jardin' },
  { id: 88, file: 'facebook/facebook-027.jpg', category: 'exterieurs', title: 'Coin jeux extérieur', alt: 'Espace extérieur avec pelouse et équipements de détente' },
  { id: 89, file: 'facebook/facebook-028.jpg', category: 'details', title: 'Verre de bienvenue', alt: 'Verre servi dans une ambiance d’accueil conviviale' },
  { id: 91, file: 'facebook/facebook-032.jpg', category: 'details', title: 'Rideaux et lumière', alt: 'Détail textile et lumière naturelle dans la villa' },
  { id: 93, file: 'facebook/facebook-036.jpg', category: 'exterieurs', title: 'Parasol au jardin', alt: 'Parasol clair installé dans le jardin tropical' },
  { id: 94, file: 'facebook/facebook-037.jpg', category: 'exterieurs', title: 'Chaise aux volets verts', alt: 'Chaise extérieure devant les volets verts de la villa' },
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
  { id: 108, file: 'proprio-piscine.jpg', category: 'proprietaires', title: 'Brice & Anne-Sophie au bord de la piscine', alt: 'Les propriétaires devant la piscine' },
  { id: 109, file: 'proprio-salon.jpg', category: 'proprietaires', title: 'Brice & Anne-Sophie dans le salon', alt: 'Les propriétaires dans le salon' },
  { id: 110, file: 'proprio-repas.jpg', category: 'proprietaires', title: 'Repas en famille sous la pergola', alt: 'Repas convivial sous la pergola' },
  { id: 111, file: 'proprio-cuisine.jpg', category: 'proprietaires', title: 'En cuisine', alt: 'Les propriétaires en cuisine' },
  { id: 112, file: 'proprio-nuit.jpg', category: 'proprietaires', title: 'Baignade nocturne', alt: 'Les propriétaires dans la piscine la nuit' },
];

// ─── Chat widget ─────────────────────────────────────────────────────────────
(function initChat() {
  const isAdminOrClient = window.location.pathname.startsWith('/admin')
    || window.location.pathname.startsWith('/espace-client');
  const bubble = document.createElement('button');
  bubble.className = 'chat-bubble';
  bubble.setAttribute('aria-label', 'Ouvrir le chat');
  bubble.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';
  document.body.appendChild(bubble);

  const panel = document.createElement('div');
  panel.className = 'chat-panel';
  panel.setAttribute('aria-label', 'Chat Verdure & Cie');
  panel.innerHTML = `
    <div class="chat-panel__head">
      <span>Verdure & Cie — Assistant</span>
      <button class="chat-panel__close" aria-label="Fermer le chat">×</button>
    </div>
    <div class="chat-panel__messages" id="chatMessages">
      <div class="chat-msg chat-msg--bot">Bonjour ! Je suis l’assistant de Verdure & Cie. Comment puis-je vous aider ?</div>
    </div>
    <form class="chat-panel__form" id="chatForm">
      <input class="chat-panel__input" id="chatInput" type="text" placeholder="Votre question..." autocomplete="off" maxlength="300">
      <button class="chat-panel__send" type="submit" aria-label="Envoyer">&#8593;</button>
    </form>
  `;
  document.body.appendChild(panel);

  let open = false;
  const messages = [];

  bubble.addEventListener('click', () => {
    open = !open;
    panel.classList.toggle('is-open', open);
    bubble.classList.toggle('is-active', open);
    if (open) panel.querySelector('#chatInput').focus();
  });
  panel.querySelector('.chat-panel__close').addEventListener('click', () => {
    open = false;
    panel.classList.remove('is-open');
    bubble.classList.remove('is-active');
  });

  const msgEl = panel.querySelector('#chatMessages');
  const addMsg = (text, role) => {
    const div = document.createElement('div');
    div.className = `chat-msg chat-msg--${role}`;
    div.textContent = text;
    msgEl.appendChild(div);
    msgEl.scrollTop = msgEl.scrollHeight;
  };

  panel.querySelector('#chatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = panel.querySelector('#chatInput');
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    addMsg(text, 'user');
    messages.push({ role: 'user', content: text });

    const typing = document.createElement('div');
    typing.className = 'chat-msg chat-msg--bot chat-msg--typing';
    typing.textContent = '…';
    msgEl.appendChild(typing);
    msgEl.scrollTop = msgEl.scrollHeight;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      const data = await res.json();
      typing.remove();
      const reply = data.reply || 'Désolé, une erreur est survenue.';
      messages.push({ role: 'assistant', content: reply });
      addMsg(reply, 'bot');
    } catch {
      typing.remove();
      addMsg('Connexion impossible. Appelez le 0692 51 27 66.', 'bot');
    }
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.textContent = isOpen ? '×' : '☰';
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
        document.body.style.overflow = '';
      });
    });
  }

  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('[data-nav]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === path || (path === '/photos' && href === '/galerie')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  initHeroReel();
  initVideoBar();
  initGallery();
  initDates();
  initAvailabilityForm();
  initBookingCalendar();
  initAdminClientForm();
  initClientPortal();
});

const galleryGroups = [
  { id: 'piscine',       label: 'Piscine',                     cover: 6,   photoIds: [6, 51, 69, 72, 77, 104, 106, 107] },
  { id: 'piscine-nuit',  label: 'Piscine de nuit',             cover: 28,  photoIds: [28, 59, 112] },
  { id: 'sejour',        label: 'Séjour',                      cover: 3,   photoIds: [3, 18, 25, 34, 42, 58, 109] },
  { id: 'cuisine',       label: 'Cuisine & repas',             cover: 23,  photoIds: [23, 14, 29, 31, 32, 36, 61, 62, 83, 111] },
  { id: 'terrasse',      label: 'Terrasse & repas dehors',     cover: 48,  photoIds: [48, 67, 68, 110, 40, 64] },
  { id: 'chambre-1',     label: 'Chambre 1 - suite parentale', cover: 60,  photoIds: [60, 63, 15, 50] },
  { id: 'chambre-2',     label: 'Chambre 2',                   cover: 46,  photoIds: [46, 54] },
  { id: 'chambre-3',     label: 'Chambre 3',                   cover: 13,  photoIds: [13, 44] },
  { id: 'chambre-4',     label: 'Chambre 4',                   cover: 22,  photoIds: [22, 24] },
  { id: 'chambre-5',     label: 'Chambre 5',                   cover: 19,  photoIds: [19, 21, 43] },
  { id: 'bain-1',        label: 'Salle de bain 1',             cover: 50,  photoIds: [50, 4, 27] },
  { id: 'bain-2',        label: 'Salle de bain 2',             cover: 33,  photoIds: [33, 86] },
  { id: 'bain-3',        label: 'Salle de bain 3',             cover: 38,  photoIds: [38, 99] },
  { id: 'facade',        label: 'Façade & entrée',             cover: 1,   photoIds: [1, 2, 11, 45, 57, 94, 103, 105] },
  { id: 'jardin',        label: 'Jardin',                      cover: 87,  photoIds: [39, 41, 73, 74, 87, 88, 93] },
  { id: 'details',       label: 'Détails & accueil',           cover: 9,   photoIds: [5, 7, 9, 10, 17, 30, 35, 53, 55, 75, 76, 84, 89, 98, 100, 101, 102] },
  { id: 'proprietaires', label: 'Les propriétaires',           cover: 108, photoIds: [108, 109, 110, 111, 112] },
];

function initGallery() {
  const gallery = document.getElementById('photoGallery');
  if (!gallery) return;

  gallery.innerHTML = galleryGroups.map((group) => {
    const photos = group.photoIds
      .map((id) => photoIndex.find((p) => p.id === id))
      .filter(Boolean);
    if (!photos.length) return '';

    const cards = photos.map((photo, idx) => `
      <figure class="gallery-card${idx === 0 ? ' gallery-card--featured' : ''}">
        <button class="gallery-card__button" type="button" data-photo-id="${photo.id}" aria-label="Agrandir : ${photo.title}">
          <img src="/assets/images/${photo.file}" alt="${photo.alt}" loading="lazy">
        </button>
        <figcaption>${photo.title}</figcaption>
      </figure>
    `).join('');

    return `
      <section class="gallery-group" id="group-${group.id}">
        <header class="gallery-group__header">
          <h2 class="gallery-group__title">${group.label}</h2>
          <span class="gallery-group__count">${photos.length} photo${photos.length > 1 ? 's' : ''}</span>
        </header>
        <div class="gallery-group__grid">${cards}</div>
      </section>
    `;
  }).join('');

  gallery.addEventListener('click', (event) => {
    const button = event.target.closest('[data-photo-id]');
    if (!button) return;
    const photo = photoIndex.find((item) => item.id === Number(button.dataset.photoId));
    if (photo) openLightbox(photo);
  });

  // Highlight galerie nav au scroll
  const navLinks2 = document.querySelectorAll('.gallery-nav__inner a');
  if (navLinks2.length) {
    const sections = galleryGroups.map(g => document.getElementById('group-' + g.id)).filter(Boolean);
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks2.forEach(a => a.classList.remove('is-active'));
          const active = document.querySelector(`.gallery-nav__inner a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('is-active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
    sections.forEach(s => obs.observe(s));
  }
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

  const allPhotos = galleryGroups.flatMap((g) =>
    g.photoIds.map((id) => photoIndex.find((p) => p.id === id)).filter(Boolean)
  );
  let currentIdx = allPhotos.findIndex((p) => p.id === photo.id);
  if (currentIdx === -1) currentIdx = 0;

  const lightbox = document.createElement('div');
  lightbox.className = 'lightbox';
  document.body.appendChild(lightbox);
  document.body.classList.add('is-lightbox-open');

  const render = (idx) => {
    const p = allPhotos[idx];
    lightbox.innerHTML = `
      <button class="lightbox__close" type="button" aria-label="Fermer">×</button>
      <button class="lightbox__prev" type="button" aria-label="Photo précédente">‹</button>
      <button class="lightbox__next" type="button" aria-label="Photo suivante">›</button>
      <figure>
        <img src="/assets/images/${p.file}" alt="${p.alt}">
        <figcaption>${p.title}</figcaption>
      </figure>
    `;
  };

  render(currentIdx);

  const close = () => {
    lightbox.remove();
    document.body.classList.remove('is-lightbox-open');
    document.removeEventListener('keydown', onKeydown);
  };
  const prev = () => { currentIdx = (currentIdx - 1 + allPhotos.length) % allPhotos.length; render(currentIdx); };
  const next = () => { currentIdx = (currentIdx + 1) % allPhotos.length; render(currentIdx); };

  const onKeydown = (event) => {
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') prev();
    if (event.key === 'ArrowRight') next();
  };

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox || event.target.closest('.lightbox__close')) close();
    if (event.target.closest('.lightbox__prev')) prev();
    if (event.target.closest('.lightbox__next')) next();
  });
  document.addEventListener('keydown', onKeydown);

  // Touch swipe
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) { dx < 0 ? next() : prev(); }
  });
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

function copyLink(path) {
  var url = window.location.origin + path;
  navigator.clipboard.writeText(url).catch(function() {});
  var btn = event.target;
  var orig = btn.textContent;
  btn.textContent = '✓ Copié !';
  btn.style.background = 'rgba(47,107,58,.1)';
  setTimeout(function() { btn.textContent = orig; btn.style.background = ''; }, 2000);
}

function statusLabel(status) {
  return { created: '🟡 Créé', deposit_paid: '🔵 Acompte payé', completed: '✅ Complet' }[status] || status;
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

  const _parts = window.location.pathname.split('/').filter(Boolean);
  const token = _parts.length >= 2 ? _parts[_parts.length - 1] : null;
  if (!token || token === 'espace-client') {
    portal.innerHTML = '<article class="card" style="max-width:460px;margin:0 auto;text-align:center"><h3>Accéder à votre dossier</h3><p>Saisissez le code reçu par e-mail.</p><input id="tokenInput" type="text" placeholder="Code de réservation" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:8px;margin:12px 0"><button onclick="(function(){var t=document.getElementById(\"tokenInput\").value.trim();if(t)window.location=\"/espace-client/\"+t})()" class="btn btn--primary btn--full">Accéder</button><p style="margin-top:12px;font-size:.85rem;color:#888">Ce code figure dans votre e-mail de confirmation d’hôte.</p></article>';
    return;
  }

  const load = async () => {
    const response = await fetch(`/api/client/${token}`);
    const payload = await response.json();
    if (!response.ok) {
      portal.innerHTML = `<article class="card"><h3>Dossier introuvable</h3><p>${payload.error || 'Le lien client est invalide.'}</p></article>`;
      return;
    }
    updateTimeline(payload.client, payload.signatures || []);
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
      ${documentCard('contract', 'Contrat de location', 'Je reconnais avoir lu et accepté le contrat de location Verdure & Cie.', signed.has('contract'), null, true)}
      ${documentCard('etat_des_lieux', 'État des lieux', 'Je reconnais que l\'état des lieux sera réalisé à l\'arrivée et au départ en présence de l\'hôte.', signed.has('etat_des_lieux'))}
      ${documentCard('reglement', 'Règlement intérieur', 'Je reconnais avoir lu et accepté le règlement intérieur Verdure & Cie.', signed.has('reglement'), '/reglement-interieur')}
    </section>
  `;

  portal.querySelectorAll('[data-view-contract]').forEach((btn) => {
    btn.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('verdure:showContract', { detail: client }));
    });
  });

  portal.querySelectorAll('[data-sign-document]').forEach((button) => {
    button.addEventListener('click', async () => {
      const signed = await signDocument(
        token, client,
        button.dataset.signDocument,
        button.dataset.acceptedText,
        button.closest('.document-sign-card').querySelector('h3').textContent,
      );
      if (!signed) return;
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

function updateTimeline(client, documents) {
  var depositDone = client.status === 'deposit_paid' || client.status === 'completed';
  var contractSigned = documents.some(function(d) { return d.documentType === 'contract' && d.signedAt; });
  var allDone = depositDone && contractSigned;

  if (depositDone) {
    var el = document.getElementById('tStep2');
    if (el) { el.classList.remove('is-active'); el.classList.add('is-done'); }
    var sep = document.getElementById('tSep1');
    if (sep) sep.classList.add('is-done');
  } else {
    var el = document.getElementById('tStep2');
    if (el) el.classList.add('is-active');
  }
  if (contractSigned) {
    var el = document.getElementById('tStep3');
    if (el) el.classList.add('is-done');
    var sep = document.getElementById('tSep2');
    if (sep) sep.classList.add('is-done');
  } else if (depositDone) {
    var el = document.getElementById('tStep3');
    if (el) el.classList.add('is-active');
  }
  if (allDone) {
    var el = document.getElementById('tStep4');
    if (el) el.classList.add('is-done');
    var sep = document.getElementById('tSep3');
    if (sep) sep.classList.add('is-done');
  } else if (contractSigned) {
    var el = document.getElementById('tStep4');
    if (el) el.classList.add('is-active');
  }
}

function documentCard(type, title, acceptedText, isSigned, link, showContractBtn) {
  return `
    <article class="card document-sign-card ${isSigned ? 'is-signed' : ''}">
      <h3>${title}</h3>
      <p>${acceptedText}</p>
      ${showContractBtn ? '<button class="btn btn--ghost btn--full" type="button" data-view-contract="1" style="margin-bottom:8px">Lire le contrat complet</button>' : ''}
      ${link ? `<a class="btn btn--ghost btn--full" href="${link}" target="_blank" rel="noopener" style="margin-bottom:8px">Lire le document</a>` : ''}
      <button class="btn ${isSigned ? 'btn--outline' : 'btn--primary'} btn--full" type="button" data-sign-document="${type}" data-accepted-text="${acceptedText}">
        ${isSigned ? 'Signer à nouveau' : 'Signer ce document'}
      </button>
      ${isSigned ? '<p class="signed-badge">✓ Document signé</p>' : ''}
    </article>
  `;
}

function initBookingCalendar() {
  const calEl = document.getElementById('bookingCalendar');
  if (!calEl) return;

  const arrivalInput = document.getElementById('arrival');
  const departureInput = document.getElementById('departure');

  let startDate = null;
  let endDate = null;
  let bookedRanges = [];
  const now = new Date();
  let calYear = now.getFullYear();
  let calMonth = now.getMonth();

  const MONTH_FR = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

  function toISO(compact) {
    return `${compact.slice(0,4)}-${compact.slice(4,6)}-${compact.slice(6,8)}`;
  }

  function todayCompact() {
    const t = new Date();
    return `${t.getFullYear()}${String(t.getMonth()+1).padStart(2,'0')}${String(t.getDate()).padStart(2,'0')}`;
  }

  function isBooked(c) {
    return bookedRanges.some(r => c >= r.start && c < r.end);
  }

  function hasBookedInRange(s, e) {
    return bookedRanges.some(r => r.start < e && r.end > s);
  }

  function renderMonth(year, month) {
    const firstDow = new Date(year, month, 1).getDay();
    const offset = (firstDow + 6) % 7;
    const days = new Date(year, month + 1, 0).getDate();
    const today = todayCompact();
    let html = `<div class="cal-month"><h3 class="cal-month__title">${MONTH_FR[month]} ${year}</h3><div class="cal-grid">`;
    ['Lu','Ma','Me','Je','Ve','Sa','Di'].forEach(d => { html += `<div class="cal-head">${d}</div>`; });
    for (let i = 0; i < offset; i++) html += '<div></div>';
    for (let d = 1; d <= days; d++) {
      const compact = `${year}${String(month+1).padStart(2,'0')}${String(d).padStart(2,'0')}`;
      const past = compact < today;
      const booked = !past && isBooked(compact);
      let cls = 'cal-cell';
      if (past) cls += ' cal-cell--past';
      else if (booked) cls += ' cal-cell--booked';
      else cls += ' cal-cell--available';
      if (!past && !booked && startDate && compact === startDate) cls += ' cal-cell--start';
      else if (!past && !booked && endDate && compact === endDate) cls += ' cal-cell--end';
      else if (!past && !booked && startDate && endDate && compact > startDate && compact < endDate) cls += ' cal-cell--range';
      html += `<div class="${cls}" data-date="${compact}">${d}</div>`;
    }
    html += '</div></div>';
    return html;
  }

  function render() {
    let months = '';
    for (let i = 0; i < 3; i++) {
      let y = calYear, m = calMonth + i;
      if (m > 11) { m -= 12; y++; }
      months += renderMonth(y, m);
    }
    calEl.innerHTML = `
      <div class="cal-wrapper">
        <div class="cal-nav">
          <button class="cal-nav__btn" id="calPrev" type="button" aria-label="Mois précédents">&#8592;</button>
          <span class="cal-nav__label">${MONTH_FR[calMonth]} ${calYear}</span>
          <button class="cal-nav__btn" id="calNext" type="button" aria-label="Mois suivants">&#8594;</button>
        </div>
        <div class="cal-months">${months}</div>
        <div class="cal-legend">
          <span class="cal-legend__item"><span class="cal-legend__dot cal-legend__dot--available"></span>Disponible</span>
          <span class="cal-legend__item"><span class="cal-legend__dot cal-legend__dot--booked"></span>Réservé</span>
          <span class="cal-legend__item"><span class="cal-legend__dot cal-legend__dot--selected"></span>Vos dates</span>
        </div>
      </div>`;

    document.getElementById('calPrev').addEventListener('click', () => {
      const minYear = now.getFullYear(), minMonth = now.getMonth();
      if (calYear > minYear || (calYear === minYear && calMonth > minMonth)) {
        calMonth--; if (calMonth < 0) { calMonth = 11; calYear--; }
        render();
      }
    });
    document.getElementById('calNext').addEventListener('click', () => {
      calMonth++; if (calMonth > 11) { calMonth = 0; calYear++; }
      render();
    });

    calEl.querySelectorAll('.cal-cell--available').forEach(cell => {
      cell.addEventListener('click', () => {
        const d = cell.dataset.date;
        if (!startDate || (startDate && endDate)) {
          startDate = d; endDate = null;
        } else if (d <= startDate) {
          startDate = d; endDate = null;
        } else if (hasBookedInRange(startDate, d)) {
          startDate = d; endDate = null;
        } else {
          endDate = d;
        }
        if (arrivalInput) arrivalInput.value = startDate ? toISO(startDate) : '';
        if (departureInput) departureInput.value = endDate ? toISO(endDate) : '';
        render();
      });
    });
  }

  fetch('/api/availability')
    .then(r => r.json())
    .then(data => { bookedRanges = (data.events || []).filter(e => e.start && e.end); })
    .catch(() => {})
    .finally(() => render());
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

// Parallaxe hero (compatible ancienne <picture> et nouveau .hero__reel)
(function initParallax() {
  const target = document.querySelector('.hero__reel') || document.querySelector('.hero__media');
  if (!target) return;
  const heroEl = target.closest('.hero');
  window.addEventListener('scroll', () => {
    const sy = window.scrollY;
    if (sy > heroEl.offsetHeight) return;
    target.style.transform = `translateY(${sy * 0.10}px)`;
  }, { passive: true });
})();

// ─── Hero Reel — Ken Burns ──────────────────────────────────────────────────
function initHeroReel() {
  const reel = document.getElementById('heroReel');
  if (!reel) return;
  const slides = Array.from(reel.querySelectorAll('.hero__slide'));
  if (slides.length > 1) {
    const dots = document.createElement('div');
    dots.className = 'hero__dots';
    dots.setAttribute('aria-hidden', 'true');
    slides.forEach((slide, index) => {
      const dot = document.createElement('button');
      dot.className = 'hero__dot' + (index === 0 ? ' is-active' : '');
      dot.type = 'button';
      dot.addEventListener('click', () => showSlide(index));
      dots.appendChild(dot);
    });
    reel.appendChild(dots);

    let current = slides.findIndex((slide) => slide.classList.contains('is-active'));
    if (current < 0) current = 0;
    let timer = window.setInterval(() => showSlide(current + 1), 7600);

    function showSlide(nextIndex) {
      const next = (nextIndex + slides.length) % slides.length;
      slides[current].classList.remove('is-active');
      dots.children[current].classList.remove('is-active');
      slides[next].classList.add('is-active');
      dots.children[next].classList.add('is-active');
      current = next;
      window.clearInterval(timer);
      timer = window.setInterval(() => showSlide(current + 1), 7600);
    }
    return;
  }

  const video = reel.querySelector('video');
  if (!video) return;
  const tryPlay = () => {
    video.play().catch(function() {});
  };
  if (video.readyState >= 2) {
    tryPlay();
  } else {
    video.addEventListener('loadeddata', tryPlay, { once: true });
  }

  const soundBtn = document.getElementById('heroSound');
  if (soundBtn && video) {
    soundBtn.addEventListener('click', function() {
      video.muted = !video.muted;
      soundBtn.classList.toggle('is-unmuted', !video.muted);
      soundBtn.setAttribute('aria-label', video.muted ? 'Activer le son' : 'Couper le son');
      var xLines = soundBtn.querySelectorAll('.sound-x-1, .sound-x-2');
      var wave = soundBtn.querySelector('.sound-wave');
      xLines.forEach(function(el) { el.style.display = video.muted ? '' : 'none'; });
      if (wave) wave.style.display = video.muted ? 'none' : '';
    });
  }
}

// ─── Cookie Consent Banner (RGPD) ──────────────────────────────────────────
(function initCookieBanner() {
  const KEY = 'verdure_cookies';
  if (localStorage.getItem(KEY)) return;

  const bar = document.createElement('div');
  bar.className = 'cookie-bar';
  bar.setAttribute('role', 'region');
  bar.setAttribute('aria-label', 'Consentement aux cookies');
  bar.innerHTML = `
    <p>Nous utilisons des cookies techniques indispensables au fonctionnement du site. Avec votre accord, des cookies analytiques anonymes nous aident à améliorer votre expérience. <a href="/politique-confidentialite">En savoir plus</a>.</p>
    <div class="cookie-bar__actions">
      <button class="btn btn--outline cookie-bar__refuse" type="button">Refuser</button>
      <button class="btn btn--primary cookie-bar__accept" type="button">Accepter</button>
    </div>
  `;
  document.body.appendChild(bar);
  // Slight delay so it doesn't flash immediately on load
  setTimeout(() => bar.classList.add('is-visible'), 900);

  const dismiss = (value) => {
    localStorage.setItem(KEY, value);
    bar.classList.remove('is-visible');
    setTimeout(() => bar.remove(), 500);
  };

  bar.querySelector('.cookie-bar__accept').addEventListener('click', () => dismiss('accepted'));
  bar.querySelector('.cookie-bar__refuse').addEventListener('click', () => dismiss('refused'));
})();

function signDocument(token, client, documentType, acceptedText, docTitle) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'sign-modal-overlay';
    overlay.innerHTML = `
      <div class="sign-modal" role="dialog" aria-modal="true" aria-labelledby="signModalTitle">
        <button class="sign-modal__close" type="button" aria-label="Fermer">×</button>
        <p class="eyebrow">Signature électronique</p>
        <h2 id="signModalTitle">${docTitle}</h2>
        <p class="sign-modal__accepted">${acceptedText}</p>
        <div class="sign-modal__fields">
          <label>Nom et prénom<input type="text" id="signName" value="${client.guestName || ''}" autocomplete="name" required></label>
          <label>Email<input type="email" id="signEmail" value="${client.guestEmail || ''}" autocomplete="email" required></label>
        </div>
        <div class="sign-modal__canvas-wrap">
          <p class="sign-modal__canvas-label">Signez dans l'espace ci-dessous</p>
          <canvas id="signCanvas" width="520" height="160" aria-label="Zone de signature"></canvas>
          <button class="sign-modal__clear" type="button">Effacer</button>
        </div>
        <label class="sign-modal__approve">
          <input type="checkbox" id="signApprove">
          <span>Lu et approuvé — j'accepte le contenu de ce document.</span>
        </label>
        <p class="form__error" id="signError" hidden></p>
        <div class="sign-modal__actions">
          <button class="btn btn--outline" type="button" id="signCancel">Annuler</button>
          <button class="btn btn--primary" type="button" id="signConfirm">Confirmer la signature</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    const canvas = overlay.querySelector('#signCanvas');
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#1a2e1c';
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    let drawing = false;
    let hasSigned = false;
    let lastX = 0, lastY = 0;

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const src = e.touches ? e.touches[0] : e;
      return [(src.clientX - rect.left) * scaleX, (src.clientY - rect.top) * scaleY];
    };
    const start = (e) => { e.preventDefault(); drawing = true; [lastX, lastY] = getPos(e); };
    const move = (e) => {
      if (!drawing) return;
      e.preventDefault();
      const [x, y] = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(x, y);
      ctx.stroke();
      lastX = x; lastY = y;
      hasSigned = true;
    };
    const stop = () => { drawing = false; };
    canvas.addEventListener('mousedown', start);
    canvas.addEventListener('mousemove', move);
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('touchstart', start, { passive: false });
    canvas.addEventListener('touchmove', move, { passive: false });
    canvas.addEventListener('touchend', stop);

    overlay.querySelector('.sign-modal__clear').addEventListener('click', () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      hasSigned = false;
    });

    const close = (result) => {
      document.body.removeChild(overlay);
      resolve(result);
    };

    overlay.querySelector('.sign-modal__close').addEventListener('click', () => close(false));
    overlay.querySelector('#signCancel').addEventListener('click', () => close(false));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(false); });

    overlay.querySelector('#signConfirm').addEventListener('click', async () => {
      const name = overlay.querySelector('#signName').value.trim();
      const email = overlay.querySelector('#signEmail').value.trim();
      const approved = overlay.querySelector('#signApprove').checked;
      const errorEl = overlay.querySelector('#signError');
      errorEl.hidden = true;

      if (!name) { errorEl.textContent = 'Veuillez saisir votre nom.'; errorEl.hidden = false; return; }
      if (!email || !email.includes('@')) { errorEl.textContent = 'Veuillez saisir un email valide.'; errorEl.hidden = false; return; }
      if (!hasSigned) { errorEl.textContent = 'Veuillez signer dans l\'espace prévu.'; errorEl.hidden = false; return; }
      if (!approved) { errorEl.textContent = 'Veuillez cocher la case "Lu et approuvé".'; errorEl.hidden = false; return; }

      const signatureData = canvas.toDataURL('image/png');
      const btn = overlay.querySelector('#signConfirm');
      btn.disabled = true;
      btn.textContent = 'Enregistrement...';

      try {
        const response = await fetch(`/api/client/${token}/sign`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ documentType, signerName: name, signerEmail: email, acceptedText, signatureData }),
        });
        const payload = await response.json();
        if (!response.ok) {
          errorEl.textContent = payload.error || 'Signature impossible.';
          errorEl.hidden = false;
          btn.disabled = false;
          btn.textContent = 'Confirmer la signature';
          return;
        }
        close(true);
      } catch {
        errorEl.textContent = 'Connexion impossible.';
        errorEl.hidden = false;
        btn.disabled = false;
        btn.textContent = 'Confirmer la signature';
      }
    });
  });
}


function initVideoBar() {
  const video = document.getElementById('heroVideo');
  const bar = document.getElementById('videoBar');
  const btnPlay = document.getElementById('vPlayPause');
  const btnBack = document.getElementById('vBack');
  const btnFwd = document.getElementById('vFwd');
  const btnMute = document.getElementById('vMute');
  const volSlider = document.getElementById('vVolume');
  const played = document.getElementById('vPlayed');
  const progress = document.getElementById('vProgress');
  if (!video || !btnPlay) {
    if (bar) bar.hidden = true;
    return;
  }

  // Play / Pause
  btnPlay.addEventListener('click', () => {
    if (video.paused) { video.play(); } else { video.pause(); }
  });
  video.addEventListener('play', () => {
    btnPlay.querySelector('.icon-pause').style.display = '';
    btnPlay.querySelector('.icon-play').style.display = 'none';
    btnPlay.setAttribute('aria-label', 'Pause');
  });
  video.addEventListener('pause', () => {
    btnPlay.querySelector('.icon-pause').style.display = 'none';
    btnPlay.querySelector('.icon-play').style.display = '';
    btnPlay.setAttribute('aria-label', 'Lancer');
  });

  // Seek -10s / +10s
  btnBack.addEventListener('click', () => {
    video.currentTime = Math.max(0, video.currentTime - 10);
  });
  btnFwd.addEventListener('click', () => {
    video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
  });

  // Progress bar update
  video.addEventListener('timeupdate', () => {
    if (video.duration) {
      played.style.width = (video.currentTime / video.duration * 100) + '%';
    }
  });
  // Click on progress bar to seek
  progress.addEventListener('click', (e) => {
    const rect = progress.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    video.currentTime = ratio * (video.duration || 0);
  });

  // Mute toggle — unlock audio context + set volume
  btnMute.addEventListener('click', () => {
    video.muted = !video.muted;
    if (!video.muted) {
      // Forcer le volume à la valeur du slider (>0 pour entendre quelque chose)
      const targetVol = volSlider ? parseFloat(volSlider.value) : 1;
      video.volume = targetVol > 0 ? targetVol : 1;
      if (volSlider && targetVol === 0) { volSlider.value = 1; video.volume = 1; }
      // Relancer la lecture pour débloquer l'audio sur iOS/Safari
      if (video.paused) { video.play().catch(function(){}); }
    }
    updateMuteUI();
  });

  function updateMuteUI() {
    const m = video.muted;
    btnMute.querySelector('.icon-muted').style.display = m ? '' : 'none';
    btnMute.querySelector('.icon-sound').style.display = m ? 'none' : '';
    btnMute.classList.toggle('is-unmuted', !m);
    btnMute.setAttribute('aria-label', m ? 'Activer le son' : 'Couper le son');
  }

  // Volume slider
  if (volSlider) {
    volSlider.addEventListener('input', () => {
      const v = parseFloat(volSlider.value);
      video.volume = v;
      if (v > 0 && video.muted) {
        video.muted = false;
        updateMuteUI();
      } else if (v === 0) {
        video.muted = true;
        updateMuteUI();
      }
    });
  }

  // Init UI state (video starts muted for autoplay)
  updateMuteUI();
}
