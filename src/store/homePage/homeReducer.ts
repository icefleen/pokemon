import { RootState } from "../store";
import { fetchPokemonByName, fetchPokemons } from "../../api/api";
import * as PokemonTypes from "../../types/PokemonTypes";
import { ThunkAction } from "redux-thunk";

const SET_COUNT = "SET COUNT";
const SET_POKEMONS = "SET POKEMONS";
const SET_OFFSET = "SET OFFSET";

export type HomeState = {
  count: number;
  pokemons: Array<PokemonTypes.Pokemon>;
  offset: number;
};

const initialState: HomeState = {
  count: 0,
  pokemons: [],
  offset: 0,
};

export const homeReducer = (
  state: HomeState = initialState,
  action: ActionTypes
): HomeState => {
  switch (action.type) {
    case SET_COUNT:
      return { ...state, count: action.count };

    case SET_OFFSET:
      return { ...state, offset: action.offset };

    case SET_POKEMONS:
      return { ...state, pokemons: action.pokemons };

    default:
      return state;
  }
};

type ActionTypes = SetCountAction | SetOffsetAction | SetPokemonsAction;

type SetCount = typeof SET_COUNT;

type SetCountAction = {
  type: SetCount;
  count: number;
};

const setCount = (count: number): SetCountAction => ({
  type: SET_COUNT,
  count,
});

type SetOffset = typeof SET_OFFSET;

type SetOffsetAction = {
  type: SetOffset;
  offset: number;
};

export const setOffset = (offset: number): SetOffsetAction => ({
  type: SET_OFFSET,
  offset,
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

export const loadPokemons = (
  limit: number,
  offset: number
): ThunkAction<void, RootState, unknown, ActionTypes> => async (dispatch) => {
  const data = await fetchPokemons(limit, offset);

  const pokemons: Array<PokemonTypes.Pokemon> = await Promise.all(
    data.results.map((ref) => fetchPokemonByName(ref.name))
  );

  dispatch(setOffset(offset));
  dispatch(setCount(data.count));
  dispatch(setPokemons(pokemons));
};
