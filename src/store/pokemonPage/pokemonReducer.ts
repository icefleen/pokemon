import { MoveDetailedInfo } from "./../../types/MoveTypes";
import { RootState } from "./../store";
import { ThunkAction } from "redux-thunk";
import {
  fetchPokemonById,
  fetchVersions,
  fetchMoveStats,
} from "./../../api/api";
import * as PokemonTypes from "../../types/PokemonTypes";

const SET_POKEMOM = "SET POKEMON";
const SET_VERSIONS = "SET VERSIONS";
const SET_SELECTED_VERSION = "SET SELECTED VERSION";
const SET_MOVES = "SET MOVES";

type PokemonState = {
  pokemon: PokemonTypes.Pokemon | null;
  versions: Array<PokemonTypes.Ref>;
  selectedVersion: string | null;
  moves: Array<MoveDetailedInfo>;
};

const initialState: PokemonState = {
  pokemon: null,
  versions: [],
  selectedVersion: null,
  moves: [],
};

export const pokemonReducer = (
  state: PokemonState = initialState,
  action: ActionsType
): PokemonState => {
  switch (action.type) {
    case SET_POKEMOM:
      return { ...state, pokemon: action.pokemon };

    case SET_VERSIONS:
      return { ...state, versions: action.versions };

    case SET_SELECTED_VERSION:
      return { ...state, selectedVersion: action.selectedVersion };

    case SET_MOVES:
      return { ...state, moves: action.moves };

    default:
      return state;
  }
};

type ActionsType =
  | SetPokemonAction
  | SetVersionsAction
  | SetSelectedVersionAction
  | SetMovesAction;

type SetPokemon = typeof SET_POKEMOM;

type SetPokemonAction = {
  type: SetPokemon;
  pokemon: PokemonTypes.Pokemon;
};

const setPokemom = (pokemon: PokemonTypes.Pokemon): SetPokemonAction => ({
  type: SET_POKEMOM,
  pokemon,
});

export const loadPokemon = (
  id: number
): ThunkAction<void, RootState, unknown, ActionsType> => async (dispatch) => {
  const data = await fetchPokemonById(id);

  dispatch(setPokemom(data));
  dispatch(loadMoves(data.moves));
};

type SetVersions = typeof SET_VERSIONS;

type SetVersionsAction = {
  type: SetVersions;
  versions: Array<PokemonTypes.Ref>;
};

const setVersions = (versions: Array<PokemonTypes.Ref>): SetVersionsAction => ({
  type: SET_VERSIONS,
  versions,
});

export const loadVersions = (): ThunkAction<
  void,
  RootState,
  unknown,
  ActionsType
> => async (dispatch) => {
  const versions = await fetchVersions();

  dispatch(setVersions(versions));
};

type SetSelectedVersion = typeof SET_SELECTED_VERSION;

type SetSelectedVersionAction = {
  type: SetSelectedVersion;
  selectedVersion: string;
};

export const setSelectedVersion = (
  selectedVersion: string
): SetSelectedVersionAction => ({
  type: SET_SELECTED_VERSION,
  selectedVersion,
});

type SetMoves = typeof SET_MOVES;

type SetMovesAction = {
  type: SetMoves;
  moves: Array<MoveDetailedInfo>;
};

const setMoves = (moves: Array<MoveDetailedInfo>): SetMovesAction => ({
  type: SET_MOVES,
  moves,
});

export const loadMoves = (
  moves: Array<PokemonTypes.Move>
): ThunkAction<void, RootState, unknown, ActionsType> => async (dispatch) => {
  const movesDetailed = await Promise.all(
    moves.map((move) => fetchMoveStats(move))
  );

  dispatch(setMoves(movesDetailed));
};
