<template>
  <div class="p-[1vw] relative">
    <!-- <ThreeModel /> -->
    <ImageScroller />
    <div class="h-[100vh] pl-[2vw] w-[100%] hometext">
      <div class="maintexthome">
        <h1 class="mb-4 pr-[2vw] homesub2">
          Personalized Shopping Powered by Tasc AI
        </h1>
        <h1 class="mb-4 pr-[2vw] uppercase">
          Select 1 of 10 body types <br />
          <span>or login to shop</span>
        </h1>
        <p class="mb-4 homesub">
          Build your DigiMe or login to experience the TASC fashion marketplace,
          featuring a curated selection of well known and boutique brands. Get
          ready-to-wear outfit recommendations, based on your preferences.
        </p>
      </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      /> -->
    </div>

    <!-- Button -->
    <button
      class="infobut absolute bottom-4 right-4 w-[5vw]"
      @click="toggleInfo"
    >
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 17V11" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> <circle cx="1" cy="1" r="1" transform="matrix(1 0 0 -1 11 9)" fill="#000000"></circle> <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#000000" stroke-width="1.5" stroke-linecap="round"></path> </g></svg>
    </button>

    <!-- Sliding Info Section -->
    <div
      :class="['slideinfo fixed top-0 bottom-0 right-0 transition-transform duration-300', { 'translate-x-full': !isInfoVisible, 'translate-x-0': isInfoVisible }]"
    >
      <div class="slideinfotext p-4">
        <h2 class=" font-bold mb-4">Additional Information</h2>
        <p>
          Explore a wide range of products and build your perfect digital
          shopping experience. From personalized outfits to curated brand
          recommendations, we have it all.
        </p>
        <button
          class="mt-4 bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
          @click="toggleInfo"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "~/components/ProductCard.vue";
import ThreeModel from "~/components/ThreeModel.vue";
import ImageScroller from "~/components/ImageScroller.vue";

export default {
  components: { ProductCard, ThreeModel },
  data() {
    return {
      products: [
        { id: 1, name: "Red Dress", price: 49.99, image: "/dress1.jpg" },
        { id: 2, name: "Blue Jeans", price: 39.99, image: "/jeans1.jpg" },
      ],
      isInfoVisible: false, // To control the visibility of the sliding info section
    };
  },
  methods: {
    toggleInfo() {
      this.isInfoVisible = !this.isInfoVisible;
    },
  },
};
</script>
