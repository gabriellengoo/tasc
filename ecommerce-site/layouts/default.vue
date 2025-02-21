<template>
  <main class="min-h-full">
    <!-- Desktop Header -->
    <LayoutHeader
      :class="
        ['index', 'index-bak', 'about', 'model',].includes($route.name)
          ? 'hidden md:block'  // Hide on mobile, show on md+
          : 'hidden md:contents'
      "
    />

    <!-- Mobile Header -->
    <LayoutHeadermb
      :class="
        ['index', 'index-bak', 'about', ].includes($route.name)
          ? 'block md:hidden'  // Show on mobile, hide on md+
          : 'block md:hidden'
      "
    />

    <Nuxt />

    <LayoutFooter
      :class="
        ['index', 'about', ].includes($route.name)
          ? 'relative bottom-0'
          : ''
      "
    />
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