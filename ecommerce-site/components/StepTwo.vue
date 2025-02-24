<template>
  <div class="formstyle">
    <h1 class="headerform">Step 2</h1>
    <h2 class="subheadform">Adjust Facial Structure</h2>
    <div v-if="Object.keys(morphTargets).length">
      <div class="formscaler" v-for="(morphName, key) in morphTargets" :key="key">
        <label>{{ morphName }}</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          class="slider"
          v-model="morphValues[key]"
          @input="applyMorph(key, morphValues[key])"
        />
      </div>
    </div>
    <div v-else>
      <p>No morph targets detected.</p>
    </div>
    <button @click="nextStep">Next</button>
  </div>
</template>

<script>
export default {
  props: ["model"],
  data() {
    return {
      morphTargets: {},  // Stores named morph targets
      morphValues: {},   // Stores slider values for each morph target
      mesh: null,        // Store the mesh with morph targets
    };
  },

  watch: {
    model: {
      immediate: true,
      handler(newModel) {
        if (newModel) {
          console.log("Model received in StepTwo:", newModel);
          this.updateModel();
        }
      },
    },
  },

  mounted() {
    if (this.model) {
      this.updateModel();
    }
  },

  methods: {
    nextStep() {
        this.$emit('next', this.formData); // Emit data to parent
      },

    updateModel() {
      if (!this.model) {
        console.warn("Model StepTwo not loaded yet");
        return;
      }

      if (!this.mesh) {
        this.mesh = this.model; // Assign the correct mesh
        console.log("StepTwo Mesh Assigned:", this.mesh);
      }

      // Extract morph targets
      if (this.mesh.morphTargetDictionary) {
        // Map raw morph names to more readable names
        const targetMap = {
          "Arm_Mount_Left.001":  "Cheekbones",
          "Arm_Mount_Left.002": "Jaw",
        };

        this.morphTargets = {};

        Object.keys(this.mesh.morphTargetDictionary).forEach((key) => {
          if (targetMap[key]) {
            this.morphTargets[key] = targetMap[key]; // Use readable names
            this.morphValues[key] = 0.5; // Default slider value
          }
        });

        console.log("Mapped Morph Targets StepTwo:", this.morphTargets);
      }

      if (Object.keys(this.morphTargets).length === 0) {
        console.warn("No matching morph targets found in StepTwo.");
      }
    },

    applyMorph(morphKey, value) {
      if (!this.mesh || !this.mesh.morphTargetDictionary) return;

      const index = this.mesh.morphTargetDictionary[morphKey];

      if (index !== undefined) {
        this.$set(this.mesh.morphTargetInfluences, index, value);
        console.log(`StepTwo Applying morph: ${this.morphTargets[morphKey]} (Index: ${index}, Value: ${value})`);
      } else {
        console.warn(`Morph target StepTwo "${morphKey}" not found.`);
      }
    },
  },
};
</script>


<style scoped>

/* Style the slider track (the background) */
.slider {
  webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    height: .3vw;
    background: #d2d2d2;
    border-radius: 5px;
    outline: none;
}

/* Style the thumb (the part you drag) */
.slider::-webkit-slider-thumb {
  -webkit-appearance: none; /* For WebKit browsers */
  appearance: none;
  width: 1vw; /* Width of the thumb */
  height: 1vw; /* Height of the thumb */
  background: #000000; /* Thumb color */
  border-radius: 50%; /* Circular thumb */
  cursor: pointer; /* Make it clear that it's draggable */
  transition: background-color 0.3s ease; /* Smooth transition when hover */
}

.slider::-moz-range-thumb {
  width: 1vw; /* Width of the thumb */
  height: 1vw; /* Height of the thumb */
  background: #000000; /* Thumb color */
  border-radius: 50%; /* Circular thumb */
  cursor: pointer;
}

.slider::-ms-thumb {
  width: 1vw; /* Width of the thumb */
  height: 1vw; /* Height of the thumb */
  background: #000000; /* Thumb color */
  border-radius: 50%; /* Circular thumb */
  cursor: pointer;
}

/* Style the track while dragging */
.slider:active::-webkit-slider-thumb {
  background: #2980b9; /* Darker color when dragging */
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

/* Form Step */
.morph-step {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

/* Input Fields */
input[type="range"] {
  font-size: 1rem;
    margin: 5px 0;
    /* border: 1px solid #ecf0f1; */
    outline: none;
    transition: border-color 0.3sease;
    width: 100%;
}

/* Focus state for range input */
input[type="range"]:focus {
  /* border-color: #3498db; Highlight border when focused */
  /* box-shadow: 0 0 5px rgba(52, 152, 219, 0.3); Optional focus effect */
}

/* Labels for inputs */
label {
  font-size: 1.1vw;
  /* color: #555; */
  margin-bottom: 5px;
  width: 20vw;
}

/* Button Styling */
 /* Button Styling */
 button {
    /* background-color: #3498db;
    color: #fff; */
    font-size: 1.1vw;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
    align-self: center;
    font-family: 'Algerian', sans-serif; 
  }
  
  /* Hover effect for buttons */
  button:hover {
    /* background-color: #2980b9; */
  }
  
  /* Button disabled state */
  button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }

/* Responsive Design */
@media (max-width: 768px) {
  .form-container {
    padding: 15px;
  }

  .form-container h1 {
    font-size: 1.5rem;
  }

  input[type="range"] {
    font-size: 1rem;
    padding: 8px;
  }

  button {
    padding: 10px 18px;
  }
}
</style>