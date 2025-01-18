<template>
  <header
    class="fixed  text-[1vw] p-[1vw] z-20 w-full pt-8 text-xs leading-snug uppercase bg-white  md:pb-2 md:pt-2"
  >
    <div
      class="relative flex flex-wrap items-end gap-4  md:items-start md:flex-nowrap"
    > 

      <nav class="hidden navlinks w-1/16 ">
        <!-- <div class="pr-[2vw]"> -->
          <NuxtLink class="logo pr-[2vw]" to="/">Tasc</NuxtLink>
        <!-- </div> -->
        <div class="linkscol flex-col pr-[2vw] w-1/16 md:flex ">
          <NuxtLink class="" to="/mens">Menswear</NuxtLink>
          <NuxtLink class="" to="/womens">Womenswear</NuxtLink>
        </div>
        <div class="flex items-center">
          <span class="block mr-[5vw] uppercase">title</span>
          <span class="block">
            <a href="title">
              title
            </a>
          
          </span>
        </div>
        <!-- <NuxtLink to="/production">Production</NuxtLink> -->
      </nav>
      <!-- <Animation></Animation>
      <div class="flex-col hidden normal-case md:flex">
        <div class="flex" v-for="item in contact" :key="item._key">
          <span class="block w-24 uppercase">{{ item.title }}</span>
          <span class="block">
            <a :href="item.link.link" v-if="item.link.link">{{
              item.link.title
            }}</a>
            <span v-else>{{ item.link.title }}</span>
          </span>
        </div>
      </div> -->
    
      <!-- <button
        class="absolute bottom-0 right-0 w-6 h-4 md:hidden"
        @click="TOGGLE_MENU()"
      > -->
      <button
        class=" bottom-0 right-0 w-6 h-4 md:hidden"
        @click="TOGGLE_MENU()"
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
      </button>
    </div>
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