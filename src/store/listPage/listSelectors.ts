import * as PokemonTypes from "../../types/PokemonTypes";
import { RootState } from "./../store";

export const getListPageIsLoading = (state: RootState): boolean =>
  state.listPage.isLoading;

export const getPokemonsRefs = (state: RootState): Array<PokemonTypes.Ref> =>
  state.listPage.pokemons;
