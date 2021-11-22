<template>
  <div class="bg-white shadow-sm rounded-xl overflow-hidden">
    <div class="flex items-center justify-start">
      <router-link
        v-for="(menu, m) in menus"
        :key="m"
        exact-active-class="border-red-500"
        :to="menu.path"
        :class="{ 'filter grayscale hover:grayscale-0': activePath !== menu.path }"
        class="flex items-center justify-start pt-7 pb-6 font-semibold text-red-500 transition duration-200 border-b-4 border-white hover:border-red-500 px-10"
      >
        <img
          :src="require(`~/assets/images/${menu.icon}.svg`)"
          :alt="menu.name"
          class="h-8 mr-4 transition duration-200"
        >
        {{ menu.name }}
        <template v-if="menu.total">
          ({{ total }})
        </template>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, useRoute, useStore, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    const menus = [{
      name: 'Pokedex',
      icon: 'pokedex',
      path: '/'
    }, {
      name: 'Mon équipe',
      icon: 'team',
      total: true,
      path: '/team'
    }]
    
    const store = useStore();
    const total = computed(() => store.getters.total);

    const route = useRoute()
    const activePath = computed(() => {
      return route.value.path
    })

    return { menus, activePath, total }
  },
})
</script>
