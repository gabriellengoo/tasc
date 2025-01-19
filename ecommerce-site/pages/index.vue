<template>
  <div class="p-[1vw]">
    <ThreeModel />
    <div class="h-[100vh] pl-[2vw] w-[100%] hometext">
   <div class="maintexthome">
    <h1 class="mb-4  uppercase">Build your avatar to start <br/>  shopping -- it's free</h1>
    <p class="mb-4" >bla bla</p>
   </div>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      /> -->
    </div>
  </div>
</template>

<script>
import ProductCard from '~/components/ProductCard.vue';
import ThreeModel from '~/components/ThreeModel.vue';

export default {
  components: { ProductCard,  ThreeModel },
  data() {
    return {
      products: [
        { id: 1, name: 'Red Dress', price: 49.99, image: '/dress1.jpg' },
        { id: 2, name: 'Blue Jeans', price: 39.99, image: '/jeans1.jpg' }
      ]
    };
  }
};
</script>
