let planets = {};
const planetsBlock = document.getElementsByClassName("planets-content-block")[0];
const planetsContainer = document.getElementsByClassName("planets-container")[0];
const planetNavBlock = document.getElementsByClassName('planets-nav-btn')[0];
const request = url => {
    return fetch(url);
}
const getPlanets = () => {
    request("https://swapi.dev/api/planets")
        .then(response => {
            response.json().then(result => {
                planets = {...result};
                renderPlanets();
                planetNavBlock.style.display = 'flex';
            });
        })
}
const renderPlanets = () => {
    planetsBlock.innerText = '';
    planetsContainer.style.display = 'block'
    episodeContainer.style.display = 'none';
    planets.results.forEach(planet => {
        const block = document.createElement('div');

        block.classList.add('planet');
        block.innerText = `Name: ${planet.name}`
        planetsBlock.appendChild(block);
    });
}
const navigation = action => {
    if(planets[action]) {
        request(planets[action])
            .then(response => {
                response.json().then(result => {
                    planets = {...result};
                    renderPlanets();
                });
            })
    }
}

let episode = {};
const characters = [];
const getEpisode = () => {
    request("https://swapi.dev/api/films/2")
        .then(response => {
            response.json().then(result => {
                episode = {...result};
                const promises = episode.characters.map(item => request(item).then(res => {
                    res.json().then(result => {
                        characters.push(result); 
                    })
                }))
                Promise.all(promises).then(renderEpisode);
            });
        })
}
const episodeContainer = document.getElementsByClassName('episode-container')[0];
const renderEpisode = () => {
    episodeContainer.innerText = '';
    episodeContainer.style.display = 'flex';
    planetsContainer.style.display = 'none';
    console.log(characters)
    characters.forEach(character => {
        const block = document.createElement('div');
        block.classList.add('character-block');
        block.innerText = 
        `Name: ${character.name},
        Birth: ${character.birth_year},
        Gender: ${character.gender}`
        episodeContainer.appendChild(block);
    });
}