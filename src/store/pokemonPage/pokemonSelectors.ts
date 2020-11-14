import { MoveDetailedInfo } from "./../../types/MoveTypes";
import { RootState } from "./../store";
import * as PokemonTypes from "../../types/PokemonTypes";
import { createSelector } from "reselect";

export const getPokemon = (state: RootState): PokemonTypes.Pokemon | null =>
  state.pokemonPage.pokemon;

export const getVersions = (state: RootState): Array<PokemonTypes.Ref> =>
  state.pokemonPage.versions;

export const getSelectedVersion = (state: RootState): string | null =>
  state.pokemonPage.selectedVersion;

export const getMoves = (state: RootState): Array<MoveDetailedInfo> =>
  state.pokemonPage.moves;

export const getMovesByVersion = createSelector(
  getMoves,
  getSelectedVersion,
  (moves, version) => {
    return moves.filter((move) =>
      move.version_group_details.some((v) => v.version_group.name === version)
    )}
);
