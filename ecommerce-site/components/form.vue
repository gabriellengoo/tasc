<template>
    <div>
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
     
      <!-- Additional steps go here -->
    </div>
  </template>
  
  <script>
  import StepOne from '~/components/StepOne.vue';
  import StepTwo from '~/components/StepTwo.vue';
  import StepThree from '~/components/StepThree.vue';
  import StepFour from '~/components/StepFour.vue';
  
  export default {
    components: { StepOne, StepTwo , StepThree , StepFour },
    data() {
      return {
        currentStep: 1,
        model: {
          faceShape: null,
          skinTone: null,
          height: null,
          bodySize: null,
          // Add more model properties here...
        }
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
    }
    }
  };
  </script>

  <style scoped>

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}

/* Global Styles */
html, body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f4f7fa; /* Light background for the whole page */
  color: #333; /* Dark text color for readability */
}

/* Container for the form */
.form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff; /* White background for the form */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin-top: 30px;
}

/* Title and Step Indicator */
.form-container h1 {
  font-size: 2rem;
  color: #444;
  margin-bottom: 20px;
  text-align: center;
}

/* Sub-title or instructions */
.form-container p {
  font-size: 1rem;
  color: #777;
  margin-bottom: 20px;
  text-align: center;
}

/* Form Step */
.form-step {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

/* Input Fields */
input[type="text"], input[type="email"], select {
  padding: 10px;
  font-size: 1rem;
  margin: 10px 0;
  border-radius: 5px;
  border: 1px solid #ddd;
  outline: none;
  transition: border-color 0.3s ease;
}

/* Focus state for inputs */
input[type="text"]:focus, input[type="email"]:focus, select:focus {
  border-color: #3498db; /* Highlight border when focused */
  box-shadow: 0 0 5px rgba(52, 152, 219, 0.3); /* Optional focus effect */
}

/* Labels for inputs */
label {
  font-size: 1.1rem;
  color: #555;
  margin-bottom: 5px;
}

/* Button Styling */
button {
  background-color: #3498db;
  color: #fff;
  font-size: 1.1rem;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 20px;
  align-self: center;
}

/* Hover effect for buttons */
button:hover {
  background-color: #2980b9;
}

/* Button disabled state */
button:disabled {
  background-color: #aaa;
  cursor: not-allowed;
}

/* Progress Bar between steps */
.progress-bar {
  width: 100%;
  height: 8px;
  background-color: #e0e0e0;
  margin: 20px 0;
  border-radius: 5px;
}

.progress-bar span {
  display: block;
  width: 0;
  height: 100%;
  background-color: #3498db;
  border-radius: 5px;
  transition: width 0.3s ease;
}

/* Step navigation and buttons */
.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.prev-button, .next-button {
  padding: 10px 15px;
  font-size: 1rem;
  background-color: #ecf0f1;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.prev-button:hover, .next-button:hover {
  background-color: #bdc3c7;
}

/* Error messages or warnings */
.error-message {
  color: red;
  font-size: 0.9rem;
  margin-top: 5px;
}

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }

  .form-container h1 {
    font-size: 1.5rem;
  }

  input[type="text"], input[type="email"], select {
    font-size: 1rem;
    padding: 8px;
  }

  button {
    padding: 10px 18px;
  }

  .navigation-buttons {
    flex-direction: column;
    align-items: center;
  }

  .prev-button, .next-button {
    width: 100%;
    margin-bottom: 10px;
  }
}


</style>
  