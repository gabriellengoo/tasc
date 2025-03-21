<template>
  <div>
    <h2 class="smalllable2 font-semibold pb-[2vw]">Please tell us about any clothing fit challenges you face (optional)
    </h2>

    <div class="formstyle">
      <!-- Neck Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 0" class="form-section">
          <h3 class="smalllable1">Neck</h3>
          <div class="stepbtncontainer">
            <button v-for="option in neckOptions" :key="option" @click="selectOption('neck', option)"
              :class="{ 'selected': formData.neck === option }" class="btns">
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
            <button v-for="option in shoulderOptions" :key="option" @click="selectSholders(option)"
              :class="{ 'selected': formData.sholders === option }" class="btns">
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
            <button v-for="option in armOptions" :key="option" @click="selectOption('arms', option)"
              :class="{ 'selected': formData.arms === option }" class="btns">
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
            <button v-for="option in bustOptions" :key="option" @click="selectOption('bust', option)"
              :class="{ 'selected': formData.bust === option }" class="btns">
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
            <button v-for="option in stomachOptions" :key="option" @click="selectStomach(option)"
              :class="{ 'selected': formData.stomach === option }" class="btns">
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
            <button v-for="option in bumOptions" :key="option" @click="selectOption('bum', option)"
              :class="{ 'selected': formData.bum === option }" class="btns">
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
            <button v-for="option in hipOptions" :key="option" @click="selectHips(option)"
              :class="{ 'selected': formData.hips === option }" class="btns">
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
            <button v-for="option in legOptions" :key="option" @click="selectOption('legs', option)"
              :class="{ 'selected': formData.legs === option }" class="btns">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>
    </div>

    <div class="flex">
      <button class="nextbtn" @click="nextStep">
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7"
            stroke="#000000" stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path>
        </svg>
      </button>
      <button class="nextbtn2" @click="nextStep">Skip?</button>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    modelPath: String,
    morphMesh: Object,
    model: Object,
  },
  data() {
    return {
      morphMesh: {
        height: 0,
        sholders: 0,
        waist: 0,
        hips: 0,
      },
      currentChunk: 0,
      formData: {
        neck: null,
        sholders: null,
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
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      el.offsetHeight; // Trigger reflow
      el.style.transition = 'opacity 0.5s';
      el.style.opacity = 1;
      done();
    },
    leave(el, done) {
      el.style.transition = 'opacity 0.5s';
      el.style.opacity = 0;
      done();
    },
    selectOption(category, option) {
      this.formData[category] = option;
      this.nextStep();
    },
    selectSholders(option) {
      this.formData.sholders = option;
      this.$set(this.morphMesh, 'sholders', option === "Broad Shoulders" ? 1 : -1);
      this.nextStep();
    },
    selectStomach(option) {
      this.formData.stomach = option;
      this.$set(this.morphMesh, 'waist', option === "Prominent Stomach" ? 1 : -1);
      this.nextStep();
    },
    selectHips(option) {
      this.formData.hips = option;
      this.$set(this.morphMesh, 'hips', option === "Wide Hips" ? 1 : -1);
      this.nextStep();
    },
    updateHeight() {
      this.$set(this.morphMesh, 'height', this.heightValue);
    },
    nextStep() {
      if (this.currentChunk < 7) {
        this.currentChunk++;
      } else {
        this.$emit('next', this.formData);
      }

    },

    
  }
};
</script>
