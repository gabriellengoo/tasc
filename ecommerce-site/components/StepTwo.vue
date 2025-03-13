<template>
<div> 
  <h2 class="headerform">Step 2 - Face</h2>

  <div class="formstyle">
    
    <div class="form-section">
      <h3 class="smalllable1">Hairstyle Selection</h3>
      <p class="smalllable2">Texture</p>
      <div class="stepbtncontainer">
        <button class="btns">Straight</button>
        <button class="btns">Wavy</button>
        <button class="btns">Curly</button>
        <button class="btns">Afro</button>
      </div>
      <p class="smalllable2">Length</p>
      <div class="stepbtncontainer">
        <button class="btns">Bald</button>
        <button class="btns">Short</button>
        <button class="btns">Medium</button>
        <button class="btns">Long</button>
      </div>
      <p class="smalllable2">Colour</p>
      <div class="stepbtncontainer">
        <button class="btns">Black</button>
        <button class="btns">Brown</button>
        <button class="btns">Blonde</button>
        <button class="btns">Red</button>
        <button class="btns">Auburn</button>
        <button class="btns">Grey/White</button>
      </div>
    </div>
    
    <div class="form-section">
      <h3 class="smalllable">Skin Tone Selection</h3>
      <div class="stepbtncontainer">
        <button class="btns">Light (Type I)</button>
        <button class="btns">Fair (Type II)</button>
        <button class="btns">Medium (Type III)</button>
        <button class="btns">Medium-Dark (Type IV)</button>
        <button class="btns">Dark (Type V-VI)</button>
      </div>
    </div>
    
    <div class="form-section">
      <h3 class="smalllable">Face Shape</h3>
      <div v-if="Object.keys(morphTargets).length">
        <div class="slider-group" v-for="(morphName, key) in morphTargets" :key="key">
          <label class="smalllable">{{ morphName }}</label>
          <input class="inputa" type="range" min="0" max="1" step="0.1" v-model="morphValues[key]" @input="applyMorph(key, morphValues[key])" />
        </div>
      </div>
      <p v-else>No morph targets detected.</p>
    </div>
    
    <div class="form-section">
      <h3 class="smalllable">Eye Colour</h3>
      <div class="stepbtncontainer">
        <button class="btns">Blue</button>
        <button class="btns">Green</button>
        <button class="btns">Brown</button>
        <button class="btns">Hazel</button>
        <button class="btns">Grey</button>
      </div>
    </div>
    
    <!-- <div class="form-section">
  <h3 class="smalllable">Height Selection (Women)</h3>
  <input 
  class="inputa"
    type="range"  
    min="1" 
    max="4" 
    v-model="selectedHeightWomen"
    @input="updateHeightLabel"
  />
  <p class="smalllable2">{{ heightLabels[selectedHeightWomen] }}</p>
</div> -->

    

  
  </div>
  <button class="nextbtn" @click="nextStep">Next</button>

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

</style>
