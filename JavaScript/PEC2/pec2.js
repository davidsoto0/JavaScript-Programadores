const fetch = require("node-fetch");

class Movie {
    constructor(name, characters) {
        this.name = name;
        this.characters = characters;
    }

    //Obtenemos todods los personajes de esta película
    async getCharacters() {
        return await Promise.all(this.characters.map(getCharacterName));
    }

    //Obtenemos todos los planetas donde han nacido los personajes de esta pelicula
    async getHomeworlds() {
        return await Promise.all(this.characters.map(getNameOfPlanetForPerson));
    }

    //Obtenemos todos los planetas donde han nacido los personajes de esta pelicula
    //Ordenadas alfabeticamente al contrario
    async getHomeworldsReverse() {
        var planetas = await this.getHomeworlds();
        planetas.sort();
        return planetas.reverse();
    }
}

async function getMovieCount() {
    try {
        let response = await fetch("https://www.swapi.tech/api/films/");
        let data = await response.json();
        return data.results.length;
    }
    catch (err) {
        return 'fetch failed' + err;
    }
}

async function listMovies() {
    var peliculas = [];
    try {
        let response = await fetch("https://www.swapi.tech/api/films/");
        let data = await response.json();
        for (var i = 0; i < data.results.length; i++) {
            var film = new Object();
            film['name'] = data.results[i].properties.title;
            film['director'] = data.results[i].properties.director;
            film['release'] = data.results[i].properties.release_date;
            film['episodeID'] = data.results[i].properties.episode_id;
            peliculas.push(film);
        }
        return peliculas;
    }
    catch (err) {
        return 'fetch failed' + err;
    }
}

async function listMoviesSorted() {
    var peliculas = await listMovies()
    peliculas.sort(function (a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });
    return peliculas
}

async function listEvenMoviesSorted() {
    //Obtenemos todas las peliculas de la función anterior.
    var peliculas = await listMovies();

    //Obtenemos las peliculas con ID par
    peliculas = peliculas.filter(function (x) {
        return x.episodeID % 2 === 0;
    })

    //Ordenamos de menor a mayor segun su ID
    peliculas.sort(function (a, b) {
        if (a.episodeID > b.episodeID) {
            return 1;
        }
        if (a.episodeID < b.episodeID) {
            return -1;
        }
        return 0;
    });
    return peliculas;

}

async function getMovieInfo(id) {

    try {
        let response = await fetch('https://www.swapi.tech/api/films/' + id.toString());
        let data = await response.json();
        var film = new Object();
        film['name'] = data.result.properties.title;
        film['episodeID'] = data.result.properties.episode_id;
        film['characters'] = data.result.properties.characters;
        return film;
    }
    catch (err) {
        return 'fetch failed' + err;
    }
}

//De una Url devielve el nombre del personaje
async function getCharacterName(url) {
    // Necesario para los siguientes apartados.
    url = url.replace('http://', 'https://');
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data.result.properties.name;
    }
    catch (err) {
        return 'fetch failed' + err;
    }
}

//De una Url devielve el nombre del planeta del personaje
async function getNameOfPlanetForPerson(url) {

    url = url.replace('http://', 'https://');
    try {
        let response = await fetch(url);
        let data = await response.json();
        let namePlanet = await getCharacterName(data.result.properties.homeworld);
        return namePlanet;
    }
    catch (err) {
        return 'fetch failed' + err;
    }
}

//Devuelve los personajes que contiene la película
async function getMovieCharacters(id) {

    var peliculas = await getMovieInfo(id);
    peliculas.characters = await Promise.all(peliculas.characters.map(getCharacterName));

    return peliculas;
    /*
    for (var i = 0; i < peliculas.characters.length; i++) {
        peliculas.characters[i] = await getCharacterName(peliculas.characters[i]);
    }
    */

}

async function getMovieCharactersAndHomeworlds(id) {
    var peliculas = await getMovieInfo(id);

    var nombres = await Promise.all(peliculas.characters.map(getCharacterName));
    var planetas = await Promise.all(peliculas.characters.map(getNameOfPlanetForPerson));

    for (var i = 0; i < peliculas.characters.length; i++) {
        var film = new Object();
        film['name'] = nombres[i];
        film['homeworld'] = planetas[i];
        peliculas.characters[i] = film;
    }
    return peliculas;
}

async function createMovie(id) {
    const movie = await getMovieInfo(id);
    //const peli = new Movie(movie.name, movie.characters);
    //console.log(await peli.getCharacters());
    //console.log(await peli.getHomeworlds());
    //console.log(await peli.getHomeworldsReverse());
    return new Movie(movie.name, movie.characters);
}

module.exports = {
    getMovieCount,
    listMovies,
    listMoviesSorted,
    listEvenMoviesSorted,
    getMovieInfo,
    getCharacterName,
    getMovieCharacters,
    getNameOfPlanetForPerson,
    getMovieCharactersAndHomeworlds,
    createMovie,
    Movie,
}

/*
getMovieCount()
    .then(data => console.log(data));


listMovies()
    .then(data => console.log(data));


listMoviesSorted()
    .then(data => console.log(data));

listEvenMoviesSorted()
    .then(data => console.log(data));

getMovieInfo(1)
    .then(data => console.log(data));

getCharacterName('https://www.swapi.tech/api/people/1')
    .then(data => console.log(data));

getMovieCharacters(1)
    .then(data => console.log(data));

getNameOfPlanetForPerson('https://www.swapi.tech/api/people/1')
    .then(data => console.log(data));

getMovieCharactersAndHomeworlds(1)
    .then(data => console.log(data));

createMovie(1)
    .then(data => console.log(data));
*/
