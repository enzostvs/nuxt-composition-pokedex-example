<template>
  <li
    v-if="pokemon && pokemon.species"
    class="px-8 py-2 hover:bg-gray-100 text-base font-semibold text-gray-500 hover:text-gray-700 cursor-pointer flex items-center justify-start"
    @click="() => select(pokemon)"
  >
    <img v-if="pokemon && pokemon.sprites && pokemon.sprites.front_default" :src="pokemon.sprites.front_default" class="w-12" :alt="formattedName" />
    <span class="capitalize">{{ formattedName }}</span>
  </li>
</template>

<script lang="ts">
import { defineComponent, toRefs, computed, useStore } from '@nuxtjs/composition-api'
import usePokemon from '~/composables/usePokemon'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { name } = toRefs(props)
    const { pokemon } = usePokemon(name)
    const store = useStore();
    const formattedName = computed(() => {
      return name.value.toLowerCase().replaceAll('-', ' ')
    })
    const select = (pokemon: any) => {
      store.dispatch('SET_POKEMON', pokemon)
    }
    return { pokemon, formattedName, select }
  },
})
</script>
