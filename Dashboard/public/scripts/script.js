document.querySelector('#spoke').addEventListener('click', getPokemon)
window.addEventListener('DOMContentLoaded', loadTypes)

function textoToHTML(text){
    let template = document.createElement('template')
    template.innerHTML = text.trim()
    return template.content.firstChild
}


function getPokemon(e){
    let pokemon = document.querySelector('#pokemon_name').value
    console.log(pokemon)
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
    .then(response => response.json())
    .then(data => {
        let name = pokemon.charAt(0).toUpperCase() + pokemon.slice(1)
        let url = data.sprites.other['official-artwork'].front_default
        console.log(url)
        let pCard = `
            <div class="card" style="width: 18rem;">
                <h1 class="card-title">${name}</h1>
                <img src="${url}" class="card-img-top" alt="${name}">
                <button class="btn btn-outline-dark" id="stats-btn${pokemon}" type="button">
                    Mostrar Estadisticas
                </button>
            </div>
        `

        let card = textoToHTML(pCard)

        card.addEventListener('click', (ev) => {
            console.log(ev.target)
            if(ev.target.id == `stats-btn${pokemon}`)
                loadStats(pokemon)
        })

        document.querySelector('.dashboard').querySelector('.cf1').appendChild(card)
    }).catch(error => {
        console.log(error)
    })
}

Chart.defaults.font.size = 12;
Chart.defaults.font.weight = 'bold';
Chart.defaults.font.family = 'Arial';


function loadStats(pokemon){
        plantilla = `<div><canvas id ="${pokemon}chart"></canvas></div>`
        let canva = textoToHTML(plantilla)
        document.querySelector('.cf2').appendChild(canva)
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        .then(response => response.json())
        .then(data => {
            console.log(pokemon)
            let stats = data.stats
            let numeros = []
            for(let s of stats){
                numeros.push(s.base_stat)
            }
            let myChart = document.getElementById(`${pokemon}chart`).getContext('2d')
            let chartmass = new Chart(myChart, {
                type: 'bar',
                data:{
                    labels:['HP', 'ATACK', 'DEFENSE', 'SPECIAL ATTACK', 'SPECIAL DEFENSE', 'SPEED'],
                    datasets:[{
                        label: `${pokemon}'s Stats`,
                        data: numeros,
                        backgroundColor: '#851e1e'
                    }],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                          display: true,
                          text: `${pokemon}'s Stats`,
                          font: {
                            size: 25
                          }
                        }
                    }
                }
            })
        }).catch(error => {
            console.log(error)
        })
}




function loadTypes(e){
    fetch("https://pokeapi.co/api/v2/type")
    .then(response => response.json())
    .then(data => {
      let tipos = data.results
      let select = document.querySelector('#select-type')
      for(let t of tipos){
        let opt = `<option value="${t.name}">${t.name}</option>`
        select.innerHTML += opt
      }  
    }).catch(error => {
        console.log(error)
    })   
}

function loadPokemonType(type){
    fetch("https://pokeapi.co/api/v2/type/" + type)
    .then(response => response.json())
    .then(data => {
      let tipos = data.results
      let select = document.querySelector('#select-type')
      for(let t of tipos){
        let opt = `<option value="${t.name}">${t.name}</option>`
        select.innerHTML += opt
      }  
    }).catch(error => {
        console.log(error)
    })   
}