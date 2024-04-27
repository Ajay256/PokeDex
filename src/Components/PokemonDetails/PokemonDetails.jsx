import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./pokemon-details.css";

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  async function downloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      weight: response.data.weight,
      height: response.data.height,
      types: response.data.types.map((t) => t.type.name),
    });
  }

  useEffect(() => {
    downloadPokemon();
  }, []);

  return (
    <div className="pokemon-details-main-wrapper">
      <h2 className="pokemon-details-name"> {pokemon.name}</h2>

      <div className="pokemon-details-wrapper">
        <div className="pokemon-left">
          <div className="pokemon-details-height">
            <span className="spn">Height :</span> {pokemon.height}
          </div>
          <div className="pokemon-details-weight">
            <span className="spn">Weight :</span> {pokemon.weight}
          </div>
          <div className="pokemon-details-type">
            <span className="spn">Types :</span>{" "}
            {pokemon.types &&
              pokemon.types.map((t) => <span key={t}> {t} , </span>)}
          </div>
        </div>

        <img
          className="pokemon-details-image"
          src={pokemon.image}
          alt="image"
        />
      </div>
    </div>
  );
}

export default PokemonDetails;
