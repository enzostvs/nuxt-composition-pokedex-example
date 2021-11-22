import { ref, useContext, useFetch, Ref } from '@nuxtjs/composition-api'

export default function useEvolutions(initialPokemon: Ref<any>) {
  const { $axios } = useContext()
  const pokemon = ref(initialPokemon)
  const evolutions: Ref<string[]> = ref([])

  const { fetch } = useFetch(async () => {
    if (pokemon?.value?.species?.url) {
      const { evolution_chain: evolutionChain } = await $axios.$get(pokemon.value.species.url)
      if (evolutionChain?.url) {
        const { chain } = await $axios.$get(evolutionChain.url)
        if (chain?.evolves_to?.length > 0) {
          const mappedEvolutions: string[] = []
          // baby species
          const initialEvolve = await $axios.$get(`/pokemon/${chain.species.name}`)
          mappedEvolutions.push(initialEvolve.sprites.front_default)

          // get evolves (max 2)
          const firstEvolve = await $axios.$get(`/pokemon/${chain.evolves_to[0].species.name}`)
          mappedEvolutions.push(firstEvolve.sprites.front_default)
          if (chain.evolves_to[0].evolves_to?.length > 0) {
            const secondEvolve = await $axios.$get(`/pokemon/${chain.evolves_to[0].evolves_to[0].species.name}`)
            mappedEvolutions.push(secondEvolve.sprites.front_default)
          }
          evolutions.value = mappedEvolutions
        } else {
          evolutions.value = []
        }
      } else {
        evolutions.value = []
      }
    }
  })

  return {
    evolutions,
    fetch
  }
}
