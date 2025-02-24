<template>
  <div class="formstyle">
    <h2 class="headerform">Step 2: Body Selection</h2>
    
    <div class="form-section">
      <h3>Hairstyle Selection</h3>
      <p>Texture:</p>
      <div class="button-group">
        <button>Straight</button>
        <button>Wavy</button>
        <button>Curly</button>
        <button>Afro</button>
      </div>
      <p>Length:</p>
      <div class="button-group">
        <button>Bald</button>
        <button>Short</button>
        <button>Medium</button>
        <button>Long</button>
      </div>
      <p>Colour:</p>
      <div class="button-group">
        <button>Black</button>
        <button>Brown</button>
        <button>Blonde</button>
        <button>Red</button>
        <button>Auburn</button>
        <button>Grey/White</button>
      </div>
    </div>
    
    <div class="form-section">
      <h3>Skin Tone Selection</h3>
      <div class="button-group">
        <button>Light (Type I)</button>
        <button>Fair (Type II)</button>
        <button>Medium (Type III)</button>
        <button>Medium-Dark (Type IV)</button>
        <button>Dark (Type V-VI)</button>
      </div>
    </div>
    
    <div class="form-section">
      <h3>Face Shape</h3>
      <div v-if="Object.keys(morphTargets).length">
        <div class="slider-group" v-for="(morphName, key) in morphTargets" :key="key">
          <label>{{ morphName }}</label>
          <input type="range" min="0" max="1" step="0.1" v-model="morphValues[key]" @input="applyMorph(key, morphValues[key])" />
        </div>
      </div>
      <p v-else>No morph targets detected.</p>
    </div>
    
    <div class="form-section">
      <h3>Eye Colour</h3>
      <div class="button-group">
        <button>Blue</button>
        <button>Green</button>
        <button>Brown</button>
        <button>Hazel</button>
        <button>Grey</button>
      </div>
    </div>
    
    <div class="form-section">
  <h3>Height Selection (Women)</h3>
  <input 
    type="range" 
    min="1" 
    max="4" 
    v-model="selectedHeightWomen"
    @input="updateHeightLabel"
  />
  <p>{{ heightLabels[selectedHeightWomen] }}</p>
</div>

    

<button @click="nextStep">Next</button>
    <!-- <div class="form-section">
      <h3>Height Selection (Men)</h3>
      <input type="range" min="1" max="4" list="heights-men" />
      <datalist id="heights-men">
        <option value="1" label="Short (<5'7)"></option>
        <option value="2" label="Average (5'7 - 5'11)"></option>
        <option value="3" label="Tall (6'0 - 6'3)"></option>
        <option value="4" label="Very Tall (>6'3)"></option>
      </datalist>
    </div> -->
  </div>
</template>

<script>
export default {
  props: ["model"],
  data() {
    return {
      formData: {
        hair: "",
        skin: "",
        eyeColor: "",
      },
      morphTargets: {},
      morphValues: {},
      mesh: null,
      selectedHeightWomen: 1,
    heightLabels: {
      1: "Petite (<5'3)",
      2: "Average (5'3 - 5'7)",
      3: "Tall (5'7 - 5'10)",
      4: "Very Tall (5'10+)"
    },
    };
  },

  watch: {
    model: {
      immediate: true,
      handler(newModel) {
        if (newModel) {
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
      this.$emit("next", this.formData);
    },


    updateHeightLabel() {
    // This ensures the label updates instantly when moving the slider
    this.selectedHeightWomen = Number(this.selectedHeightWomen);
  },

    updateModel() {
      if (!this.model) return;
      if (!this.mesh) {
        this.mesh = this.model;
      }

      
      if (this.mesh.morphTargetDictionary) {
        const targetMap = {
          "Arm_Mount_Left.001": "Cheekbones",
          "Arm_Mount_Left.002": "Jaw",
        };

        this.morphTargets = {};

        Object.keys(this.mesh.morphTargetDictionary).forEach((key) => {
          if (targetMap[key]) {
            this.morphTargets[key] = targetMap[key];
            this.morphValues[key] = 0.5;
          }
        });
      }
    },

    applyMorph(morphKey, value) {
      if (!this.mesh || !this.mesh.morphTargetDictionary) return;

      const index = this.mesh.morphTargetDictionary[morphKey];
      if (index !== undefined) {
        this.$set(this.mesh.morphTargetInfluences, index, value);
      }
    },
  },
};
</script>

<style scoped>
/* .form-container {
  width: 90%;
  max-width: 600px;
  margin: auto;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
} */

.form-title {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.form-section {
  margin-bottom: 20px;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

button {
  padding: 10px 15px;
  border: none;
  background: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
  background: #3498db;
  color: white;
}

.slider-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

input[type="range"] {
  width: 100%;
}
</style>
