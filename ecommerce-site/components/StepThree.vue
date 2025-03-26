<template>
  <div>
    <h1 class="headerform">Step 2.2 - Body</h1>

    <div class="formstyle">
      <!-- Height Range Women Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
    <div v-if="currentChunk === 0" class="form-section">
        <label class="smalllable1" for="heightRangeWomen">Please select your height range</label>

        <div class="slider-container">
            <!-- Dynamic label based on slider value -->
            <p class="height-label">{{ currentHeightLabel }}</p>

            <!-- Range Slider with Marks -->
            <input class="slider" id="height-slider" type="range" min="1" max="4" step="1" v-model="heightValue"
                list="height-marks" @input="updateHeight" />

            <!-- Marks for the slider -->
            <datalist id="height-marks">
                <option v-for="n in 4" :key="n" :value="n"></option>
            </datalist>

            <!-- Gender selection -->
            <!-- <div class="gender-toggle">
                <button @click="selectedGender = 'women'" :class="{ active: selectedGender === 'women' }">Women</button>
                <button @click="selectedGender = 'men'" :class="{ active: selectedGender === 'men' }">Men</button>
            </div> -->
        </div>
    </div>
</transition>


      <!-- Height Range Men Section -->
      <!-- <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 1" class="form-section">
          <label class="smalllable1" for="heightRangeMen">Please select your height range (men only)</label>
          <input class="slider" type="range" min="1" max="4" v-model="formData.heightRangeMen" @input="updateHeightLabelMen" />
          <p class="text-[#b2b2b2]">{{ heightLabelsMen[formData.heightRangeMen] }}</p>
        </div>
      </transition> -->

      <!-- Top Size Selection Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 1" class="form-section">
          <label class="smalllable">Please tell us your typical size for tops</label>
          <div class="stepbtncontainer">
            <button class="btns" v-for="(size, key) in topSizes" :key="key"
              :class="{ 'selected': formData.topSize === key }" @click="selectTopSize(key)">
              {{ size }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Bottom Size Selection Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 2" class="form-section">
          <label class="smalllable">Please tell us your typical size for bottoms</label>
          <div class="stepbtncontainer">
            <button class="btns" v-for="(size, key) in bottomSizes" :key="key"
              :class="{ 'selected': formData.bottomSize === key }" @click="selectBottomSize(key)">
              {{ size }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Foot Size Selection Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 3" class="form-sectionfoot">
          <label class="smalllable pb-[2vw]" for="footSize">Please tell us your typical footwear size</label>
          <div class="stepbtncontainerfoot">
            <button class="btnsfoot" v-for="size in footSizes" :key="size" @click="selectFootSize(size)"
              :class="{ 'selected': formData.footSize === size }">
              {{ size }}
            </button>
          </div>
        </div>
      </transition>


      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <div v-if="currentChunk === 4" class="form-section">
            <h3 class="smalllable1">BODY - STEP 2.21 (Modesty Check)</h3>
            <label class="smalllable2">Are there any areas you would like to highlight in your outfits?</label>
  
            <!-- Custom Buttons -->
            <div class="stepbtncontainer">
              <button v-for="option in ['No', 'Neutral', 'Highlight']" :key="option" class="btns"
                      :class="{ 'selected': modesty === option }" @click="selectOption('modesty', option)">
                {{ option }}
              </button>
            </div>
          </div>
        </transition>

    </div>

    <div class="nav-buttons">
      <button class="" @click="prevChunk" v-if="currentChunk > 0">↰</button>
      <button class="bg-[white] text-[black]" @click="handleNextClick">
        {{ currentChunk === totalChunks - 1 ? "↳" : "↱" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelPath: String,
    morphMesh: Object,
    model: Object,
  },
  data() {
    return {
      morphMesh: {
        height: 0, // Initialize height morph value
      },
      totalChunks: 4,
      currentChunk: 0,
      formData: {
        heightRangeWomen: 2,
        heightRangeMen: 2,
        topSize: '',
        bottomSize: '',
        footSize: '',
      },
      heightValue: 2, // Default slider position
      selectedGender: "women", // Default gender
      heightLabelsWomen: {
        1: "Petite (<5'3\")",
        2: "Average (5'3 - 5'7\")",
        3: "Tall (5'7 - 5'10\")",
        4: "Very Tall (5'10+\")",
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
      footSizes: ['5 UK', '6 UK', '7 UK', '8 UK', '9 UK', '10 UK', '11 UK', '12 UK'],

    };
  },
  computed: {
    currentHeightLabel() {
      return this.selectedGender === "women"
        ? this.heightLabelsWomen[this.heightValue]
        : this.heightLabelsMen[this.heightValue];
    },
  },
  methods: {
    updateHeightLabelWomen() {
      this.updateModel('heightRangeWomen', this.formData.heightRangeWomen);
    },
    updateHeightLabelMen() {
      this.updateModel('heightRangeMen', this.formData.heightRangeMen);
    },
    updateHeight() {
      this.$set(this.morphMesh, 'height', this.heightValue); // Ensure Vue reactivity
    },
    updateModel(morphName, value) {
      const normalizedValue = (value - 1) / 3;
      if (this.setMorphValue) {
        this.setMorphValue(morphName, normalizedValue);
      }
    },
    selectTopSize(size) {
      this.formData.topSize = size;
    },
    selectBottomSize(size) {
      this.formData.bottomSize = size;
    },
    selectFootSize(size) {
      this.formData.footSize = size;
    },
    nextStep() {
      if (this.currentChunk < 4) {
        this.currentChunk++;
      } else {
        this.$emit('next', this.formData);
      }
    },
    nextChunk() {
      if (this.currentChunk < 4) {
        this.currentChunk++;
      }
    },
    selectAge(age) {
      this.formData.age = age;
    },
    handleNextClick() {
      if (this.currentChunk === this.totalChunks - 1) {
        this.submitForm();
      } else {
        this.nextChunk();
      }
    },
    nextChunk() {
      if (this.currentChunk < this.totalChunks - 1) {
        this.currentChunk++;
      }
    },
    prevChunk() {
      if (this.currentChunk > 0) {
        this.currentChunk--;
      }
    },
    submitForm() {
      console.log("Form submitted:", this.formData);
      // this.$emit("submit", this.formData);
      this.$emit('next', this.formData);
    },
    beforeEnter(el) {
      el.style.transform = 'translateY(100%)';
    },
    enter(el, done) {
      el.offsetHeight;
      el.style.transition = 'transform 0.5s ease';
      el.style.transform = 'translateY(0)';
      done();
    },
    leave(el, done) {
      el.style.transition = 'transform 0.5s ease';
      el.style.transform = 'translateY(-100%)';
      done();
    },
  },
};
</script>

<style scoped>
/* .slider-container {
  text-align: center;
  margin-top: 20px;
} */

.gender-toggle {
  margin-top: 10px;
}

.gender-toggle button {
  margin: 5px;
  padding: 8px 12px;

  border: none;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.553);
  background-color: #dddddd7e;
}

.gender-toggle .active {
  background-color: #333;
  color: white;
}

.height-label {
  margin-top: 10px;
  font-weight: bold;
}

/* .form-section {
  margin-bottom: 20px;
}

.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}

.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}

.selected {
  background-color: #4CAF50;
  color: white;
}

.selected2 {
  background-color: #FF5733;
  color: white;
}

.nextbtn {
  margin-top: 20px;
} */
</style>
