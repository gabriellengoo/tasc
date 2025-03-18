<template>
  <div>
    <h2 class="smalllable2 font-semibold pb-[2vw]">Please tell us about any clothing fit challenges you face (optional)</h2>

    <div class="formstyle">
      <!-- Neck Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 0" class="form-section">
          <h3 class="smalllable1">Neck</h3>
          <div class="stepbtncontainer">
            <button v-for="option in neckOptions" :key="option" 
                    @click="selectOption('neck', option)"
                    :class="{'selected': formData.neck === option}"
                    class="btns">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Shoulders Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 1" class="form-section">
          <h3 class="smalllable1">Shoulders</h3>
          <div class="stepbtncontainer">
            <button v-for="option in shoulderOptions" :key="option" 
                    @click="selectOption('shoulders', option)"
                    :class="{'selected': formData.shoulders === option}"
                    class="btns">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Arms Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 2" class="form-section">
          <h3 class="smalllable1">Arms</h3>
          <div class="stepbtncontainer">
            <button v-for="option in armOptions" :key="option" 
                    @click="selectOption('arms', option)"
                    :class="{'selected': formData.arms === option}"
                    class="btns">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Bust Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 3" class="form-section">
          <h3 class="smalllable1">Bust</h3>
          <div class="stepbtncontainer">
            <button v-for="option in bustOptions" :key="option" 
                    @click="selectOption('bust', option)"
                    :class="{'selected': formData.bust === option}"
                    class="btns">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Stomach Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 4" class="form-section">
          <h3 class="smalllable1">Stomach</h3>
          <div class="stepbtncontainer">
            <button v-for="option in stomachOptions" :key="option" 
                    @click="selectOption('stomach', option)"
                    :class="{'selected': formData.stomach === option}"
                    class="btns">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Bum Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 5" class="form-section">
          <h3 class="smalllable1">Bum</h3>
          <div class="stepbtncontainer">
            <button v-for="option in bumOptions" :key="option" 
                    @click="selectOption('bum', option)"
                    :class="{'selected': formData.bum === option}"
                    class="btns">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Hips Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 6" class="form-section">
          <h3 class="smalllable1">Hips</h3>
          <div class="stepbtncontainer">
            <button v-for="option in hipOptions" :key="option" 
                    @click="selectOption('hips', option)"
                    :class="{'selected': formData.hips === option}"
                    class="btns">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Legs Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 7" class="form-section">
          <h3 class="smalllable1">Legs</h3>
          <div class="stepbtncontainer">
            <button v-for="option in legOptions" :key="option" 
                    @click="selectOption('legs', option)"
                    :class="{'selected': formData.legs === option}"
                    class="btns">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>
    </div>

    <!-- Navigation Buttons -->
    <div class="flex">
      <button class="nextbtn" @click="nextStep">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#000000"
                stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
      <button class="nextbtn2" @click="nextStep">Skip?</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentChunk: 0,
      formData: {
        neck: null,
        shoulders: null,
        arms: null,
        bust: null,
        stomach: null,
        bum: null,
        hips: null,
        legs: null,
      },
      neckOptions: ["Thick", "Long", "Short", "Narrow"],
      shoulderOptions: ["Broad Shoulders", "Narrow Shoulders"],
      armOptions: ["Long", "Short", "Thick", "Slim"],
      bustOptions: ["Large Bust", "Small Bust"],
      stomachOptions: ["Prominent Stomach", "Slim Waist"],
      bumOptions: ["Full Bum", "Flat Bum"],
      hipOptions: ["Wide Hips", "Narrow Hips"],
      legOptions: ["Long Legs", "Short Legs", "Thick Legs", "Slim Legs"],
    };
  },
  methods: {
    selectOption(category, option) {
      this.formData[category] = option;
      this.nextStep();
    },
    nextStep() {
      if (this.currentChunk < 7) {
        this.currentChunk++;
      } else {
        this.$emit('next', this.formData); // Emit data to parent
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
    }
  }
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
} */
</style>
