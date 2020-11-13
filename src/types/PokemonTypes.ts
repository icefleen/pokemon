export type Ref = {
  name: string,
  url: string
}

export type Ability = {
  ability: Ref,
  is_hidden: boolean,
  slot: number
}

export type GameIndex = {
  game_index: number,
  version: Ref
}

export type VersionGroupDetails = {
  level_learned_at: number,
  move_learn_method: Ref,
  version_group: Ref
}

export type Move = {
  move: Ref,
  version_group_details: Array<VersionGroupDetails>
}

export type Stat = {
  base_stat: number,
  effort: 0,
  stat: Ref
}

export type Type = {
  slot: number,
  type: Ref
}

export type Pokemon = {
  id: number,
  name: string,
  order: number,
  base_experience: number,
  weight: number,
  height: number,
  is_default: boolean,
  location_area_encounters: string,
  abilities: Array<Ability>,
  forms: Array<Ref>,
  game_indices: Array<GameIndex>,
  held_items: any,
  moves: Array<Move>,
  species: Ref,
  sprites: any,
  stats: Array<Stat>
  types: Array<Type>
}