<!-- <template>
    <div>
      <h1 class="text-2xl font-bold mb-4">{{ product.name }}</h1>
      <WebGLCanvas />
      <p class="mt-4 text-gray-600">{{ product.description }}</p>
      <p class="text-lg font-bold">{{ product.price | currency }}</p>
      <button
        @click="$store.commit('cart/addToCart', product)"
        class="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
      >
        Add to Cart
      </button>
    </div>
  </template>
  
  <script>
  import WebGLCanvas from '~/components/WebGLCanvas.vue';
  
  export default {
    components: { WebGLCanvas },
    async asyncData({ params }) {
      const products = [
        { id: 1, name: 'Red Dress', price: 49.99, description: 'A beautiful red dress.' },
        { id: 2, name: 'Blue Jeans', price: 39.99, description: 'Comfortable blue jeans.' }
      ];
      const product = products.find((item) => item.id === parseInt(params.id));
      return { product };
    }
  };
  </script>
   -->