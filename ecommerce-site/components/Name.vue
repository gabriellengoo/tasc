<template>
<div class="name">
  <h1 class="smalllable2 font-semibold">
    Sign up to start shopping</h1>
  <div class="h-[100%] namecon">
 
    <label class="smalllable1" for="name">What's your name?</label>
    <input class="inputa" v-model="formData.name" id="name" />
    
    <label class="smalllable" for="email">What's your e-mail?</label>
    <input class="inputa" type="email" v-model="formData.email" id="email" />

    <label class="smalllable" for="age">Please select your age range</label>
    <div class="stepbtncontainer">
      <button class="btnsn" v-for="age in ageRanges" :key="age" 
              :class="{'selected': formData.age === age}" 
              @click="selectAge(age)">
        {{ age }}
      </button>
    </div>

  
  </div>
  <button class="smalllable2 font-semibold">Sign up</button>
</div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        age: ''
      },
      ageRanges: ["18-24", "25-34", "35-44", "45-59", "60+"]
    };
  },
  methods: {
    selectAge(age) {
      this.formData.age = age;
    },
    nextStep() {
      this.$emit('next', this.formData); // Emit data to parent
    }
  }
};
</script>

<style scoped>

</style>





