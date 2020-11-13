import { RootState } from "../store";
import * as PokemonTypes from "../../types/PokemonTypes";

export const getPokemons = (state: RootState): Array<PokemonTypes.Pokemon> =>
  state.homeState.pokemons;

export const getCount = (state: RootState): number => state.homeState.count;

export const getOffset = (state: RootState): number => state.homeState.offset;
