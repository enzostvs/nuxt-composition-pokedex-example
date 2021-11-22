import { ref, useContext, useFetch, watch, Ref } from '@nuxtjs/composition-api'

export default function usePokemon(initialName: Ref<string>) {
  const { $axios } = useContext()
  const pokemon = ref()
  const pokemonName = ref(initialName)

  const { fetch } = useFetch(async () => {
    const data = await $axios.$get(`/pokemon/${pokemonName.value}`)
    const species = await $axios.$get(`/pokemon-species/${data.id}`).catch(() => {})
    const name = species?.names?.find((s: any) => s.language.name === 'fr')?.name ?? data?.name?.replaceAll('-', ' ') ?? data.species
    pokemon.value = { ...data, name }
  })
  fetch()

  watch(pokemonName, () => fetch())

  return {
    pokemon
  }
}
