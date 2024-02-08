var myPresentation = function() {
  var wrapper = null;
  var defClass = null;
  var slides = null;
  var slidesNum = null;
  var nextButton = document.createElement('a');
  var prevButton = document.createElement('a');
  var currentSlide = parseInt(window.location.hash.replace('#', '') || 0);

  function config(_params) {
    var params = _params || {};
    wrapper = params.wrapper || document.getElementById('slideShow');
    slides = params.slides || wrapper.getElementsByClassName('slide');
    slidesNum = slides.length;
    defClass = params.defClass || 'slide';    
  }

  function init() {
    if (!wrapper) {
      config();
    }
    document.body.appendChild(nextButton);
    document.body.appendChild(prevButton);
    nextButton.className = 'next nav-button';
    prevButton.className = 'prev nav-button';

    cb_addEventListener(nextButton, 'click', goNext);
    cb_addEventListener(prevButton, 'click', goBack);
    cb_addEventListener(document, 'keyup', keyUpEv);
    showSlide(currentSlide);
    checkButtons();
    adjustForSmallScreens(); // Nouvelle fonction pour les écrans plus petits
  }

  function goNext() {
    if (slides[currentSlide + 1]) {
      ++currentSlide;
      step();
    }    
  }

  function goBack() {
    if (slides[currentSlide - 1]) {
      --currentSlide;
      step();
    }    
  }

  function step() {  
    showSlide(currentSlide);
    window.location.hash = currentSlide;
    checkButtons();   
    return false;
  }

  function checkButtons() {    
    if (currentSlide === 0) {
      prevButton.className += ' hidden';
    }
    else if (currentSlide === slidesNum - 1) {
      nextButton.className += ' hidden';
    }
    else {
      nextButton.className = nextButton.className.replace(' hidden', '');
      prevButton.className = prevButton.className.replace(' hidden', '');
    }
  }

  function keyUpEv(event) {
    if (event.keyCode === 37) {
      goBack();
    }
    else if (event.keyCode === 39) {
      goNext();
    }
  }

  function showSlide(step) {
    var i = slidesNum;
    if (-1 < step && step < i) {
      while(i--) {
        slides[i].className = defClass;
      }
      slides[step].className += ' current';

      if (step > 0) {
        slides[step-1].className += ' prev';
      }
      if (step + 1 < slidesNum) {
        slides[step+1].className += ' next';
      }     
    }
    else {
      return false;
    }
  }

  // Fonction pour ajuster la présentation pour les petits écrans
  function adjustForSmallScreens() {
    if (window.innerWidth < 750) {
      wrapper.style.width = '90%'; // Réduire la largeur du conteneur des diapositives
      wrapper.style.left = '5%'; // Centrer le conteneur
      nextButton.style.display = 'none'; // Masquer les boutons de navigation pour les écrans étroits
      prevButton.style.display = 'none';
    }
  }

  return {
    config: config,
    init: init
  };
}();

// Reste du code inchangé

/**
* Cross-browser Event Listener
**/

function cb_addEventListener(obj, evt, fnc) {
  if (obj && obj.addEventListener) {
      obj.addEventListener(evt, fnc, false);
      return true;
  } 
  else if (obj && obj.attachEvent) {
      return obj.attachEvent('on' + evt, fnc);
  }
  return false;
};

myPresentation.config({
  wrapper: document.getElementById('slideShow')
});
myPresentation.init();


// ADAPTER AU PETIT ECRAN 

