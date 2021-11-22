<template>
  <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
    <div ref="containerPokemons" class="lg:col-span-3 grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 lg:mb-0 mb-8">
      <pokemon-search />
      <pokemon-card-list v-for="(pokemon, p) in pokemons" :key="p" :name="pokemon.name" />
      <button class="w-full text-center px-6 py-3 rounded-lg shadow-sm bg-white text-gray-800 font-semibold text-base cursor-pointer opacity-80 transition duration-200 hover:opacity-100" @click="loadMore">
        Voir {{ pagination.limit }} autres pokemons
      </button>
    </div>
    <pokemon-view-informations />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from '@nuxtjs/composition-api'
import usePokemons from '~/composables/usePokemons'

export default defineComponent({
  setup() {
    const containerPokemons: any = ref(null)
    const pagination = reactive({
      offset: 0,
      limit: 15,
    })
    const pokemons: any = ref([])
    const { results } = usePokemons(pagination)

    watch(results, (newPokemons: any) => pokemons.value.push(...newPokemons))

    const loadMore = () => {
      pagination.offset += pagination.limit
    }

    return {
      pokemons,
      pagination,
      results,
      loadMore,
      containerPokemons
    }
  },
})
</script>
