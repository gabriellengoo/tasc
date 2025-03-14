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
        <button class="btns" v-for="size in footSizes" :key="size" @click="formData.footSize = size" :class="{ 'selected': formData.footSize === key }">{{ size }}</button>
      </div>

    </div>
    <button class="nextbtn" @click="nextStep"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#000000" stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg></button>
  </div>
</template>

<script>
export default {
  props: {
    setMorphValue: Function, // Function from parent to update morph targets
  },
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
    this.updateModel('height', this.formData.heightRangeWomen);
  },
  updateHeightLabelMen() {
    this.updateModel('height', this.formData.heightRangeMen);
  },
  updateModel(morphName, value) {
    if (this.setMorphValue) {
      // Normalize value between 0 and 1 for morph target
      const normalizedValue = (value - 1) / 3;
      this.setMorphValue(morphName, normalizedValue);
    }
  },
    nextStep() {
      this.$emit('next', this.formData); // Emit data to parent
    },
    
    
  }
};
</script>
