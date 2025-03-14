<template>
<div>
  <h1 class="headerform">Step 1 - Basic infomation</h1>
  <div class="formstyle">
 
    <label class="smalllable1" for="name">What's your full name?</label>
    <input class="inputa" v-model="formData.name" id="name" />
    
    <label class="smalllable" for="email">What's your e-mail?</label>
    <input class="inputa" type="email" v-model="formData.email" id="email" />

    <label class="smalllable" for="age">Please select your age range</label>
    <div class="stepbtncontainer">
      <button class="btns" v-for="age in ageRanges" :key="age" 
              :class="{'selected': formData.age === age}" 
              @click="selectAge(age)">
        {{ age }}
      </button>
    </div>

  
  </div>
  <div class="flex"><button class="nextbtn" @click="nextStep"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#000000" stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
    <h3 class="smalllable2 m-[1vw]">
      Already have an account? <a href="" class="underline smalllable2 text-[grey]">Log in here.</a></h3>
    </div>
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





