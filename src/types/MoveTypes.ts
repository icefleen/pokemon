import * as PokemonTypes from "./PokemonTypes";

export type MoveStats = {
  accuracy: number;
  power: number;
  pp: number;
  type: string;
};

export type MoveDetailedInfo = MoveStats & PokemonTypes.Move;
