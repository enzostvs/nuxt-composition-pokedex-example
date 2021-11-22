<template>
  <div v-if="pokemons" class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
    <template v-if="pokemons.length > 0">
      <pokemon-card v-for="(pokemon, p) in pokemons" :key="p" :pokemon="pokemon" deletable />
    </template>
    <div v-else class="text-center col-span-3 mt-10">
      <p class="font-bold text-gray-800 text-4xl mb-1">C'est vide...</p>
      <p class="text-gray-400 font-medium">
        Ajoute dès maintenant des pokémons à ton équipe, Pikachu se sent très seul...
      </p>
      <img src="~/assets/images/pikachu.png" alt="Pikachu" class="w-24 my-12 mx-auto">
      <nuxt-link to="/">
        <button class="rounded-lg bg-white text-gray-600 font-semibold py-2 px-4 text-base hover:bg-gray-100">
          Voir les pokémons
        </button>
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore();
    const pokemons = computed(() => store.getters.pokemons);

    return { pokemons }
  },
})
</script>