<template>
  <div class="lg:col-span-2 relative">
    <div class="bg-white rounded-xl shadow-sm px-8 py-6 sticky top-8">
      <template v-if="pokemon && pokemon.species">
        <div class="relative flex items-center justify-center">
          <div class="h-32 inline-block relative">
            <img v-if="pokemon && pokemon.sprites && pokemon.sprites.front_default" :src="pokemon.sprites.front_default" class="h-32 mx-auto relative z-10" :alt="pokemon.name" />
            <img v-if="pokemon && pokemon.sprites && pokemon.sprites.front_shiny" :src="pokemon.sprites.front_shiny" class="h-16 mx-auto absolute bottom-0 right-0 z-10" :alt="pokemon.name" />
          </div>
          <div class="absolute bottom-0 flex justify-center w-full transform -translate-y-2">
            <div class="w-24 mx-auto h-3 bg-gray-100" style="border-radius: 100%;" />
          </div>
        </div>
        <p class="text-gray-400 font-bold text-center text-lg">n°{{ pokemon.id }}</p>
        <h3 class="text-gray-800 text-3xl font-extrabold capitalize text-center">
          {{ pokemon.name }}
        </h3>
        <div class="flex items-center justify-center mt-3">
          <div v-for="(type, t) in pokemon.types" :key="t" :class="`rounded-full px-4 py-1 capitalize text-white font-medium text-sm ${setColourCard(type)} inline-block mr-1 mb-1`">
            {{ type.type.name }}
          </div>
        </div>
        <div class="rounded-xl border border-gray-200 w-max mx-auto mt-8 mb-4 flex items-center justify-center px-2">
          <div v-for="(evolution, e) in evolutions" :key="e" class="flex items-center">
            <img :src="evolution" class="w-24">
            <img v-if="e + 1 !== evolutions.length" src="~/assets/images/next.svg" class="w-5 opacity-60">
          </div>
        </div>
        <div class="text-center">
          <div :class="{ 'opacity-0 pointer-events-none': !isAdded }" class="text-gray-400 w-full h-6 mb-2 font-semibold">
            Ajout de <span class="capitalize">{{ pokemon.name }}</span> à votre équipe...
          </div>
          <button
            class="rounded-lg bg-blue-500 text-white font-semibold py-3 px-6 text-base hover:bg-blue-600 mx-auto relative overflow-hidden"
            @click="add"
          >
            <div :class="{ 'pointer-events-none opacity-0': !isAdded }" class="absolute left-0 top-0 w-full bg-blue-500 bg-opacity-80 h-full flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            Je te veux dans mon équipe
          </button>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, computed, ref, watch } from '@nuxtjs/composition-api'
import { PokemonType } from '~/ts/enum'
import useEvolutions from '~/composables/useEvolutions'

export default defineComponent({
  setup() {
    const store = useStore();
    const pokemon = computed(() => store.getters.pokemon);
    const isAdded = ref(false)
  
    const add = () => {
      if (isAdded.value) return;
      isAdded.value = true
      store.dispatch('ADD_POKEMON', pokemon.value);
      setTimeout(() => {
        isAdded.value = false
      }, 1000)
    }

    const setColourCard = (data: any) => {
      const { type } = data
      const typeFind = PokemonType[type.name as keyof typeof PokemonType] 
      return `bg-${typeFind}`
    }

    const { evolutions, fetch } = useEvolutions(pokemon)

    watch(pokemon, () => {
      fetch()
    })

    return { pokemon, add, isAdded, setColourCard, evolutions }
  },
})
</script>
