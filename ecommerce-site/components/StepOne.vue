<template>
  <div>
    <h1 class="headerform">Step 1 - Basic Information</h1>
    
    <div class="formstyle">
      <!-- Name Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 0" class="form-section">
          <label class="smalllable" for="name">Full Name</label>
          <input class="inputa" v-model="formData.name" id="name" placeholder="John Doe"/>

          <label class="smalllable" for="email">E-mail</label>
          <input class="inputa" type="email" v-model="formData.email" id="email" placeholder="johndoe@myemail.com" />
          <button class="nextbtn" @click="nextChunk"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#000000"
          stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg></button>
        </div>
      </transition>


      <!-- Age Selection Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 1" class="form-section">
          <label class="smalllable" for="age">Age range</label>
          <div class="stepbtncontainer">
            <button class="btns" v-for="(age, index) in ageRanges" :key="age" 
                    :class="{ selected: formData.age === age }" 
                    @click="selectAge(age)">
              {{ alphabet[index] }}. {{ age }}
            </button>
          </div>
          <button class="nextbtn" @click="submitForm"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#000000"
          stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg></button>
        </div>
      </transition>
    </div> 

    <!-- Already Have an Account -->
    <h3 class="smalllable2 m-[1vw]">
      Already have an account? <a href="" class="underline smalllable2 text-[grey]">Log in here.</a>
    </h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentChunk: 0,
      formData: {
        name: '',
        email: '',
        age: ''
      },
      ageRanges: ["18-24", "25-34", "35-44", "45-59", "60+"],
      alphabet: ["A", "B", "C", "D", "E"], // Add letters for options
    };
  },
  methods: {
    nextChunk() {
      if (this.currentChunk < 2) {
        this.currentChunk++;
      }
    },
    selectAge(age) {
      this.formData.age = age;
    },
    submitForm() {
      this.$emit('next', this.formData); // Emit data to parent
    },
    beforeEnter(el) {
      el.style.transform = 'translateY(100%)';
    },
    enter(el, done) {
      el.offsetHeight;
      el.style.transition = 'transform 0.5s ease';
      el.style.transform = 'translateY(0)';
      done();
    },
    leave(el, done) {
      el.style.transition = 'transform 0.5s ease';
      el.style.transform = 'translateY(-100%)';
      done();
    },
  }
};
</script>

<style scoped>
.formstyle {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.stepbtncontainer {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.btns {
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  width: 24vw;
  text-align: left;
  border-radius: 5px;
}
.smalllable {
  font-size: 1.5vw;
  padding-bottom: 1vw;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}
.nextbtn {
  margin-top: 20px;
}
</style>
