<template>
  <div>
    <h1 class="headerform">Step 1 - Basic Information</h1>

    <div class="formstyle">
      <!-- Name Section -->


      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 0" class="form-section">
          <label class="smalllable" for="email">E-mail?</label>
          <input class="inputa" type="email" v-model="formData.email" id="email" placeholder="johndoe@myemail.com" />


          <div class="getstcont">
            <button class="getsrat" @click="handleNextClick">Get started</button>
          </div>


          <div class="or-divider">
            <span>Or</span>
          </div>

          <div class="social-login">
            <button @click="signInWithGoogle" class="social-btn google"> <img src="/google.png"
                class="socialimg" /></button>
            <button @click="signInWithFacebook" class="social-btn facebook"><img src="/facebook.png"
                class="socialimg" /></button>
            <button @click="signInWithApple" class="social-btn apple"><img src="/applel.png"
                class="socialimg" /></button>
          </div>
        </div>
      </transition>


      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 1" class="form-section">
          <label class="smalllable" for="name">Full Name</label>
          <input class="inputa" v-model="formData.name" id="name" placeholder="John Doe" />

          <label class="smalllable" for="password">Password</label>
          <div class="relative">
            <input class="inputa" :type="showPassword ? 'text' : 'password'" v-model="formData.password" id="password"
              placeholder="Enter your password" />
            <button class="smalllable3" type="button" @click="showPassword = !showPassword">
              {{ showPassword ? 'Hide' : 'Show' }}
            </button>
          </div>

        </div>
      </transition>


      <!-- Age Selection Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 2" class="form-section">
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

    <div v-if="currentChunk !== 0" class="nav-buttons">
      <button class="" @click="prevChunk" v-if="currentChunk > 2">↰</button>
      <button class="bg-[white] text-[black]" @click="handleNextClick">
        {{ currentChunk === totalChunks - 1 ? "↳" : "↱" }}
      </button>
    </div>

    <!-- Already Have an Account -->
    <h3 v-if="currentChunk === 0" class="smalllable3 m-[1vw]">
      Already have an account? <a href="" class="underline smalllable3 font-semibold text-[grey]">Log in here.</a>
    </h3>
  </div>
</template>

<script>

// import { auth, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup } from "~/plugins/firebase.js";

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
      showPassword: false, 
      ageRanges: ["18-24", "25-34", "35-44", "45-59", "60+"],
      alphabet: ["A", "B", "C", "D", "E"], // Add letters for options
    };
  },
  methods: {
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        this.formData.email = result.user.email;
        console.log("Google Sign-in Success:", result.user);
      } catch (error) {
        console.error("Google Sign-in Error:", error);
      }
    },
    async signInWithFacebook() {
      const provider = new FacebookAuthProvider();
      try {
        const result = await signInWithPopup(auth, provider);
        this.formData.email = result.user.email;
        console.log("Facebook Sign-in Success:", result.user);
      } catch (error) {
        console.error("Facebook Sign-in Error:", error);
      }
    },
    async signInWithApple() {
      // Apple requires a backend, so this would need a server setup
      console.log("Apple Sign-in is not yet implemented.");
    },
    nextChunk() {
      if (this.currentChunk < 3) {
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
