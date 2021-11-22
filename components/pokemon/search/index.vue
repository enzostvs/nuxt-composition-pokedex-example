<template>
  <div class="bg-white rounded-xl shadow-sm pr-6 col-span-1 lg:col-span-3 flex items-center justify-between w-full relative">
    <input :value="search" class="outline-none flex flex-1 h-full rounded-xl px-8 py-6" placeholder="Recherchez un pokémon" @input="({ target }) => search = target.value" @focus="isOpen = true" @blur="waitAndClose" />
    <button class="rounded-xl min-w-10 w-10 h-10 p-2 bg-red-500 cursor-pointer">
      <img src="~/assets/images/pokedex.svg" class="filter brightness-0 invert w-full h-auto">
    </button>
    <pokemon-search-list v-if="results && results.length > 0 && isOpen" :pokemons="results" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import useSearch from '~/composables/useSearch'

export default defineComponent({
  setup() {
    const search = ref('')
    const isOpen = ref(false)
    const waitAndClose = () => {
      setTimeout(() => {
        isOpen.value = false
      }, 200)
    }
    const { results } = useSearch(search)
    return { search, results, isOpen, waitAndClose }
  },
})
</script>
