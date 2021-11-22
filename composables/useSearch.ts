import { ref, useContext, useFetch, Ref, watch } from '@nuxtjs/composition-api'

export default function useSearch(search: Ref<string>) {
  const { $axios } = useContext()
  const results: any = ref([])

  const { fetch } = useFetch(async () => {
    if (search.value === '') {
      results.value = []
      return 
    }
    const { results: resultsPokemons } = await $axios.$get(`/pokemon?limit=1000`)
    
    const pokemons = resultsPokemons.filter((pokemon: { name: string }) => pokemon?.name?.includes(search.value.toLocaleLowerCase()))
    if (pokemons.length > 5) pokemons.length = 5

    results.value = pokemons
  })

  watch(search, () => fetch())

  return {
    results
  }
}
