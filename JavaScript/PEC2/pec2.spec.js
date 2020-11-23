const pec2 = require('./pec2');

const Movie = {
    name: 'A New Hope',
    characters: [
        'https://www.swapi.tech/api/people/1',
        'https://www.swapi.tech/api/people/2',
        'https://www.swapi.tech/api/people/3',
        'https://www.swapi.tech/api/people/4',
        'https://www.swapi.tech/api/people/5',
        'https://www.swapi.tech/api/people/6',
        'https://www.swapi.tech/api/people/7',
        'https://www.swapi.tech/api/people/8',
        'https://www.swapi.tech/api/people/9',
        'https://www.swapi.tech/api/people/10',
        'https://www.swapi.tech/api/people/12',
        'https://www.swapi.tech/api/people/13',
        'https://www.swapi.tech/api/people/14',
        'https://www.swapi.tech/api/people/15',
        'https://www.swapi.tech/api/people/16',
        'https://www.swapi.tech/api/people/18',
        'https://www.swapi.tech/api/people/19',
        'https://www.swapi.tech/api/people/81'
    ]
}

describe('Número de películas en el servidor', () => {
    test('1-Num pelis', async () => {
        const actual = await pec2.getMovieCount();
        expect(actual).toEqual(6);
    })

})

describe('Lista de objetos Film ', () => {
    test('2-Lista de pelis', async () => {
        const actual = await pec2.listMovies();
        expect(actual).toEqual(expect.arrayContaining(
            [
                {
                    name: 'A New Hope',
                    director: 'George Lucas',
                    release: '1977-05-25',
                    episodeID: 4
                },
                {
                    name: 'The Empire Strikes Back',
                    director: 'Irvin Kershner',
                    release: '1980-05-17',
                    episodeID: 5
                },
                {
                    name: 'Return of the Jedi',
                    director: 'Richard Marquand',
                    release: '1983-05-25',
                    episodeID: 6
                },
                {
                    name: 'The Phantom Menace',
                    director: 'George Lucas',
                    release: '1999-05-19',
                    episodeID: 1
                },
                {
                    name: 'Attack of the Clones',
                    director: 'George Lucas',
                    release: '2002-05-16',
                    episodeID: 2
                },
                {
                    name: 'Revenge of the Sith',
                    director: 'George Lucas',
                    release: '2005-05-19',
                    episodeID: 3
                }
            ]
        ));
    })

})

describe('Títulos de las películas ordenados alfabéticamente junto con director, fecha e Id', () => {
    test('3-Datos de pelis', async () => {
        const actual = await pec2.listMoviesSorted();
        expect(actual).toEqual(expect.arrayContaining(
            [
                {
                    name: 'A New Hope',
                    director: 'George Lucas',
                    release: '1977-05-25',
                    episodeID: 4
                },
                {
                    name: 'Attack of the Clones',
                    director: 'George Lucas',
                    release: '2002-05-16',
                    episodeID: 2
                },
                {
                    name: 'Return of the Jedi',
                    director: 'Richard Marquand',
                    release: '1983-05-25',
                    episodeID: 6
                },
                {
                    name: 'Revenge of the Sith',
                    director: 'George Lucas',
                    release: '2005-05-19',
                    episodeID: 3
                },
                {
                    name: 'The Empire Strikes Back',
                    director: 'Irvin Kershner',
                    release: '1980-05-17',
                    episodeID: 5
                },
                {
                    name: 'The Phantom Menace',
                    director: 'George Lucas',
                    release: '1999-05-19',
                    episodeID: 1
                }
            ]
        ));
    })

})

describe('Sólo se deben devolver los episodios pares.', () => {
    test('4-Episodios pares', async () => {
        const actual = await pec2.listEvenMoviesSorted();
        expect(actual).toEqual(expect.arrayContaining(
            [
                {
                    name: 'Attack of the Clones',
                    director: 'George Lucas',
                    release: '2002-05-16',
                    episodeID: 2
                },
                {
                    name: 'A New Hope',
                    director: 'George Lucas',
                    release: '1977-05-25',
                    episodeID: 4
                },
                {
                    name: 'Return of the Jedi',
                    director: 'Richard Marquand',
                    release: '1983-05-25',
                    episodeID: 6
                }
            ]
        ));
    })
})

describe('Información de la película.', () => {
    test('5-More info', async () => {
        const actual = await pec2.getMovieInfo(1);
        expect(actual).toEqual(
            {
                name: 'A New Hope',
                episodeID: 4,
                characters: [
                    'https://www.swapi.tech/api/people/1',
                    'https://www.swapi.tech/api/people/2',
                    'https://www.swapi.tech/api/people/3',
                    'https://www.swapi.tech/api/people/4',
                    'https://www.swapi.tech/api/people/5',
                    'https://www.swapi.tech/api/people/6',
                    'https://www.swapi.tech/api/people/7',
                    'https://www.swapi.tech/api/people/8',
                    'https://www.swapi.tech/api/people/9',
                    'https://www.swapi.tech/api/people/10',
                    'https://www.swapi.tech/api/people/12',
                    'https://www.swapi.tech/api/people/13',
                    'https://www.swapi.tech/api/people/14',
                    'https://www.swapi.tech/api/people/15',
                    'https://www.swapi.tech/api/people/16',
                    'https://www.swapi.tech/api/people/18',
                    'https://www.swapi.tech/api/people/19',
                    'https://www.swapi.tech/api/people/81'
                ]
            }
        );
    })
})

describe('Nombre del personaje.', () => {
    test('6-Nombre de un personaje en concreto', async () => {
        const actual = await pec2.getCharacterName('https://www.swapi.tech/api/people/1');
        expect(actual).toEqual('Luke Skywalker');
    })
})

describe('Información de la película con nombres de los personajes.', () => {
    test('7-More info con nombre de los personajes', async () => {
        jest.setTimeout(10000);
        const actual = await pec2.getMovieCharacters(1);
        expect(actual).toEqual(
            {
                name: 'A New Hope',
                episodeID: 4,
                characters: [
                    'Luke Skywalker', 'C-3PO',
                    'R2-D2', 'Darth Vader',
                    'Leia Organa', 'Owen Lars',
                    'Beru Whitesun lars', 'R5-D4',
                    'Biggs Darklighter', 'Obi-Wan Kenobi',
                    'Wilhuff Tarkin', 'Chewbacca',
                    'Han Solo', 'Greedo',
                    'Jabba Desilijic Tiure', 'Wedge Antilles',
                    'Jek Tono Porkins', 'Raymus Antilles'
                ]
            }
        );
    })
})

describe('Nombre del planeta.', () => {
    test('8-Nombre de un planeta en concreto', async () => {
        const actual = await pec2.getNameOfPlanetForPerson('https://www.swapi.tech/api/people/1');
        expect(actual).toEqual('Tatooine');
    })
})

describe('Información de la película con nombres de los personajes y su lugar de nadimiento.', () => {
    test('9-More info con nombre de los personajes y planeta de nacimiento', async () => {
        jest.setTimeout(32000);
        const actual = await pec2.getMovieCharactersAndHomeworlds(1);
        expect(actual).toEqual(
            {
                name: 'A New Hope',
                episodeID: 4,
                characters: [
                    { name: 'Luke Skywalker', homeworld: 'Tatooine' },
                    { name: 'C-3PO', homeworld: 'Tatooine' },
                    { name: 'R2-D2', homeworld: 'Naboo' },
                    { name: 'Darth Vader', homeworld: 'Tatooine' },
                    { name: 'Leia Organa', homeworld: 'Alderaan' },
                    { name: 'Owen Lars', homeworld: 'Tatooine' },
                    { name: 'Beru Whitesun lars', homeworld: 'Tatooine' },
                    { name: 'R5-D4', homeworld: 'Tatooine' },
                    { name: 'Biggs Darklighter', homeworld: 'Tatooine' },
                    { name: 'Obi-Wan Kenobi', homeworld: 'Stewjon' },
                    { name: 'Wilhuff Tarkin', homeworld: 'Eriadu' },
                    { name: 'Chewbacca', homeworld: 'Kashyyyk' },
                    { name: 'Han Solo', homeworld: 'Corellia' },
                    { name: 'Greedo', homeworld: 'Rodia' },
                    { name: 'Jabba Desilijic Tiure', homeworld: 'Nal Hutta' },
                    { name: 'Wedge Antilles', homeworld: 'Corellia' },
                    { name: 'Jek Tono Porkins', homeworld: 'Bestine IV' },
                    { name: 'Raymus Antilles', homeworld: 'Alderaan' }
                ]
            }
        );
    })
})

describe('Creación de una película.', () => {
    test('10- Creación de una película', async () => {
        const actual = await pec2.createMovie(1);
        expect(actual).toEqual(Movie);
    })
})

describe('Nombre de los personajes que salen en la peícula.', () => {
    test('11- Nombre de los personajes de una película', async () => {
        jest.setTimeout(10000);
        const actual = await pec2.createMovie(1);

        expect(await actual.getCharacters()).toEqual(expect.arrayContaining(
            [
                'Luke Skywalker', 'C-3PO',
                'R2-D2', 'Darth Vader',
                'Leia Organa', 'Owen Lars',
                'Beru Whitesun lars', 'R5-D4',
                'Biggs Darklighter', 'Obi-Wan Kenobi',
                'Wilhuff Tarkin', 'Chewbacca',
                'Han Solo', 'Greedo',
                'Jabba Desilijic Tiure', 'Wedge Antilles',
                'Jek Tono Porkins', 'Raymus Antilles'
            ]
        ));
    })
})

describe('Nombre de los planetas de los personajes que salen en la peícula.', () => {
    test('12- Nombre de los planetas de los personajes de una pelíicula', async () => {
        jest.setTimeout(25000);
        const actual = await pec2.createMovie(1);
        expect(await actual.getHomeworlds()).toEqual(expect.arrayContaining(
            [
                'Tatooine', 'Tatooine',
                'Naboo', 'Tatooine',
                'Alderaan', 'Tatooine',
                'Tatooine', 'Tatooine',
                'Tatooine', 'Stewjon',
                'Eriadu', 'Kashyyyk',
                'Corellia', 'Rodia',
                'Nal Hutta', 'Corellia',
                'Bestine IV', 'Alderaan'
            ]
        ));
    })
})

describe('Nombre de los planetas de los personajes que salen en la peícula ordenados del reves.', () => {
    test('13- Nombre de los planetas de los personajes de una pelíicula ordenados del reves.', async () => {
        jest.setTimeout(25000);
        const actual = await pec2.createMovie(1);
        expect(await actual.getHomeworldsReverse()).toEqual(expect.arrayContaining(
            [
                'Tatooine', 'Tatooine',
                'Tatooine', 'Tatooine',
                'Tatooine', 'Tatooine',
                'Tatooine', 'Stewjon',
                'Rodia', 'Nal Hutta',
                'Naboo', 'Kashyyyk',
                'Eriadu', 'Corellia',
                'Corellia', 'Bestine IV',
                'Alderaan', 'Alderaan'
            ]
        ));
    })
})


