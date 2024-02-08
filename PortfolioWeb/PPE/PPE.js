// Efface la console du navigateur pour la garder propre.
console.clear();

// Sélectionne des éléments HTML.
const cardsContainer = document.querySelector(".cards");
const cardsContainerInner = document.querySelector(".cards__inner");
const cards = Array.from(document.querySelectorAll(".card"));
const overlay = document.querySelector(".overlay");

// Applique un masque de superposition en fonction de la position de la souris.
const applyOverlayMask = (e) => {
  const overlayEl = e.currentTarget;
  const x = e.pageX - cardsContainer.offsetLeft;
  const y = e.pageY - cardsContainer.offsetTop;

  overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
};

// Crée un élément "cta" (call to action) pour chaque carte.
const createOverlayCta = (overlayCard, ctaEl) => {
  const overlayCta = document.createElement("div");
  overlayCta.classList.add("cta");
  overlayCta.textContent = ctaEl.textContent;
  overlayCta.setAttribute("aria-hidden", true);
  overlayCard.append(overlayCta);
};

// Observe les changements de taille des cartes et ajuste la superposition en conséquence.
const observer = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const cardIndex = cards.indexOf(entry.target);
    let width = entry.borderBoxSize[0].inlineSize;
    let height = entry.borderBoxSize[0].blockSize;

    if (cardIndex >= 0) {
      overlay.children[cardIndex].style.width = `${width}px`;
      overlay.children[cardIndex].style.height = `${height}px`;
    }
  });
});

// Initialise chaque superposition de carte.
const initOverlayCard = (cardEl) => {
  const overlayCard = document.createElement("div");
  overlayCard.classList.add("card");
  createOverlayCta(overlayCard, cardEl.lastElementChild);
  overlay.append(overlayCard);
  observer.observe(cardEl);
};

cards.forEach(initOverlayCard);

// Applique le masque de superposition en fonction du mouvement de la souris.
document.body.addEventListener("pointermove", applyOverlayMask);

// jQuery pour gérer les éléments de la barre de navigation.
(function($){
    // Variables
    elementWidth = $('ul').width(),
    containerWidth = $('nav').width(),
    difference = elementWidth - containerWidth,
    finalWidth = difference * 1.5,
    element = $('ul');
    
    // Active un élément de la liste au clic.
    $('li').on('click', function(){
      $('li').removeClass('active');
      $(this).addClass('active');
    });
    
})(jQuery);
