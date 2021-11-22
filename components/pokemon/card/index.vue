<template>
  <div
    v-if="pokemon"
    :class="`bg-white ${setColourCard(pokemon.types)} rounded-lg shadow-sm px-8 py-6 relative overflow-hidden cursor-pointer group`"
    @click="() => select(pokemon)"
  >
    <div class="relative z-10">
      <p class="text-white font-bold capitalize text-lg">{{ pokemon.name }}</p>
      <div class="flex items-start justify-between">
        <div class="mt-2">
          <div v-for="(type, t) in pokemon.types" :key="t" class="rounded-full px-2.5 py-1 capitalize text-white font-medium text-xs bg-white bg-opacity-30 inline-block mr-1 mb-1">
            {{ type.type.name }}
          </div>
        </div>
        <div>
          <img v-if="pokemon && pokemon.sprites && pokemon.sprites.front_default" :src="pokemon.sprites.front_default" :alt="pokemon.name" />
          <img v-else src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png" alt="Métamorphe ?">
        </div>   
      </div>
      <button v-if="deletable" class="rounded-lg bg-white text-gray-600 font-semibold py-2 px-4 text-sm hover:bg-gray-100" @click="remove">Supprimer</button>
    </div>
    <img src="~/assets/images/pokedex.svg" alt="Pokeball shape" class="group-hover:w-full transition-all duration-300 absolute -right-8 -bottom-8 w-32 filter brightness-0 invert opacity-20">
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, toRefs } from '@nuxtjs/composition-api'
import { PokemonType } from '~/ts/enum'

export default defineComponent({
  props: {
    pokemon: {
      type: Object,
      required: true
    },
    deletable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select'],
  setup(props) {
    const { pokemon } = toRefs(props)
    const store = useStore();
    const setColourCard = (types: any) => {
      const { type } = types[0]
      const typeFind = PokemonType[type.name as keyof typeof PokemonType] 
      return `bg-${typeFind}`
    }

    const select = (pokemon: any) => {
      store.dispatch('SET_POKEMON', pokemon)
    }

    const remove = () => {
      store.dispatch('REMOVE_POKEMON', pokemon.value._id)
    }
    return {
      setColourCard,
      select,
      remove
    }
  },
})
</script>