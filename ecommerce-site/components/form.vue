<template>
  <div class="formall">
    <!-- Progress Bar -->
    <ProgressBar :currentStep="currentStep" />

    <div class="model-wrapper  ">

      <transition name="slide">
        <div v-if="currentStep === 1 || currentStep === 2" class="content1">
          <!-- <Name /> -->
          <div class="name">

            <h1 class="signuphead text-[2vw] w-[60%] pb-[1vw] ">
              Sign Up to Start Shopping
            </h1>

            <p class="subti pb-[1vw]">It takes 3 minutes to complete.</p>

            <p class="pb-[5vw]">

              Complete a short style profile to unlock a curated fashion marketplace. Every ready-to-shop outfit is
              tailored to your taste, budget, and fit—guided by professional stylist principles. No endless scrolling.
              No guesswork. Just the pieces that make sense for you.
            </p>


            <p class="text-[1.2vw] subti  pb-[1vw]">About The Questions</p>

            <p>

              The style profile is made up of 3 simple steps.
              <br /> <br />
              We'll begin with a few essentials—details about you and your appearance (e.g., name, height), to guide fit
              and styling with intention. Then, your preferences: what style you gravitate toward, what you avoid, and
              what works for your budget.
              <br /> <br />
              Each answer refines your shopping experience. Consider it a starting point—for style that's personal, not
              generic.

            </p>

            <!-- <button class="smalllable2 font-semibold">Get Started</button> -->
          </div>
        </div>
        <div v-if="currentStep === 3 || currentStep === 4" class="content1">
          <!-- <Name /> -->
          <div class="name">

            <h1 class="signuphead text-[2vw] w-[60%] pb-[1vw] ">
              Sizeing
            </h1>

            <p class="subti pb-[1vw]">It takes 2 minutes to complete.</p>

            <p class="pb-[5vw]">
              We are gathering your size info. Please provide accurate measurements to ensure the best fit for your personalized shopping experience.
            </p>


            <p class="text-[1.2vw] subti  pb-[1vw]">About The Questions</p>

            <p>

              The sizing will be stored to suggest you better items.
              <br /> <br />
             

            </p>

            <!-- <button class="smalllable2 font-semibold">Get Started</button> -->
          </div>
        </div>
        <div v-if="currentStep === 5" class="content1">
          <!-- <Name /> -->
          <div class="name">

            <h1 class="signuphead text-[2vw] w-[60%] pb-[1vw] ">
              Budget & Preferences
            </h1>

            <p class="subti pb-[1vw]">It takes 4 minutes to complete.</p>

            <p class="pb-[5vw]">

             Select your Budget & Preferences.
            </p>


            <!-- <button class="smalllable2 font-semibold">Get Started</button> -->
          </div>
        </div>
      </transition>


<!-- :class="{ 'content-wide': currentStep !== 1 }" -->
      <div class="content" >


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
            <step-three @next="nextStep" :model="model" :modelPath="modelPath" :morphMesh="morphMesh"
              @update-morph="applyMorphUpdate" />
          </div>
        </transition>

        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <div v-if="currentStep === 4">
            <step-four @next="nextStep" :model="model" :modelPath="modelPath" :morphMesh="morphMesh"
              @update-morph="applyMorphUpdate" />
          </div>
        </transition>

        <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <div v-if="currentStep === 5">
            <final-form @next="nextStep" :model="model" />
          </div>
        </transition>
      </div>

      <ModelViewer :modelPath="modelPath" width="40vw" height="40vh" :morphMesh="morphMesh" />

    </div>
  </div>
</template>

<script>
import StepOne from '~/components/StepOne.vue';
import StepTwo from '~/components/StepTwo.vue';
import StepThree from '~/components/StepThree.vue';
import StepFour from '~/components/StepFour.vue';
import ProgressBar from '~/components/ProgressBar.vue';
import FinalForm from '~/components/FinalForm.vue';
import ModelViewer from "~/components/ModelViewer.vue";
// import Form from "~/components/form.vue";
import Name from '~/components/Name.vue';

export default {
  async asyncData({ params }) {
    console.log("Route Params:", params);
    return { id: params.id };
  },
  components: {
    StepOne, StepTwo, StepThree, StepFour, ProgressBar, FinalForm, ModelViewer, Name
  },
  props: {
    modelPath: String,
    morphMesh: Object,
    model: Object,
  },
  data() {
    return {
      currentStep: 1,
      model: {
        faceShape: null,
        skinTone: null,
        bodySize: null,
      },
      heightValue: 0,
      canvas: null,
      modelPath: null,
      //   morphMesh: reactive({
      //   height: 0,
      // }),
      // morphMesh: {},
      morphMesh: {
        height: 0, // Initialize height morph value
      },
      models: {
        maovam: "/models/maovam.glb",
        squarem: "/models/squarem.glb",
        inrimam: "/models/inrimam.glb",
        inrifem: "/models/inrifem.glb",
        mendefultm: "/models/mendefultm.glb",
        hourt: "/models/hourt.glb",
        squw: "/models/squw.glb",
        applefem: "/models/applefem.glb",
        pearfem: "/models/pearfem.glb",
        athfm: "/models/athfm.glb",
      },

    };
  },
  mounted() {
    this.modelPath = this.models[this.$route.params.id] || null;
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
    updateHeight() {
      this.$set(this.morphMesh, 'height', this.heightValue); // Ensure Vue reactivity
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

  }
};
</script>

<style scoped>
.signuphead{
  font-weight: 800;
  line-height: 110%;
  font-family: Arial, Helvetica, sans-serif;
}

.name{
  pointer-events: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    font-size: .9vw;

    font-weight: 100;
    font-family: 'inter';
    font-family: "Inter", sans-serif;
    font-family: "Roboto", sans-serif;
    /* font-family: 'typewriter'; */
}

.subti{
  font-weight: 400;
}

.formall {
  width: 100%;
  height: 100%;
  height: 100vh;
}

.model-wrapper {
  display: flex;
  width: 100vw;
  height: 100%;
  /* top: 5vh; */
  /* background-color: #ffffff; */
  /* padding-top: 5vh; */
  /* margin-top: 7vh; */
  position: relative;
  /* border-top: #333 solid .1vw; */
  /* border-bottom: #333 solid .1vw; */
  justify-content: center;
  /* margin-top: 4vh; */
  z-index: 0;

}

.model-viewer {
  /* width: 50vw; */
  /* height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-wide {
  width: 100% !important;
  /* width: 84% !important; */
  height: 100%;
  padding: 20px;
  background-color: #e7ecea;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  z-index: 2;
  border-right: #333 solid .1vw;
  overflow: scroll;
  transition: width 0.5s ease-in-out;
}

.content {
  width: 50%;
  height: 100%;
  padding: 20px;
  background-color: #e7ecea;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  z-index: 2;
  border-right: #333 solid .1vw;
  overflow: scroll;
  transition: width 0.5s ease-in-out;
}

.content1 {
  width: 30%;
  height: 100%;
  padding: 20px;
  background-color: #f9f9f1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  z-index: 2;
  border-right: #333 solid .1vw;
  overflow: scroll;
}

.content h1 {
  font-size: 2rem;
  text-align: center;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
}

.slide-enter {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-enter-to {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave {
  transform: translateX(0);
  opacity: 1;
}

.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}


@media only screen and (max-width: 768px) {

  .model-wrapper {
    display: flex;
    width: 100vw;
    height: 100%;
    top: 40vh;
    /* top: 5vh; */
    /* background-color: #ffffff; */
    /* padding-top: 5vh; */
    position: relative;
    /* border-top: #333 solid .1vw; */
    /* border-bottom: #333 solid .1vw; */
    justify-content: center;
    margin-top: 4vh;
    z-index: 0;
    flex-direction: column;
  }

  .content1 {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #f9f9f1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    z-index: 2;
    border-right: #333 solid .1vw;
    overflow: visible;
  }

  .content {
    width: 100%;
    height: 100%;
    padding: 20px;
    background-color: #e7ecea;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
    z-index: 2;
    border-right: #333 solid .1vw;
    overflow: visible;
    transition: width 0.5s ease-in-out;

  }

  .model-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    overflow: visible;
    height: max-content;
  }

}
</style>