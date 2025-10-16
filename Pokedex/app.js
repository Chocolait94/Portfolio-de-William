//  Pokémon Pokedex App
let apiLink = "https://pokebuildapi.fr/api/v1/pokemon";

//  Sélectionner l'élément pokedex
const pokedex = document.getElementById("pokedex");

//  Créer un bouton de retour
const backButton = document.createElement("button");
backButton.textContent = "← Retour";
backButton.style.display = "none"; // Masquer le bouton de retour par défaut
backButton.classList.add("back-button");
document.body.appendChild(backButton);

// Utiliser Fetch pour récupérer les données
fetch(apiLink)
    .then(res => res.json())
    .then(data => {
        console.log('Données récupérées:', data); // Log des données récupérées

        // Boucler à travers chaque Pokémon
        data.forEach((pokemon, index) => {
            // Création des éléments HTML
            let wrapper = document.createElement("div");
            let h2 = document.createElement("h2");
            let p = document.createElement("p");
            let img = document.createElement("img");
            let statsWrapper = document.createElement("div");
            let type = document.createElement("p");
            let description = document.createElement("p");
            let resistances = document.createElement("div");
            let evolutions = document.createElement("div");

            // Ajouter des classes pour le style
            wrapper.classList.add("pokemon-wrapper");
            img.classList.add("pokemon-img");
            statsWrapper.classList.add("stats-wrapper");
            statsWrapper.style.display = "none"; // Masquer les stats par défaut
            resistances.classList.add("resistances-wrapper");
            resistances.style.display = "none"; // Masquer les résistances par défaut
            evolutions.classList.add("evolutions-wrapper");
            evolutions.style.display = "none"; // Masquer les évolutions par défaut
            description.classList.add("description");
            description.style.display = "none"; // Masquer la description par défaut

            // Ajouter le contenu
            h2.textContent = pokemon.name;
            p.textContent = `ID: ${pokemon.id}`;
            img.src = pokemon.image;
            type.textContent = `Type: ${pokemon.apiTypes.map(t => t.name).join(", ")}`;

            // Ajouter les stats
            let stats = `
                <p>HP: ${pokemon.stats.HP}</p>
                <p>Attack: ${pokemon.stats.attack}</p>
                <p>Defense: ${pokemon.stats.defense}</p>
                <p>Special Attack: ${pokemon.stats.special_attack}</p>
                <p>Special Defense: ${pokemon.stats.special_defense}</p>
                <p>Speed: ${pokemon.stats.speed}</p>
            `;
            statsWrapper.innerHTML = stats;

            // Ajouter les résistances
            let resistancesContent = '<h3>Resistances:</h3>';
            pokemon.apiResistances.forEach(resistance => {
                resistancesContent += `<p>${resistance.name}: ${resistance.damage_relation} (${resistance.damage_multiplier}x)</p>`;
            });
            resistances.innerHTML = resistancesContent;

            // Ajouter les évolutions
            let evolutionsContent = '<h3>Evolutions:</h3>';
            if (pokemon.apiEvolutions.length > 0) {
                pokemon.apiEvolutions.forEach(evolution => {
                    evolutionsContent += `<p>${evolution.name} (ID: ${evolution.pokedexId})</p>`;
                });
            } else {
                evolutionsContent += '<p>Aucune évolution</p>';
            }
            evolutions.innerHTML = evolutionsContent;

            // Ajouter les éléments au wrapper
            wrapper.appendChild(h2);
            wrapper.appendChild(img);
            wrapper.appendChild(type);
            wrapper.appendChild(p);
            wrapper.appendChild(statsWrapper);
            wrapper.appendChild(resistances);
            wrapper.appendChild(evolutions);

            // Vérifier si la description existe avant de l'ajouter
            if (pokemon.description) {
                description.textContent = `Description: ${pokemon.description}`;
                wrapper.appendChild(description);
            }

            // Ajouter le wrapper au pokedex
            pokedex.appendChild(wrapper);

            // Ajouter un événement de clic pour afficher/masquer les stats
            wrapper.addEventListener("click", () => {
                // Masquer tous les autres wrappers
                document.querySelectorAll('.pokemon-wrapper').forEach(w => {
                    if (w !== wrapper) {
                        w.style.display = 'none';
                    }
                });

                // Afficher les stats, résistances, évolutions et description du Pokémon cliqué
                statsWrapper.style.display = 'block';
                resistances.style.display = 'block';
                evolutions.style.display = 'block';
                if (description) {
                    description.style.display = 'block';
                }

                // Afficher le bouton de retour
                backButton.style.display = 'block';

                // Ajouter une classe pour étaler les informations en largeur
                wrapper.classList.add("expanded");
            });
        });
    })
    .catch(error => console.error('Erreur:', error));

// Ajouter un événement de clic au bouton de retour
backButton.addEventListener("click", () => {
    // Réafficher tous les wrappers
    document.querySelectorAll('.pokemon-wrapper').forEach(w => {
        w.style.display = 'block';
        w.querySelector('.stats-wrapper').style.display = 'none';
        w.querySelector('.resistances-wrapper').style.display = 'none';
        w.querySelector('.evolutions-wrapper').style.display = 'none';
        if (w.querySelector('.description')) {
            w.querySelector('.description').style.display = 'none';
        }
        w.classList.remove("expanded");
    });

    // Masquer le bouton de retour
    backButton.style.display = 'none';
});