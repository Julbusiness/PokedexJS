let allPokemon = [];
let tableauFin = [];

const searchInput = document.querySelector(".recherche-poke input");
const listePoke = document.querySelector(".liste-poke");
const chargement = document.querySelector(".loader");

const types = {
	grass: "#78c850",
	ground: "#E2BF65",
	dragon: "#6F35FC",
	fire: "#F58271",
	electric: "#F7D02C",
	fairy: "#D685AD",
	poison: "#966DA3",
	bug: "#B3F594",
	water: "#6390F0",
	normal: "#D9D5D8",
	psychic: "#F95587",
	flying: "#A98FF3",
	fighting: "#C25956",
	rock: "#B6A136",
	ghost: "#735797",
	ice: "#96D9D6",

	normal: "#333",
	steel: "#333",
	dark: "#333",
	unknown: "#333",
	shadow: "#333",
};

/*-------------------------------- Fetch, appel à l'API --------------------------------*/

function fetchPokemonBase() {
	fetch("https://pokeapi.co/api/v2/pokemon?limit=200") // 1118
		.then((reponse) => reponse.json())
		.then((allPoke) => {
			// console.log(allPoke);
			allPoke.results.forEach((pokemon) => {
				fetchPokemonComplet(pokemon);
			});
		});
}

fetchPokemonBase();

function fetchPokemonComplet(pokemon) {
	let objPokemonFull = {};
	let url = pokemon.url;
	let nameP = pokemon.name;

	fetch(url)
		.then((reponse) => reponse.json())
		.then((pokeData) => {
			// console.log(pokeData);
			objPokemonFull.pic = pokeData.sprites.other.dream_world.front_default;

			objPokemonFull.type = pokeData.types;

			objPokemonFull.id = pokeData.id;

			objPokemonFull.stats = pokeData.stats;

			fetch(`https://pokeapi.co/api/v2/pokemon-species/${nameP}`)
				.then((reponse) => reponse.json())
				.then((pokeData) => {
					// console.log(pokeData);
					objPokemonFull.name = pokeData.names[4].name; // mettre les noms des pokemon en FR
					allPokemon.push(objPokemonFull);

					if (allPokemon.length === 200) {
						// console.log(allPokemon); // 1118

						tableauFin = allPokemon
							.sort((a, b) => {
								return a.id - b.id;
							})
							.slice(0, 50);

						// console.log(tableauFin);

						createCard(tableauFin);

						chargement.style.display = "none";
					}
				});
		});
}

/*-------------------------------- Création des cartes --------------------------------*/

function createCard(arr) {
	for (let i = 0; i < arr.length; i++) {
		// Je crée mes balises flipCard en JS
		const divContainer = document.createElement("div");
		divContainer.classList.add("flip-card-container");

		const flipCard = document.createElement("div");
		flipCard.classList.add("flip-card");

		// frontCard
		const frontCard = document.createElement("li");
		frontCard.classList.add("frontCard");

		const txtCarte = document.createElement("h5");
		txtCarte.innerText = arr[i].name;

		const idCarte = document.createElement("p");
		idCarte.innerText = `ID# ${arr[i].id}`;

		const imgCarte = document.createElement("img");
		imgCarte.src = arr[i].pic;

		// backCard

		const backCard = document.createElement("li");
		backCard.classList.add("backCard");

		const typeContainer = document.createElement("div");
		typeContainer.classList.add("type-container");

		const hType = document.createElement("div");
		hType.classList.add("hType");
		hType.innerText = "Types";

		const type = document.createElement("div");
		type.classList.add("type");

		const type1 = document.createElement("a");

		// const type2 = document.createElement("a");

		// ********************************************************************************************* //
		// types dynamique

		//! essai numero 1
		// for (let j = 0; j < arr[j].type.length; j++) {
		// 	if (j < arr.length) {
		// 		// type1.innerText = arr[i].type[0].type.name;
		// 		// type2.innerText = arr[i].type[1].type.name; // a corriger
		// 	} else {
		// 		return alert("Erreur de type de pokemeon");
		// 	}
		// }

		//! essai numero 2
		// for (const prop in arr) {
		// 	// console.log(prop, arr[prop]);
		// }

		//! essai numero 3
		// const arrFromObj = Object.entries(arr[i]);
		// // console.log(arrFromObj);

		// arrFromObj.forEach((el) => {
		// 	el.forEach((prop) => {
		// 		console.log(prop);
		// 	});
		// });

		//! essai numero 4

		const arrFromType = arr.map((obj) => obj.type[0].type.name);
		type1.innerText = arrFromType[i];

		// console.log(arrFromType[i]);

		// ********************************************************************************************* //

		const statsContainer = document.createElement("div");
		statsContainer.classList.add("stats-container");

		const stats = document.createElement("div");
		stats.classList.add("stats");
		stats.innerText = "Statistiques";

		const skillsBar = document.createElement("div");
		skillsBar.classList.add("skills-bar");

		const bar = document.createElement("div");
		bar.classList.add("bar");

		const info = document.createElement("div");
		info.classList.add("info");

		const infoSpanTitre = document.createElement("span");
		const infoSpanStats = document.createElement("span");

		const progressLine = document.createElement("div");
		progressLine.classList.add("progress-line");

		const progressSpan = document.createElement("span");

		// ********************************************************************************************* //

		// stats + progress bar dynamique
		for (let k = 0; k < arr[k].stats.length; k++) {
			if (k < arr.length) {
				infoSpanTitre.innerText = arr[i].stats[0].stat.name;
				infoSpanTitre.classList.add("info-span-titre");
				infoSpanStats.innerText = `${arr[i].stats[0].base_stat}`;
				infoSpanStats.classList.add("info-span-stats");
				progressSpan.style.width = `${arr[i].stats[0].base_stat}%`;
				progressSpan.classList.add("progress-span");
				progressLine.style.content = `${arr[i].stats[0].base_stat}%`;
			} else {
				return alert("erreur sur les progressLine");
			}
		}

		// const arrFromStats = arr.map((obj) => obj.stats[i].stat.name);
		// console.log(arrFromStats);

		// ********************************************************************************************* //

		// couleurs back et front Card
		let couleur = "#fff";
		frontCard.style.background = couleur;
		backCard.style.background = couleur;

		// J'attribue ses nouvelles balises remplis en tant qu'enfant a des balises existantes
		listePoke.appendChild(divContainer);

		divContainer.appendChild(flipCard);

		flipCard.appendChild(frontCard);
		flipCard.appendChild(backCard);

		frontCard.appendChild(imgCarte);
		frontCard.appendChild(txtCarte);
		frontCard.appendChild(idCarte);

		backCard.appendChild(idCarte);
		backCard.appendChild(typeContainer);
		backCard.appendChild(statsContainer);

		typeContainer.appendChild(hType);
		typeContainer.appendChild(type);

		statsContainer.appendChild(stats);
		statsContainer.appendChild(skillsBar);

		type.appendChild(type1);
		// type.appendChild(type2);

		skillsBar.appendChild(bar);

		bar.appendChild(info);
		bar.appendChild(progressLine);

		info.appendChild(infoSpanTitre);
		info.appendChild(infoSpanStats);
		progressLine.appendChild(progressSpan);
	}
}

/*-------------------------------- Scroll Infini --------------------------------*/

window.addEventListener("scroll", () => {
	const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
	// scrollTop = scroll depuis le top
	// scrollHeight = scroll total du site
	// clientHeight = hauteur de la feneytre, partie visible

	// console.log(scrollTop, scrollHeight, clientHeight);

	if (clientHeight + scrollTop >= scrollHeight - 49) {
		addPoke(25);
	}
});

let index = 50; // nombre de pokemon qui s'affiche de base sur la premiere page

function addPoke(nb) {
	if (index > 200) {
		// 1118
		return;
	}
	const arrToAdd = allPokemon.slice(index, index + nb);
	createCard(arrToAdd);
	index += nb;
}

/*-------------------------------- Recherche --------------------------------*/

// Ci dessous le block pour faire fonctionner la recherche avec un bouton.

// const formRecherche = document.querySelector("form");
// formRecherche.addEventListener("submit", (e) => {
// 	e.preventDefault();
// 	recherche();
// });

searchInput.addEventListener("keyup", recherche);

function recherche() {
	if (index < 200) {
		addPoke(130);
	}

	let filter, allLi, titleValue, allTitles;

	filter = searchInput.value.toUpperCase();
	allLi = document.querySelectorAll("li");
	allTitles = document.querySelectorAll("li > h5");

	for (let i = 0; i < allLi.length; i++) {
		titleValue = allTitles[i].innerText;

		if (titleValue.toUpperCase().indexOf(filter) > -1) {
			allLi[i].style.display = "flex";
		} else {
			allLi[i].style.display = "none";
		}
	}
}

/*-------------------------------- Animation input --------------------------------*/

searchInput.addEventListener("input", function (e) {
	if (e.target.value !== "") {
		e.target.parentNode.classList.add("active-input");
	} else if (e.target.value === "") {
		e.target.parentNode.classList.remove("active-input");
	}
});
