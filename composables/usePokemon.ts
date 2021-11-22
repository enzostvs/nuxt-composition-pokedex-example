import { ref, useContext, useFetch, watch, Ref } from '@nuxtjs/composition-api'

export default function usePokemon(initialName: Ref<string>) {
  const { $axios } = useContext()
  const pokemon = ref()
  const name = ref(initialName)

  const { fetch } = useFetch(async () => {
    const data = await $axios.$get(`/pokemon/${name.value}`)
    const species = await $axios.$get(`/pokemon-species/${data.id}`)
    const frenchName = species.names.find((s: any) => s.language.name === 'fr')
    pokemon.value = { ...data, name: frenchName.name ?? 'Unavailable' }
  })
  fetch()

  watch(name, () => fetch())

  return {
    pokemon
  }
}
