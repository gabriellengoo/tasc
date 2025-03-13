<template>
  <div>
    <h1 class="headerform">Step 2.2 - Body</h1>

    <div class="formstyle">

      <label class="smalllable1" for="heightRangeWomen">Please select your height range (women only)</label>
      <input class="slider" type="range" min="1" max="4" v-model="formData.heightRangeWomen"
        @input="updateHeightLabelWomen" />
      <p class=" text-[#b2b2b2]">{{ heightLabelsWomen[formData.heightRangeWomen] }}</p>

      <label class="smalllable" for="heightRangeMen">Please select your height range (men only)</label>
      <input class="slider" type="range" min="1" max="4" v-model="formData.heightRangeMen"
        @input="updateHeightLabelMen" />
      <p class=" text-[#b2b2b2]">{{ heightLabelsMen[formData.heightRangeMen] }}</p>

      <!-- Top Size Selection -->
      <label class="smalllable">Please tell us your typical size for tops</label>
      <div class="stepbtncontainer">
        <button class="btns" v-for="(size, key) in topSizes" :key="key" :class="{ 'selected': formData.topSize === key }"
          @click="formData.topSize = key">
          {{ size }}
        </button>
      </div>

      <!-- Bottom Size Selection -->
      <label class="smalllable">Please tell us your typical size for bottoms</label>
      <div class="stepbtncontainer">
        <button class="btns" v-for="(size, key) in bottomSizes" :key="key" :class="{ 'selected': formData.bottomSize === key }"
          @click="formData.bottomSize = key">
          {{ size }}
        </button>
      </div>

      <label class="smalllable" for="footSize">Please tell us your typical footwear size</label>
      <div class="stepbtncontainer">
        <button class="btns" v-for="size in footSizes" :key="size" @click="formData.footSize = size">{{ size }}</button>
      </div>

    </div>
    <button class="nextbtn" @click="nextStep">Next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        heightRangeWomen: 2,
        heightRangeMen: 2,
        topSize: '',
        bottomSize: '',
        footSize: ''
      },
      heightLabelsWomen: {
        1: "Petite (<5'3)",
        2: "Average (5'3 - 5'7)",
        3: "Tall (5'7 - 5'10)",
        4: "Very Tall (5'10+)",
      },
      heightLabelsMen: {
        1: "Short (<5'7\")",
        2: "Average (5'7\" - 5'11\")",
        3: "Tall (6'0 - 6'3\")",
        4: "Very Tall (>6'3\")",
      },
      topSizes: {
        S: "S (6-8)",
        M: "M (10-12)",
        L: "L (14-16)",
        XL: "XL+ (18+)",
      },
      bottomSizes: {
        S: "S (6-8)",
        M: "M (10-12)",
        L: "L (14-16)",
        XL: "XL+ (18+)",
      },
      footSizes: [5, 6, 7, 8, 9, 10, 11, 12]
    };
  },
  methods: {
    updateHeightLabelWomen() {
      this.updateModel();
    },
    updateHeightLabelMen() {
      this.updateModel();
    },
    updateModel() {
      // Function to update the model based on selected values
    },
    nextStep() {
      this.$emit('next', this.formData); // Emit data to parent
    }
  }
};
</script>
