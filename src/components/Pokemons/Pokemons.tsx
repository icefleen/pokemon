import React, { FC, useEffect } from "react";
import { connect } from "react-redux";
import { getPokemons } from "../../store/mainPage/mainReducer";
import { RootState } from "../../store/store";
import * as PokemonTypes from "../../types/PokemonTypes";

type PropTypes = {
  pokemons: Array<PokemonTypes.Pokemon>;
  getPokemons: (limit: number, offset: number) => void;
};

const Pokemons: FC<PropTypes> = ({ pokemons, getPokemons }) => {
  useEffect(() => {
    getPokemons(20, 0);
  }, [getPokemons]);

  return (
    <div>
      <div>Pokemons Page</div>
      {pokemons.map((pokemon) => (
        <div>
          <div>
            <img
              src={pokemon.sprites.other["official-artwork"].front_default}
              alt="pokemon"
            />
          </div>
          <div>{pokemon.name}</div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  pokemons: state.mainState.pokemons,
});

export default connect(mapStateToProps, {
  getPokemons,
})(Pokemons);
