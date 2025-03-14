<template>
  <div>
    <!-- Progress Bar -->
    <ProgressBar :currentStep="currentStep" />

    <!-- Form Steps -->
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="currentStep === 1" >
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
        <step-three :heightMorphValue="heightMorphValue"  :setMorphValue="updateMorphTarget" @next="nextStep" ref="avatarModel" :model="model" />
      </div>
    </transition>
     
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="currentStep === 4">
        <step-four @next="nextStep" :model="model" />
      </div>
    </transition>

    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div v-if="currentStep === 5">
        <FinalForm @next="nextStep" :model="model" />
      </div>
    </transition>
     
    <!-- Additional steps go here -->
  </div>
</template>

<script>
import StepOne from '~/components/StepOne.vue';
import StepTwo from '~/components/StepTwo.vue';
import StepThree from '~/components/StepThree.vue';
import StepFour from '~/components/StepFour.vue';
import ProgressBar from '~/components/ProgressBar.vue'; // Import the ProgressBar component
import FinalForm from "~/components/FinalForm.vue";

export default {
  props: ["model", ],
  props: { 
    model: String,
    heightMorphValue: { type: Number, default: 0 } // New prop for height morph
  },
  components: { StepOne, StepTwo , StepThree , StepFour, ProgressBar, FinalForm }, // Register the ProgressBar component
  data() {
    return {
      currentStep: 1,
      model: {
        faceShape: null,
        skinTone: null,
        height: null,
        bodySize: null,
        // Add more model properties here...
      },
      heightMorphValue: 0.5,
      morphTargets: {}, 
    }; 
  },
  methods: {
    nextStep(data) {
      if (data) {
        this.model = { ...this.model, ...data }; // Update model with the data from the current step
      }
      this.currentStep++;
    },
    beforeEnter(el) {
      // Set initial styles or logic before enter
      el.style.opacity = 0;
    },
    enter(el, done) {
      // Animate to full opacity when entering
      el.offsetHeight; // Trigger reflow to ensure the transition happens
      el.style.transition = 'opacity 0.5s ease-in-out';
      el.style.opacity = 1;
      done();
    },
    leave(el, done) {
      // Animate to opacity 0 when leaving
      el.style.transition = 'opacity 0.5s ease-in-out';
      el.style.opacity = 0;
      done();
    },
    updateMorphTarget(morphName, value) {
    const model = this.$refs.avatarModel; // Reference your 3D model
    if (model) {
      model.morphTargetInfluences[model.morphTargetDictionary[morphName]] = value;
    }
  }
  }
};
</script>

<style scoped>
/* Add styles for your form as needed */
</style>
