<template>
  <div>
    <h1 class="headerform">Step 1 - Basic Information</h1>

    <div class="formstyle">
      <!-- Name Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 0" class="form-section">
          <label class="smalllable" for="name">Full Name</label>
          <input class="inputa" v-model="formData.name" id="name" placeholder="John Doe" />

          <label class="smalllable" for="email">E-mail</label>
          <input class="inputa" type="email" v-model="formData.email" id="email" placeholder="johndoe@myemail.com" />
        </div>
      </transition>


      <!-- Age Selection Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 1" class="form-section">
          <label class="smalllable" for="age">Age range</label>
          <div class="stepbtncontainer">
            <button class="btns" v-for="(age, index) in ageRanges" :key="age"
              :class="{ selected: formData.age === age }" @click="selectAge(age)">
              {{ alphabet[index] }}. {{ age }}
            </button>
          </div>

        </div>
      </transition>
    </div>

    <div class="nav-buttons">
      <button class="" @click="prevChunk" v-if="currentChunk > 0">↰</button>
      <button class="bg-[white] text-[black]" @click="handleNextClick">
        {{ currentChunk === totalChunks - 1 ? "↳" : "↱" }}
      </button>
    </div>

    <!-- Already Have an Account -->
    <h3 v-if="currentChunk === 0" class="smalllable2 m-[1vw]">
      Already have an account? <a href="" class="underline smalllable2 text-[grey]">Log in here.</a>
    </h3>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentChunk: 0,
      totalChunks: 2,
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
    handleNextClick() {
      if (this.currentChunk === this.totalChunks - 1) {
        this.submitForm();
      } else {
        this.nextChunk();
      }
    },
    nextChunk() {
      if (this.currentChunk < this.totalChunks - 1) {
        this.currentChunk++;
      }
    },
    prevChunk() {
      if (this.currentChunk > 0) {
        this.currentChunk--;
      }
    },
    submitForm() {
      console.log("Form submitted:", this.formData);
      // this.$emit("submit", this.formData);
      this.$emit('next', this.formData);
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
  transition: 0.5s ease-in-out;
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

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter,
.slide-leave-to {
  transform: translateY(100%);
}

.nextbtn {
  margin-top: 20px;
}
</style>
