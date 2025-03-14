<template>
  <div> 
    <h2 class="headerform">Step 2 - Face</h2>

    <div class="formstyle">
      <div class="form-section">
        <h3 class="smalllable1">Hairstyle Selection</h3>
        <p class="smalllable2">Texture</p>
        <div class="stepbtncontainer">
          <button 
            v-for="option in ['Straight', 'Wavy', 'Curly', 'Afro']"
            :key="option"
            class="btns"
            :class="{ selected: selectedHairTexture === option }"
            @click="selectOption('hairTexture', option)"
          >
            {{ option }}
          </button>
        </div>

        <p class="smalllable2">Length</p>
        <div class="stepbtncontainer">
          <button 
            v-for="option in ['Bald', 'Short', 'Medium', 'Long']"
            :key="option"
            class="btns"
            :class="{ selected: selectedHairLength === option }"
            @click="selectOption('hairLength', option)"
          >
            {{ option }}
          </button>
        </div>

        <p class="smalllable2">Colour</p>
        <div class="stepbtncontainer">
          <button 
            v-for="option in ['Black', 'Brown', 'Blonde', 'Red', 'Auburn', 'Grey/White']"
            :key="option"
            class="btns"
            :class="{ selected: selectedHairColor === option }"
            @click="selectOption('hairColor', option)"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div class="form-section">
        <h3 class="smalllable">Skin Tone Selection</h3>
        <div class="stepbtncontainer">
          <button 
            v-for="option in ['Light (Type I)', 'Fair (Type II)', 'Medium (Type III)', 'Medium-Dark (Type IV)', 'Dark (Type V-VI)']"
            :key="option"
            class="btns"
            :class="{ selected: selectedSkinTone === option }"
            @click="selectOption('skinTone', option)"
          >
            {{ option }}
          </button>
        </div>
      </div>

      <div class="form-section">
        <h3 class="smalllable">Eye Colour</h3>
        <div class="stepbtncontainer">
          <button 
            v-for="option in ['Blue', 'Green', 'Brown', 'Hazel', 'Grey']"
            :key="option"
            class="btns"
            :class="{ selected: selectedEyeColor === option }"
            @click="selectOption('eyeColor', option)"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <button class="nextbtn" @click="nextStep"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#000000" stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    nextStep() {
      this.$emit("next", {
        hairTexture: this.selectedHairTexture,
        hairLength: this.selectedHairLength,
        hairColor: this.selectedHairColor,
        skinTone: this.selectedSkinTone,
        eyeColor: this.selectedEyeColor,
      });
    },
  },
};
</script>

<style scoped>

</style>
