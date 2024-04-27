import axios from "axios";
import "./pokemonlist.css";
import { useEffect, useState } from "react";
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pokedexUrl, setPokedexUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  async function downloadpokemons() {
    setIsLoading(true);
    const response = await axios.get(pokedexUrl);

    const pokemonResults = response.data.results;

    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    // iterating over the array of pokemons and get pokemon url.
    const pokemonResultPromise = pokemonResults.map((pokemon) =>
      axios.get(pokemon.url)
    );
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);

    // iterate on the data of each pokemon to get name and image
    const PokeListResult = pokemonData.map((pokeData) => {
      const pokemon = pokeData.data;
      return {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other.dream_world.front_default,
        type: pokemon.types,
      };
    });
    setPokemonList(PokeListResult);
    setIsLoading(false);
  }

  useEffect(() => {
    downloadpokemons();
  }, [pokedexUrl]);

  return (
    <div className="Pokemon-list-wrapper">
      <div className="pokemon-wrapper">
      {isLoading
        ? "Loading..."
        : pokemonList.map((p) => (
            <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
          ))}
      </div>

      <div className="controls">
        <button disabled={prevUrl==null} onClick={() => setPokedexUrl(prevUrl)}>Prev</button>
        <button disabled={nextUrl==null} onClick={() => setPokedexUrl(nextUrl)}>Next</button>
      </div>
    </div>
  );
}

export default PokemonList;
