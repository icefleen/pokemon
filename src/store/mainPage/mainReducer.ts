import { RootState } from "./../store";
import { fetchPokemon, fetchPokemons } from "./../../api/api";
import * as PokemonTypes from "../../types/PokemonTypes";
import { ThunkAction } from "redux-thunk";

const SET_COUNT = "SET COUNT";
const SET_PAGES_LINKS = "SET PAGES LINKS";
const SET_POKEMONS = "SET POKEMONS";

export type MainState = {
  count: number;
  pokemons: Array<PokemonTypes.Pokemon>;
  previous: string | null;
  next: string | null;
};

const initialState: MainState = {
  count: 0,
  pokemons: [],
  previous: null,
  next: null,
};

export const mainReducer = (
  state: MainState = initialState,
  action: ActionTypes
): MainState => {
  switch (action.type) {
    case SET_COUNT:
      return { ...state, count: action.count };

    case SET_PAGES_LINKS:
      return { ...state, previous: action.previous, next: action.next };

    case SET_POKEMONS:
      return { ...state, pokemons: action.pokemons };

    default:
      return state;
  }
};

type ActionTypes = SetCountAction | SetPagesLinksAction | SetPokemonsAction;

type SetCount = typeof SET_COUNT;

type SetCountAction = {
  type: SetCount;
  count: number;
};

const setCount = (count: number): SetCountAction => ({
  type: SET_COUNT,
  count,
});

type SetPagesLinks = typeof SET_PAGES_LINKS;

type SetPagesLinksAction = {
  type: SetPagesLinks;
  previous: string | null;
  next: string | null;
};

export const setPagesLinks = (
  previous: string | null,
  next: string | null
): SetPagesLinksAction => ({
  type: SET_PAGES_LINKS,
  previous,
  next,
});

type SetPokemons = typeof SET_POKEMONS;

type SetPokemonsAction = {
  type: SetPokemons;
  pokemons: Array<PokemonTypes.Pokemon>;
};

const setPokemons = (
  pokemons: Array<PokemonTypes.Pokemon>
): SetPokemonsAction => ({
  type: SET_POKEMONS,
  pokemons,
});

export const getPokemons = (
  limit: number,
  offset: number
): ThunkAction<void, RootState, unknown, ActionTypes> => async (dispatch) => {
  const data = await fetchPokemons(limit, offset);

  const pokemons: Array<PokemonTypes.Pokemon> = await Promise.all(
    data.results.map((ref) => fetchPokemon(ref.name))
  );
  debugger;

  dispatch(setCount(data.count));
  dispatch(setPagesLinks(data.previous, data.next));
  dispatch(setPokemons(pokemons));
};
