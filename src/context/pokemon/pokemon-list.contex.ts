import { createContextId } from "@builder.io/qwik";
import type { SmallPokemon } from "~/interfaces";

export interface PokemonListState {
  currentPage: number;
  isLoading: boolean;
  pokemons: SmallPokemon[];
}

export const PokemonsListContex = createContextId<PokemonListState>(
  "pokemon.list-contex"
);
