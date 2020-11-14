import { fetchPokemons } from "./../../api/api";
import { RootState } from "./../store";
import { ThunkAction } from "redux-thunk";
import * as PokemonTypes from "../../types/PokemonTypes";

const TOGGLE_LOADING = "TOGGLE LOADING";
const SET_ITEMS = "SET ITEMS";

type PokemonsListState = {
  isLoading: boolean;
  pokemons: Array<PokemonTypes.Ref>;
};

const initialState = {
  isLoading: false,
  pokemons: [],
};

export const listReducer = (
  state: PokemonsListState = initialState,
  action: ActionsType
): PokemonsListState => {
  switch (action.type) {
    case TOGGLE_LOADING:
      return { ...state, isLoading: action.isLoading };

    case SET_ITEMS:
      return { ...state, pokemons: action.pokemons };

    default:
      return state;
  }
};

type ActionsType = ToggleLoadingAction | SetItemsAction;

type ToggleLoading = typeof TOGGLE_LOADING;

type ToggleLoadingAction = {
  type: ToggleLoading;
  isLoading: boolean;
};

const toggleLoading = (isLoading: boolean): ToggleLoadingAction => ({
  type: TOGGLE_LOADING,
  isLoading,
});

type SetItems = typeof SET_ITEMS;

type SetItemsAction = {
  type: SetItems;
  pokemons: Array<PokemonTypes.Ref>;
};

const setItems = (pokemons: Array<PokemonTypes.Ref>): SetItemsAction => ({
  type: SET_ITEMS,
  pokemons,
});

export const loadItems = (): ThunkAction<
  void,
  RootState,
  unknown,
  ActionsType
> => async (dispatch) => {
  dispatch(toggleLoading(true));
  const data = await fetchPokemons(1000, 0);

  dispatch(setItems(data.results));
  dispatch(toggleLoading(false));
};
