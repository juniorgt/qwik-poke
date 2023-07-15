import {
  $,
  component$,
  useContext,
  useOnDocument,
  useTask$,
} from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

import { PokemonImage } from "~/components/pokemons/pokemon-image";
import { PokemonsListContex } from "~/context";
import { getSmallPokemon } from "~/helpers/get-small-pokemos";

// TODO: Carga loading
// TODO: Lllego al final ?

export default component$(() => {
  const pokemonState = useContext(PokemonsListContex);

  useTask$(async ({ track }) => {
    track(() => pokemonState.currentPage);
    const pokemons = await getSmallPokemon(pokemonState.currentPage * 10, 30);
    pokemonState.pokemons = [...pokemonState.pokemons, ...pokemons];
    pokemonState.isLoading = false;
  });

  useOnDocument(
    "scroll",
    $(() => {
      const maxScroll = document.body.scrollHeight;
      const currentScrool = window.scrollY + window.innerHeight;

      if (currentScrool + 200 >= maxScroll && !pokemonState.isLoading) {
        pokemonState.isLoading = true;
        pokemonState.currentPage++;
      }
    })
  );

  return (
    <>
      <div class="flex flex-col">
        <span class="my-5 text-5xl">Status</span>
        <span>Pagina actual : {pokemonState.currentPage}</span>
        <span>Está cargando:</span>
      </div>
      <div class="mt-10">
        <button
          onClick$={() => pokemonState.currentPage--}
          class="btn btn-primary mr-2"
        >
          Anterior
        </button>
        <button
          onClick$={() => pokemonState.currentPage++}
          class="btn btn-primary"
        >
          Siguiente
        </button>
      </div>
      <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-5">
        {pokemonState.pokemons.map(({ name, id }) => (
          <div key={name} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id}></PokemonImage>
            <span class="capitalize"> {name}</span>
          </div>
        ))}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Client-list",
};
