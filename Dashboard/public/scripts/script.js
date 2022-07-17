document.querySelector('#spoke').addEventListener('click', getPokemon)
window.addEventListener('DOMContentLoaded', loadTypes)
document.querySelector('#clear-btn').addEventListener('click', (e) => {
    limpiar('.dashboard')
})

function textoToHTML(text){
    let template = document.createElement('template')
    template.innerHTML = text.trim()
    return template.content.firstChild
}

function limpiar(clase){
    let elements = document.querySelector(clase).children
    for(let i in Chart.instances){
        Chart.instances[i].destroy()
    }
    console.log(Chart.instances)
    for(let e of elements){
        e.innerHTML = ''
    }
}


function getPokemon(e){
    let contatiner = document.querySelector('.dashboard').querySelector('.cf1')
    if(contatiner.children.length > 0){
        if(contatiner.children[0].tagName == 'SELECT')
            contatiner.innerHTML = ''
    }
    let pokemon = document.querySelector('#pokemon_name').value
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
        contatiner.appendChild(card)
    }).catch(error => {
        console.log(error)
    })
}

Chart.defaults.font.size = 12;
Chart.defaults.font.weight = 'bold';
Chart.defaults.font.family = 'Arial';


function loadStats(pokemon){
    let cont = document.querySelector('.cf2')
    if(cont.children.length == 0){
        plantilla = `<div>
                        <canvas id ="chart"></canvas>
                    </div>`
        let canva = textoToHTML(plantilla)
        cont.appendChild(canva)
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        .then(response => response.json())
        .then(data => {
            console.log(pokemon)
            let stats = data.stats
            let numeros = []
            for(let s of stats){
                numeros.push(s.base_stat)
            }
            let myChart = document.getElementById(`chart`).getContext('2d')
                let chartmass = new Chart(myChart, {
                    type: 'bar',
                    data:{
                        labels:['HP', 'ATACK', 'DEFENSE', 'SPECIAL ATTACK', 'SPECIAL DEFENSE', 'SPEED'],
                        datasets:[{
                            label: `${pokemon}' Points`,
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
                            text: `Stats`,
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
    } else {
        fetch("https://pokeapi.co/api/v2/pokemon/" + pokemon)
        .then(response => response.json())
        .then(data => {
            console.log(pokemon)
            let stats = data.stats
            let numeros = []
            for(let s of stats){
                numeros.push(s.base_stat)
            }
            let myChart = document.getElementById(`chart`).getContext('2d')
            let newData = {
                label: `${pokemon}' Points`,
                data: numeros,
                backgroundColor: '#' + Math.floor(Math.random()*16777215).toString(16)
            }
            console.log(Chart.instances)
            for(let i in Chart.instances){
                Chart.instances[i].data.datasets.push(newData)
                Chart.instances[i].update()
            }
        }).catch(error => {
            console.log(error)
        })
    }
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
      select.addEventListener('change', (ev) => {
        loadPokemonType(ev.target.value)
      })
    }).catch(error => {
        console.log(error)
    })   
}

function loadPokemonType(type){
    let plantilla = `
        <select
        class="form-select"
        aria-label="Default select example"
        id="select-pokemon"
        >
            <option value="intruction" disabled selected>
                Seleccione un Pokemon de tipo ${type}
            </option>
        </select>
    `
    document.querySelector('.cf1').innerHTML = plantilla
    document.querySelector('.cf2').innerHTML = ''
    let select = document.querySelector('#select-pokemon')
    select.addEventListener('change', (e) => {
        loadStats(e.target.value)
    })
    fetch("https://pokeapi.co/api/v2/type/" + type)
    .then(response => response.json())
    .then(data => {
      let pokemones = data.pokemon
      for(let p of pokemones){
        let opt = `<option value="${p.pokemon.name}">${p.pokemon.name}</option>`
        select.innerHTML += opt
      }
      displayPokemons(pokemones, type)
    }).catch(error => {
        console.log(error)
    })   
}


let displayPokemons = (pokemons, type) => {
    let names = []
    for(let p of pokemons){
        names.push(p.pokemon.name)
    }
    let nums = []
    let fetches = []
    for(let n of names){
        fetches.push(
            fetch("https://pokeapi.co/api/v2/pokemon/" + n)
            .then(response => response.json())
            .then(data => {
                nums.push(data.weight)
            }).catch(error => {
                console.log(error)
            })
        )
    }
    console.log(nums)
    plantilla = `<div>
                    <canvas id ="pokemonschart"></canvas>
                </div>
                `
    document.querySelector('.cf2').appendChild(textoToHTML(plantilla))
    Promise.all(fetches).then(function(){

        let myChart = document.getElementById(`pokemonschart`).getContext('2d')
        let chartmass = new Chart(myChart, {
            type: 'bar',
            data:{
                labels: names.slice(0,10),
                datasets:[{
                    label: 'weight',
                    data: nums.slice(0,10),
                    backgroundColor: '#851e1e'
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                      display: true,
                      text: `Weights`,
                      font: {
                        size: 25
                      }
                    }
                }
            },
            yAxes: [{
                ticks: {
                    min: 0,
                    max: 100,
                    stepSize: 10
                }
            }]
        })
    })
    console.log(nums)
}

