

// Attend que l'ensemble de la page soit entièrement chargé
window.addEventListener('load', function() {
	
	// Utilise setTimeout pour simuler le délai d'un chargement de page réel
	setTimeout(lazyLoad, 1000);
	
});

function lazyLoad() {
	// Sélectionne toutes les images de type "card-image"
	var card_images = document.querySelectorAll('.card-image');
	
	// Parcours chaque image de type "card-image"
	card_images.forEach(function(card_image) {
		// Obtient l'URL de l'image haute résolution depuis l'attribut "data-image-full"
		var image_url = card_image.getAttribute('data-image-full');
		// Sélectionne l'élément image contenu à l'intérieur de la "card-image"
		var content_image = card_image.querySelector('img');
		
		// Modifie l'attribut "src" de l'image pour charger la nouvelle image haute résolution
		content_image.src = image_url;
		
		// Écoute l'événement "load" lorsque la nouvelle image est complètement chargée
		content_image.addEventListener('load', function() {
			// Remplace l'image de fond visible par la nouvelle image entièrement téléchargée
			card_image.style.backgroundImage = 'url(' + image_url + ')';
			// Ajoute une classe pour supprimer le filtre de flou et effectuer une transition fluide du changement d'image
			card_image.className = card_image.className + ' is-loaded';
		});
		
	});
	
}
