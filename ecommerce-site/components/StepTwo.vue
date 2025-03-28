<template>
  <div>
    <h2 class="headerform">Step 2 - Face</h2>

    <div class="formstyle">
      <!-- Hair Texture Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 0" class="form-section">
          <!-- <h3 class="smalllable1">Hair</h3> -->
          <h3 class="smalllable">Hair Texture</h3>
          <div class="stepbtncontainer ">
            <button v-for="option in ['Straight', 'Wavy', 'Curly', 'Afro']" :key="option" class="btns"
              :class="{ selected: selectedHairTexture === option }" @click="selectOption('hairTexture', option)">
              {{ option }}
            </button>
          </div>
          <h3 class="smalllable">Hair Length</h3>
          <div class="stepbtncontainer">
            <button v-for="option in ['Bald', 'Short', 'Medium', 'Long']" :key="option" class="btns"
              :class="{ selected: selectedHairLength === option }" @click="selectOption('hairLength', option)">
              {{ option }}
            </button>
          </div>
          <h3 class="smalllable">Hair Colour</h3>
          <div class="stepbtncontainer2col">
            <!-- Predefined Color Buttons -->
            <button v-for="(color, index) in hairColors" :key="index" class="btnsimgcol"
              :class="{ selected2: selectedHairColor === color, 'tooltip-active': tooltipVisible && tooltipIndex === index }"
              @click="selectOption(color)" @mouseover="showTooltip(color, $event, index)" @mouseleave="hideTooltip"
              :style="{ backgroundColor: color }">
              <!-- Tooltip -->
              <div v-if="tooltipVisible && tooltipIndex === index" class="tooltip"
                :style="{ top: '-25px', left: '50%', transform: 'translateX(-50%)' }">
                {{ tooltipText }}
              </div>
            </button>

            <!-- + Button for Custom Color -->
            <button class="btnsimgcol custom-color-btn" @click="triggerColorPicker">+</button>
            <input type="color" ref="colorPicker" class="hidden" @change="addCustomColor" />
          </div>
        </div>
      </transition>








      <!-- Skin Tone Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 1" class="form-sectioncol">
          <h3 class="smalllable">Skin Tone Selection</h3>
          <div class="stepbtncontainer2col">
            <button v-for="(tone, index) in ['#F1C27D', '#E5C28D', '#A56C42', '#5D3A29', '#3E1F1B']" :key="index"
              class="btnsimgcol"
              :class="{ selected2: selectedSkinTone === tone, 'tooltip-active': tooltipVisible && tooltipIndex === index }"
              @click="selectSkinTone(tone)" @mouseover="showSkinToneTooltip(tone, $event, index)"
              @mouseleave="hideSkinToneTooltip" :style="{ backgroundColor: tone }">
              <!-- Tooltip inside the button -->
              <div v-if="tooltipVisible && tooltipIndex === index" class="tooltip"
                :style="{ top: '-25px', left: '50%', transform: 'translateX(-50%)' }">
                {{ getSkinToneName(tone) }}
              </div>
            </button>
          </div>
          <!-- Eye Colour Section -->
          <h3 class="smalllable">Eye Colour</h3>
          <div class="stepbtncontainer">
            <button v-for="option in ['Blue', 'Green', 'Brown', 'Hazel', 'Grey']" :key="option" class="btns"
              :class="{ selected: selectedEyeColor === option }" @click="selectOption('eyeColor', option)">
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
  data() {
    return {
      currentChunk: 0,
      totalChunks: 2,
      selectedHairTexture: "",
      selectedHairLength: "",
      selectedHairColor: "",
      selectedSkinTone: "",
      selectedEyeColor: "",
      tooltipVisible: false,
      tooltipText: '',
      hairColors: ['#000000', '#3E1F1B', '#6B4F2C', '#F2D14E', '#D24D29', '#A7A7A7'],
      tooltipPosition: { top: '0px', left: '0px' },
      tooltipIndex: null, // Tracks the index of the button with tooltip
    };
  },
  methods: {
    selectOption(type, color) {
      this.selectedHairColor = color;
    },
    showTooltip(color, event, index) {
      this.tooltipText = color;
      this.tooltipVisible = true;
      this.tooltipIndex = index;
    },
    hideTooltip() {
      this.tooltipVisible = false;
    },
    triggerColorPicker() {
      this.$refs.colorPicker.click();
    },
    addCustomColor(event) {
      const newColor = event.target.value;

      // Only add the color if it's not already in the list
      if (this.hairColors && !this.hairColors.includes(newColor)) {
        this.hairColors.push(newColor);
      }

      // Apply the selected color only after the picker closes
      this.selectedHairColor = newColor;
    },
    selectOption(category, option) {
      this[`selected${this.capitalize(category)}`] = option;
      // this.nextStep();
    },
    getColorName(color) {
      const colorNames = {
        '#000000': 'Black',
        '#3E1F1B': 'Dark Brown',
        '#6B4F2C': 'Medium Brown',
        '#F2D14E': 'Blonde',
        '#D24D29': 'Red',
        '#A7A7A7': 'Grey',
      };
      return colorNames[color] || 'Unknown Color';
    },
    showTooltip(color, event, index) {
      this.tooltipVisible = true;
      this.tooltipText = this.getColorName(color);
      this.tooltipIndex = index; // Set tooltip to this specific button

      // You can add additional positioning logic here if needed
    },
    hideTooltip() {
      this.tooltipVisible = false;
      this.tooltipIndex = null;
    },

    selectSkinTone(tone) {
      this.selectedSkinTone = tone;
      // this.nextStep();
    },
    getSkinToneName(tone) {
      const skinToneNames = {
        '#F1C27D': 'Light',
        '#E5C28D': 'Medium Light',
        '#A56C42': 'Medium',
        '#5D3A29': 'Dark',
        '#3E1F1B': 'Deep',
      };
      return skinToneNames[tone] || 'Unknown Tone';
    },
    showSkinToneTooltip(tone, event, index) {
      this.tooltipVisible = true;
      this.tooltipText = this.getSkinToneName(tone);
      this.tooltipIndex = index;
      // const tooltip = this.$refs.tooltip;
      // this.tooltipPosition.top = `${event.clientY - 30}px`;
      // this.tooltipPosition.left = `${event.clientX + 10}px`;
    },
    hideSkinToneTooltip() {
      this.tooltipVisible = false;
    },
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
    nextStep() {
      if (this.currentChunk < 2) {
        this.currentChunk++;
      } else {
        this.$emit("next", {
          hairTexture: this.selectedHairTexture,
          hairLength: this.selectedHairLength,
          hairColor: this.selectedHairColor,
          skinTone: this.selectedSkinTone,
          eyeColor: this.selectedEyeColor,
        });
      }
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
/* .selected {
  background-color: #4CAF50;
  color: white;
}
.selected2 {
  background-color: #FF5733;
  color: white;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.5s ease;
}
.slide-enter, .slide-leave-to {
  transform: translateY(100%);
}
.nextbtn {
  margin-top: 20px;
} */
</style>