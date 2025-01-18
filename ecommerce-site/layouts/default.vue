<template>
    <main class="min-h-full">
      <LayoutHeader
        :class="
          $nuxt.$route.name == 'index' ||
          $nuxt.$route.name == 'index-bak' ||
          $nuxt.$route.name == 'about' ||
          $nuxt.$route.name == 'production' ||
          $nuxt.$route.name == 'artists'
            ? ''
            : ' md:hidden'
        "
      ></LayoutHeader>
      <LayoutHeaderMin
        :class="
          $nuxt.$route.name == 'index' ||
          $nuxt.$route.name == 'index-bak' ||
          $nuxt.$route.name == 'about' ||
          $nuxt.$route.name == 'production' ||
          $nuxt.$route.name == 'artists'
            ? 'hidden'
            : 'hidden md:flex'
        "
      ></LayoutHeaderMin>
      <Nuxt />
      <LayoutFooter
      :class="
          $nuxt.$route.name == 'index' ||
          $nuxt.$route.name == 'about' ||
          $nuxt.$route.name == 'production' ||
          $nuxt.$route.name == 'artists'
            ? 'reletive bottom-0'
            : ''
        "
      ></LayoutFooter>

      <!--  v-if="
          $nuxt.$route.name = 'index' &&
          // if not these pages dont show footer
          $nuxt.$route.name != 'project-slug' &&
          $nuxt.$route.name != 'slug'
        " -->
    </main>
  </template>
  <script>
  import { mapActions, mapMutations } from 'vuex'
  export default {
    methods: {
      ...mapActions(['setTitle']),
      ...mapMutations(['SET_FOOTER', 'CLOSE_MENU']),
    },
    watch: {
      $route: function (value) {
        this.setTitle(false)
        this.SET_FOOTER(false)
        this.CLOSE_MENU()
      },
    },
  }
  </script>