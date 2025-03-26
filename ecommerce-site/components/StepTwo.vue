<template>
  <div>
    <h2 class="headerform">Step 2 - Face</h2>

    <div class="formstyle">
      <!-- Hair Texture Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 0" class="form-section">
          <h3 class="smalllable1">Hair Texture</h3>
          <div class="stepbtncontainer ">
            <button v-for="option in ['Straight', 'Wavy', 'Curly', 'Afro']" :key="option" class="btns"
              :class="{ selected: selectedHairTexture === option }" @click="selectOption('hairTexture', option)">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Hair Length Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 1" class="form-section">
          <h3 class="smalllable1">Hair Length</h3>
          <div class="stepbtncontainer">
            <button v-for="option in ['Bald', 'Short', 'Medium', 'Long']" :key="option" class="btns"
              :class="{ selected: selectedHairLength === option }" @click="selectOption('hairLength', option)">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>

      <!-- Hair Color Section -->
      <!-- Hair Color Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 2" class="form-sectioncol">
          <h3 class="smalllable1">Hair Colour</h3>
          <div class="stepbtncontainer2col">
            <button v-for="(color, index) in ['#000000', '#3E1F1B', '#6B4F2C', '#F2D14E', '#D24D29', '#A7A7A7']"
              :key="index" class="btnsimgcol"
              :class="{ selected2: selectedHairColor === color, 'tooltip-active': tooltipVisible && tooltipIndex === index }"
              @click="selectOption('hairColor', color)" @mouseover="showTooltip(color, $event, index)"
              @mouseleave="hideTooltip" :style="{ backgroundColor: color }">

              <!-- Tooltip inside the button -->
              <div v-if="tooltipVisible && tooltipIndex === index" class="tooltip"
                :style="{ top: '-25px', left: '50%', transform: 'translateX(-50%)' }">
                {{ tooltipText }}
              </div>

            </button>
          </div>
        </div>
      </transition>








      <!-- Skin Tone Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 3" class="form-sectioncol">
          <h3 class="smalllable1">Skin Tone Selection</h3>
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
        </div>
      </transition>



      <!-- Eye Colour Section -->
      <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
        <div v-if="currentChunk === 4" class="form-section">
          <h3 class="smalllable1">Eye Colour</h3>
          <div class="stepbtncontainer">
            <button v-for="option in ['Blue', 'Green', 'Brown', 'Hazel', 'Grey']" :key="option" class="btns"
              :class="{ selected: selectedEyeColor === option }" @click="selectOption('eyeColor', option)">
              {{ option }}
            </button>
          </div>
        </div>
      </transition>
    </div>

    <button class="nextbtn" @click="nextStep">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7"
          stroke="#000000" stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentChunk: 0,
      selectedHairTexture: "",
      selectedHairLength: "",
      selectedHairColor: "",
      selectedSkinTone: "",
      selectedEyeColor: "",
      tooltipVisible: false,
      tooltipText: '',
      tooltipPosition: { top: '0px', left: '0px' },
      tooltipIndex: null, // Tracks the index of the button with tooltip
    };
  },
  methods: {
    selectOption(category, option) {
      this[`selected${this.capitalize(category)}`] = option;
      this.nextStep();
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
      this.nextStep();
    },
    getSkinToneName(tone) {
      const skinToneNames = {
        '#F1C27D': 'Light',
        '#E5C28D': 'Medium Light',
        '#A56C42': 'Medium',
        '#5D3A29': 'Dark',
        '#3E1F1B': 'Very Dark',
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
      if (this.currentChunk < 4) {
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