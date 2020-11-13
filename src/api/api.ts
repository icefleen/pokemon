import * as PokemonTypes from "../types/PokemonTypes";
import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

type FetchPokemonsResponseType = {
  count: number;
  previous: string | null;
  next: string | null;
  results: Array<PokemonTypes.Ref>;
};

export const fetchPokemons = async (
  limit: number,
  offset: number
): Promise<FetchPokemonsResponseType> => {
  const response = await instance.get<FetchPokemonsResponseType>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );

  return response.data;
};

export const fetchPokemon = async (
  name: string
): Promise<PokemonTypes.Pokemon> => {
  const response = await instance.get<PokemonTypes.Pokemon>(`/pokemon/${name}`);

  return response.data;
};
