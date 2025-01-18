<!-- <template>
    <div class="border p-4 rounded shadow">
      <nuxt-img :src="product.image" alt="Product Image" class="w-full h-48 object-cover" />
      <h3 class="text-lg font-bold mt-2">{{ product.name }}</h3>
      <p class="text-gray-600">{{ product.price | currency }}</p>
      <button
        @click="$store.commit('cart/addToCart', product)"
        class="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        required: true
      }
    }
  };
  </script>
   -->