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
  <footer class="footerstyle flex bottom-0 left-0 w-full">
    <div class="w-[33.3vw] footline">
      <div  class="fotsections flex md:text-5xl font-heading w-9/16">
      <a
        target="_blank"
        
        class="w-full p-2"
      >
          Companey
      </a>
    </div>
    <div  class="fotsections2 footerstyle flex flex-col md:text-5xl font-heading w-9/16">
      <a
        target="_blank"
        
        class="w-full p-2"
      >
          About
      </a>
      <a
        target="_blank"
        
        class="w-full p-2"
      >
          Contact us
      </a>
    </div>
  </div>
  <div class="w-[33.3vw] footline">
      <div  class="fotsections flex md:text-5xl font-heading w-9/16">
      <a
        target="_blank"
        
        class="w-full p-2"
      >
          Customer services
      </a>
    </div>
    <div  class="fotsections2 footerstyle flex md:text-5xl font-heading w-9/16">
      <a
        target="_blank"
        
        class="w-full p-2"
      >
          FAQ's
      </a>
    </div>
  </div>
  <div class="w-[33.3vw]">
      <div  class="fotsections flex md:text-5xl font-heading w-9/16">
      <a
        target="_blank"
        
        class="w-full p-2"
      >
          Socials
      </a>
    </div>
    <div  class="fotsections2 footerstyle flex md:text-5xl font-heading w-9/16">
      <a
        target="_blank"
        
        class="w-full p-2"
      >
          Facebook
      </a>
    </div>
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
