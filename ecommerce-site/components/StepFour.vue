<template>
 <div>
  <div class="">
    <h2 class="smalllable2 font-semibold pb-[2vw]">Please tell us about any clothing fit challenges you face (optional)</h2>

    <div class="formstyle">
      <!-- Neck -->
      <h3 class="smalllable1">Please Select</h3>
      <div class="option-group">
        <p class="smalllable2">Neck</p>
        <div class="stepbtncontainer">
          <button v-for="option in neckOptions" :key="option" 
                  @click="formData.neck = option"
                  :class="{'selected': formData.neck === option}"
                  class="btns">
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Shoulders -->
      <div class="option-group">
        <p class="smalllable2">Shoulders</p>
        <div class="stepbtncontainer">
          <button v-for="option in shoulderOptions" :key="option"
                  @click="formData.shoulders = option"
                  :class="{'selected': formData.shoulders === option}"
                  class="btns">
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Arms -->
      <div class="option-group">
        <p class="smalllable2">Arms</p>
        <div class="stepbtncontainer">
          <button v-for="option in armOptions" :key="option"
                  @click="formData.arms = option"
                  :class="{'selected': formData.arms === option}"
                  class="btns">
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Bust -->
      <div class="option-group">
        <p class="smalllable2">Bust</p>
        <div class="stepbtncontainer">
          <button v-for="option in bustOptions" :key="option"
                  @click="formData.bust = option"
                  :class="{'selected': formData.bust === option}"
                  class="btns">
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Stomach -->
      <div class="option-group">
        <p class="smalllable2">Stomach</p>
        <div class="stepbtncontainer">
          <button v-for="option in stomachOptions" :key="option"
                  @click="formData.stomach = option"
                  :class="{'selected': formData.stomach === option}"
                  class="btns">
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Bum -->
      <div class="option-group">
        <p class="smalllable2">Bum</p>
        <div class="stepbtncontainer">
          <button v-for="option in bumOptions" :key="option"
                  @click="formData.bum = option"
                  :class="{'selected': formData.bum === option}"
                  class="btns">
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Hips -->
      <div class="option-group">
        <p class="smalllable2">Hips</p>
        <div class="stepbtncontainer">
          <button v-for="option in hipOptions" :key="option"
                  @click="formData.hips = option"
                  :class="{'selected': formData.hips === option}"
                  class="btns">
            {{ option }}
          </button>
        </div>
      </div>

      <!-- Legs -->
      <div class="option-group">
        <p class="smalllable2">Legs</p>
        <div class="stepbtncontainer">
          <button v-for="option in legOptions" :key="option"
                  @click="formData.legs = option"
                  :class="{'selected': formData.legs === option}"
                  class="btns">
            {{ option }}
          </button>
        </div>
      </div>
    </div>

    <div class="flex"><button class="nextbtn" @click="nextStep"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#000000" stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
    <button class="nextbtn2" @click="nextStep">Skip?</button>
</div>
  </div>
 </div>
</template>

<script>
export default {
  data() {
    return {
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
    nextStep() {
      this.$emit('next', this.formData); // Emit data to parent
    }
  }
};
</script>

<style scoped>


/* Grid Layout */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}


</style>
