<template>
  <header
    class="top-0 left-0 z-20 flex w-full gap-2  pb-5 text-xs leading-snug uppercase "
    :class="
      $nuxt.$route.name == 'project-slug' || $nuxt.$route.name == 'slug'
        ? 'fixed'
        : 'sticky'
    "
  >
    <nav class="flex flex-col w-1/16">
      <NuxtLink to="/mens">Menswear</NuxtLink>
      <NuxtLink to="/womens">Womenswear</NuxtLink>
    </nav>

    <div class="w-1/16">
      <NuxtLink to="/">Tasc</NuxtLink>
    </div>
    <div
      v-show="title"
      class="flex-1 -mt-1 text-4xl leading-none md:text-5xl font-heading"
    >
      <!-- {{ title }} --> title
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['title']),
  },
}
</script>