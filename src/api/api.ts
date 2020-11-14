import { MoveDetailedInfo } from "./../types/MoveTypes";
import * as PokemonTypes from "../types/PokemonTypes";
import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

type FetchItemsResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: Array<PokemonTypes.Ref>;
};

export const fetchPokemons = async (
  limit: number,
  offset: number
): Promise<FetchItemsResponseType> => {
  const response = await instance.get<FetchItemsResponseType>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );

  return response.data;
};

export const fetchPokemonByName = async (
  name: string
): Promise<PokemonTypes.Pokemon> => {
  const response = await instance.get<PokemonTypes.Pokemon>(`/pokemon/${name}`);

  return response.data;
};

export const fetchPokemonById = async (
  id: number
): Promise<PokemonTypes.Pokemon> => {
  const response = await instance.get<PokemonTypes.Pokemon>(`/pokemon/${id}`);

  return response.data;
};

export const fetchVersions = async (): Promise<Array<PokemonTypes.Ref>> => {
  const response = await instance.get<FetchItemsResponseType>(
    "/version?limit=100"
  );

  return response.data.results;
};

type FetchMoveStatsResponseType = {
  accuracy: number;
  power: number;
  pp: number;
  type: PokemonTypes.Ref;
};

export const fetchMoveStats = async (
  move: PokemonTypes.Move
): Promise<MoveDetailedInfo> => {
  const response = await instance.get<FetchMoveStatsResponseType>(
    `/move/${move.move.name}`
  );

  return {
    ...move,
    accuracy: response.data.accuracy,
    power: response.data.power,
    pp: response.data.power,
    type: response.data.type.name,
  };
};
