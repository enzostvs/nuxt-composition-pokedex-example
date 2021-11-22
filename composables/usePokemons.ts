import { ref, useContext, useFetch, watch } from '@nuxtjs/composition-api'
import { QOptions } from '~/ts/types'

export default function usePokemons(initialOptions: QOptions) {
  const { $axios } = useContext()
  const results: any = ref([])

  const { fetch } = useFetch(async () => {
    const { results: pokemons } = await $axios.$get(`/pokemon?limit=${initialOptions.limit}&offset=${initialOptions.offset}`)
    results.value = pokemons
  })
  fetch()

  watch(initialOptions, () => fetch())

  return {
    results
  }
}
