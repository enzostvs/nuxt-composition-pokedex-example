<template>
  <div class="w-full bg-white shadow-sm rounded-b-xl pb-6 pt-2 absolute top-full transform -translate-y-2 left-0 z-20">
    <ul>
      <pokemon-search-list-item v-for="(pokemon) in pokemons" :key="pokemon.id" :name="pokemon.name" />
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    pokemons: {
      type: Array,
      default: () => []
    }
  }
})
</script>
