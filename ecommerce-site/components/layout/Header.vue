<template>
  <!-- bg-[#f9f9f1] -->
  <header
    class="headstyle bg-[#f9f9f1] fixed divinhead h-[5vw]  text-[1vw] p-[1vw] z-20 w-full pt-8 text-xs leading-snug uppercase  md:pb-2 md:pt-2"
  >
    <div
      class=" relative flex flex-wrap items-end gap-4  md:items-start md:flex-nowrap"
    > 
 <a
        class=" bottom-0 right-0 w-6 h-4 "
       href="../"
      >
      <p class="logo pr-[2vw]" >Tasc</p>
        <span
          class="absolute top-0 left-0 w-full transform bg-black h-2px"
          :class="menu ? 'rotate-45 mt-1.5 ' : ''"
        ></span>
        <span
          class="absolute top-0 left-0 w-full mt-1.5 bg-black h-2px"
          :class="menu ? 'opacity-0' : ''"
        ></span>
        <span
          class="absolute left-0 w-full mb-0.5 bg-black h-2px transform"
          :class="menu ? '-rotate-45 mt-1.5 top-0' : 'bottom-0'"
        ></span>
    </a>
    </div>
    <NuxtLink class="more2" to="/womens">menu</NuxtLink> 
    <LayoutMenu v-if="menu"></LayoutMenu>
  </header>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['contact', 'menu']),
  },
  methods: {
    ...mapMutations(['TOGGLE_MENU']),
  },
}
</script>