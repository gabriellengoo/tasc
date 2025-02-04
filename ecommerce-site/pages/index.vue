<template>
  <div class="p-[1vw] relative">
    <!-- <ThreeModel /> -->
    <ImageScroller />
    <div class="h-[100vh] pl-[2vw] w-[100%] hometext">
      <div class="maintexthome">
        <h1 class="mb-4 pr-[2vw] homesub">
          Personalized Shopping Powered by Tasc AI
        </h1>
        <h1 class="mb-4 pr-[2vw] homesub2 uppercase">
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
      class="infobut absolute bottom-[5vw] right-4 w-[5vw]"
      @click="toggleInfo"
    >
    <svg fill="#000000" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M1229.93 594.767c36.644 37.975 50.015 91.328 43.72 142.909-9.128 74.877-30.737 144.983-56.093 215.657-27.129 75.623-54.66 151.09-82.332 226.512-44.263 120.685-88.874 241.237-132.65 362.1-10.877 30.018-18.635 62.072-21.732 93.784-3.376 34.532 21.462 51.526 52.648 36.203 24.977-12.278 49.288-28.992 68.845-48.768 31.952-32.31 63.766-64.776 94.805-97.98 15.515-16.605 30.86-33.397 45.912-50.438 11.993-13.583 24.318-34.02 40.779-42.28 31.17-15.642 55.226 22.846 49.582 49.794-5.39 25.773-23.135 48.383-39.462 68.957l-1.123 1.416a1559.53 1559.53 0 0 0-4.43 5.6c-54.87 69.795-115.043 137.088-183.307 193.977-67.103 55.77-141.607 103.216-223.428 133.98-26.65 10.016-53.957 18.253-81.713 24.563-53.585 12.192-112.798 11.283-167.56 3.333-40.151-5.828-76.246-31.44-93.264-68.707-29.544-64.698-8.98-144.595 6.295-210.45 18.712-80.625 46.8-157.388 75.493-234.619l2.18-5.867 1.092-2.934 2.182-5.87 2.182-5.873c33.254-89.517 67.436-178.676 101.727-267.797 31.294-81.296 62.72-162.537 93.69-243.95 2.364-6.216 5.004-12.389 7.669-18.558l1-2.313c6.835-15.806 13.631-31.617 16.176-48.092 6.109-39.537-22.406-74.738-61.985-51.947-68.42 39.4-119.656 97.992-170.437 156.944l-6.175 7.17c-15.78 18.323-31.582 36.607-47.908 54.286-16.089 17.43-35.243 39.04-62.907 19.07-29.521-21.308-20.765-48.637-3.987-71.785 93.18-128.58 205.056-248.86 350.86-316.783 60.932-28.386 146.113-57.285 225.882-58.233 59.802-.707 116.561 14.29 157.774 56.99Zm92.038-579.94c76.703 29.846 118.04 96.533 118.032 190.417-.008 169.189-182.758 284.908-335.53 212.455-78.956-37.446-117.358-126.202-98.219-227.002 26.494-139.598 183.78-227.203 315.717-175.87Z" fill-rule="evenodd"></path> </g></svg>
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
