const pokemonName = document.querySelector('.pokemon_name'); 
const pokemonNumber = document.querySelector('.pokemon_number'); 
const pokemonImage = document.querySelector('.pokemon_image'); 

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.button.prev'); 
const buttonNext = document.querySelector('.button.next'); 

let search_pokemon = 1;

const fetch_pokemon = async (pokemon) => {
    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (APIresponse.status === 200) { 
        const data = await APIresponse.json();
        return data;
    } else {
        return null; 
    }
}

const render_pokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Carregando...'; 
    pokemonNumber.innerHTML = '';
    pokemonImage.style.display = 'none';

    const data= await fetch_pokemon(pokemon);

    if (data){
        let pokemonId = data.id;
        if (pokemonId > 649) {
            pokemonId = 649;
           
            search_pokemon = 649;
            render_pokemon(search_pokemon); 
            return; 
        }
        pokemonName.innerHTML = data.name; 
        pokemonNumber.innerHTML = pokemonId; 
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        pokemonImage.style.display = 'block'; 
        input.value = '';
        search_pokemon = pokemonId; 
    }
    else{
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = '';
        pokemonImage.src = '';
        pokemonImage.style.display = 'none'; 
    }
}


form.addEventListener
('submit', (event) => 
    {
    event.preventDefault();
    let searchValue = input.value.toLowerCase();
    
    if (parseInt(searchValue) > 649) {
        searchValue = '649';
    }
    render_pokemon(searchValue);
    }
);

buttonPrev.addEventListener('click', () => {
    if (search_pokemon > 1){
        search_pokemon -= 1;
        pokemonImage.style.display = 'none'; // Esconde a imagem antes de carregar o próximo
        render_pokemon(search_pokemon);
    }
});

buttonNext.addEventListener('click', () => {
    // Limita o incremento para não passar de 649
    if (search_pokemon < 649) {
        search_pokemon += 1;
        pokemonImage.style.display = 'none'; // Esconde a imagem antes de carregar o próximo
        render_pokemon(search_pokemon);
    } else {
        // Se já estiver em 649, renderiza 649 novamente para garantir
        render_pokemon(649);
    }
});

render_pokemon(search_pokemon); // Inicia a Pokedex com o Pokémon 1