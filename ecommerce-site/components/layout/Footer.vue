<template>
  <!-- <footer class="bottom-0 left-0 w-full">
    <div v-if="footer" class="flex text-3xl md:text-5xl font-heading w-9/16">
      <a
        :href="link.link"
        target="_blank"
        v-for="link in footer"
        :key="link._key"
        class="w-full p-2"
      >
        {{ link.title }}
         
      </a>
    </div>
  </footer> -->
  <footer class="footerstyle bottom-0 left-0 w-full">
    <div  class="fotsections flex md:text-5xl font-heading w-9/16">
      <a
        target="_blank"
        
        class="w-full p-2"
      >
          footer
      </a>
    </div>
  </footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['footer']),
  },
}
</script>
