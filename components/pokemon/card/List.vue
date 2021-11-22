<template>
  <pokemon-card v-if="pokemon" :pokemon="pokemon" />
</template>

<script lang="ts">
import { defineComponent, toRefs } from '@nuxtjs/composition-api'
import usePokemon from '~/composables/usePokemon'

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    }
  },
  emits: ['select'],
  setup(props) {
    const { name } = toRefs(props)
    const { pokemon } = usePokemon(name)

    return {
      pokemon
    }
  },
})
</script>
