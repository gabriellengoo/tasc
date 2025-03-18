<template>
  <div>
    <h2 class="headerform">Step 2 - Face</h2>

    <div class="formstyle">
      <!-- Hair Texture Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 0" class="form-section">
          <h3 class="smalllable1">Hair Texture</h3>
          <div class="stepbtncontainer " >
            <button 
              v-for="option in ['Straight', 'Wavy', 'Curly', 'Afro']"
              :key="option"
              class="btns"
              :class="{ selected: selectedHairTexture === option }"
              @click="selectOption('hairTexture', option)">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>
      
      <!-- Hair Length Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 1" class="form-section">
          <h3 class="smalllable1">Hair Length</h3>
          <div class="stepbtncontainer">
            <button 
              v-for="option in ['Bald', 'Short', 'Medium', 'Long']"
              :key="option"
              class="btns"
              :class="{ selected: selectedHairLength === option }"
              @click="selectOption('hairLength', option)">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Hair Color Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 2" class="form-section">
          <h3 class="smalllable1">Hair Colour</h3>
          <div class="stepbtncontainer2">
            <button 
              v-for="option in ['⬛', '🟫', '🟨', '🟥', '🟧', '⬜']"
              :key="option"
              class="btnsimg"
              :class="{ selected2: selectedHairColor === option }"
              @click="selectOption('hairColor', option)">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Skin Tone Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 3" class="form-section">
          <h3 class="smalllable1">Skin Tone Selection</h3>
          <div class="stepbtncontainer2">
            <button 
              v-for="option in ['👋🏻', '👋🏼', '👋🏽', '👋🏾', '👋🏿']"
              :key="option"
              class="btnsimg"
              :class="{ selected2: selectedSkinTone === option }"
              @click="selectOption('skinTone', option)">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Eye Colour Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 4" class="form-section">
          <h3 class="smalllable1">Eye Colour</h3>
          <div class="stepbtncontainer">
            <button 
              v-for="option in ['Blue', 'Green', 'Brown', 'Hazel', 'Grey']"
              :key="option"
              class="btns"
              :class="{ selected: selectedEyeColor === option }"
              @click="selectOption('eyeColor', option)">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>
    </div>

    <button class="nextbtn" @click="nextStep">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#000000"
          stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentChunk: 0,
      selectedHairTexture: "",
      selectedHairLength: "",
      selectedHairColor: "",
      selectedSkinTone: "",
      selectedEyeColor: "",
    };
  },
  methods: {
    selectOption(category, option) {
      this[`selected${this.capitalize(category)}`] = option;
      this.nextStep();
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    nextStep() {
      if (this.currentChunk < 4) {
        this.currentChunk++;
      } else {
        this.$emit("next", {
          hairTexture: this.selectedHairTexture,
          hairLength: this.selectedHairLength,
          hairColor: this.selectedHairColor,
          skinTone: this.selectedSkinTone,
          eyeColor: this.selectedEyeColor,
        });
      }
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
  },
};
</script>

<style scoped>

/* .selected {
  background-color: #4CAF50;
  color: white;
}
.selected2 {
  background-color: #FF5733;
  color: white;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}
.nextbtn {
  margin-top: 20px;
} */
</style>