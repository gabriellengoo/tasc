<template>
  <div>
    <h1 class="headerform">Step 2.2</h1>

    <div class="formstyle">

    <label class="smalllable" for="heightRange">Please select your height range (women only)</label>
    <select v-model="formData.heightRange" @change="updateModel">
      <option value="petite">Petite (<5'3)</option>
      <option value="average">Average (5'3 - 5'7)</option>
      <option value="tall">Tall (5'7 - 5'10)</option>
      <option value="veryTall">Very Tall (5'10+)</option>
    </select>

    <label class="smalllable" for="heightRangeMen">Please select your height range (men only)</label>
    <select v-model="formData.heightRangeMen" @change="updateModel">
      <option value="short">Short (<5'7")</option>
      <option value="average">Average (5'7 - 5'11")</option>
      <option value="tall">Tall (6'0 - 6'3")</option>
      <option value="veryTall">Very Tall (>6'3")</option>
    </select>

    <label class="smalllable" for="topSize">Please tell us your typical size for tops</label>
    <select v-model="formData.topSize" @change="updateModel">
      <option value="S">S (6-8)</option>
      <option value="M">M (10-12)</option>
      <option value="L">L (14-16)</option>
      <option value="XL">XL+ (18+)</option>
    </select>

    <label class="smalllable" for="bottomSize">Please tell us your typical size for bottoms</label>
    <select v-model="formData.bottomSize" @change="updateModel">
      <option value="S">S (6-8)</option>
      <option value="M">M (10-12)</option>
      <option value="L">L (14-16)</option>
      <option value="XL">XL+ (18+)</option>
    </select>

    <label class="smalllable" for="footSize">Please tell us your typical footwear size</label>
    <input class="inputa" type="number" v-model="formData.footSize" @change="updateModel" placeholder="Enter size" />

  </div>
  <button class="nextbtn" @click="nextStep">Next</button>

  </div>
</template>

<script>
export default {
  props: ['model'],
  data() {
    return {
      formData: {
        heightRange: '',
        heightRangeMen: '',
        topSize: '',
        bottomSize: '',
        footSize: ''
      }
    };
  },
  methods: {
    nextStep() {
      this.$emit('next', this.formData); // Emit data to parent
    },
    updateModel() {
      // Update the model based on user selections (body features)
      if (this.formData.heightRange) {
        this.model.heightRange = this.formData.heightRange;
      }

      if (this.formData.heightRangeMen) {
        this.model.heightRangeMen = this.formData.heightRangeMen;
      }

      if (this.formData.topSize) {
        this.model.topSize = this.formData.topSize;
      }

      if (this.formData.bottomSize) {
        this.model.bottomSize = this.formData.bottomSize;
      }

      if (this.formData.footSize) {
        this.model.footSize = this.formData.footSize;
      }
    }
  }
};
</script>

<style scoped>

  
  
  </style>
