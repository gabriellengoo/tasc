<template>
  <div>
    <!-- Progress Bar -->
    <ProgressBar :currentStep="currentStep" />
  <!-- Slider to adjust height -->
  <!-- <div>
      <label>Height:</label>
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        v-model="height"
        @input="updateHeightInModel"
      />
      <span>{{ height }}</span>
    </div> -->

    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="currentStep === 1">
        <step-one @next="nextStep" />
      </div>
    </transition>

    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="currentStep === 2">
        <step-two @next="nextStep" :model="model" />
      </div>
    </transition>

    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="currentStep === 3">
        <step-three @next="nextStep" :model="model" />
      </div>
    </transition>

    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="currentStep === 4">
        <step-four @next="nextStep" :model="model" />
      </div>
    </transition>

    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="currentStep === 5">
        <final-form @next="nextStep" :model="model" />
      </div>
    </transition>
  
  </div>
</template>

<script>
import StepOne from '~/components/StepOne.vue';
import StepTwo from '~/components/StepTwo.vue';
import StepThree from '~/components/StepThree.vue';
import StepFour from '~/components/StepFour.vue';
import ProgressBar from '~/components/ProgressBar.vue';
import FinalForm from '~/components/FinalForm.vue';

export default {
  components: {
    StepOne, StepTwo, StepThree, StepFour, ProgressBar, FinalForm
  },
  data() {
    return {
      currentStep: 1,
      model: {
        faceShape: null,
        skinTone: null,
        bodySize: null,
      },
      height: 0, 
    };
  },
  methods: {
    nextStep(data) {
      if (data) {
        this.model = { ...this.model, ...data };
      }
      if (this.currentStep < 5) {
        this.currentStep++;
      }
    },
    beforeEnter(el) {
      el.style.opacity = 0;
    },
    enter(el, done) {
      el.offsetHeight;
      el.style.transition = 'opacity 0.5s ease-in-out';
      el.style.opacity = 1;
      done();
    },
    leave(el, done) {
      el.style.transition = 'opacity 0.5s ease-in-out';
      el.style.opacity = 0;
      done();
    },

    updateHeightInModel() {
      // Emit event to the parent or model component
      this.$emit('update-height', this.height);
    },
  }
};
</script>
