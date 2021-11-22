<template>
  <div>
    <img src="~/assets/images/pokeball_svg.svg" alt="Pokeball shape" class="absolute -left-44 -top-24 w-full max-w-xl">
    <div class="relative z-10 container mx-auto w-full px-3 py-10 grid grid-cols-1 gap-8">
      <template-navigation />
      <keep-alive>
        <nuxt-child keep-alive />
      </keep-alive>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useStore, onMounted } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const store = useStore();
    const initStore = () => {
      store.dispatch('INIT_POKEMONS');
    }

    onMounted(() => initStore());
  },
})
</script>
