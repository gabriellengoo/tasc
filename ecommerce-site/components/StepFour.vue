<template>
 <div>
  <div class="formstyle">
    <label class="smalllable1">Please tell us about any clothing fit challenges you face (optional)</label>

    <div class="">
      <!-- Neck -->
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
