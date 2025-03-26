<template>
  <main class="min-h-full">
    <TransitionComponent v-if="isModelPage"  />
    
    <!-- Desktop Header -->
    <LayoutHeader
      v-if="!isModelPage"
      :class="
        ['index', 'index-bak', 'about'].includes($route.name)
          ? 'hidden md:block'  // Hide on mobile, show on md+
          : 'hidden md:contents'
      "
    />

    <!-- Mobile Header -->
    <LayoutHeadermb
      v-if="!isModelPage"
      :class="
        ['index', 'index-bak', 'about'].includes($route.name)
          ? 'block md:hidden'  // Show on mobile, hide on md+
          : 'block md:hidden'
      "
    />

    <Nuxt />

    <LayoutFooter
      v-if="!isModelPage"
      :class="
        ['index', 'about'].includes($route.name)
          ? 'relative bottom-0'
          : ''
      "
    />
  </main>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import TransitionComponent from "~/components/TransitionComponent.vue";

export default {
  components: {
    TransitionComponent,
  },
  computed: {
    isModelPage() {
      return this.$route.path.startsWith('/model/')
    }
  },
  methods: {
    ...mapActions(['setTitle']),
    ...mapMutations(['SET_FOOTER', 'CLOSE_MENU']),
  },
  watch: {
    $route() {
      this.setTitle(false)
      this.SET_FOOTER(false)
      this.CLOSE_MENU()
    },
  },
}
</script>
