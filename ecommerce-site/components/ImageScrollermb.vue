<template>
  <div class="scroller-wrapper">
    <div class="scroller" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
      <div v-for="(pair, index) in pairedImages" :key="index" class="image-group">
        <div v-for="(image, imgIndex) in pair" :key="imgIndex" class="image-loop">
          <router-link :to="`/model/${image.default.split('/').pop().replace('.png', '')}`">
  <img :src="image.default" alt="Scrolling image" class="loop-image" />
</router-link>

          <!-- Text with alignment -->
          <div :class="imgIndex === 0 ? 'text-left text-container' : 'text-right text-container'">
            <!-- SVG before first text -->
            <svg v-if="imgIndex === 0" class="icon left-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M5 12l5-5M5 12l5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>

            <span v-html="getText(image.default)"></span>

            <!-- SVG after second text -->
            <svg v-if="imgIndex === 1" class="icon right-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
              <path d="M19 12H5m14 0l-5-5m5 5l-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Progress Bar -->
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${((currentIndex + 1) / pairedImages.length) * 100}%` }"></div>
    </div>

    <!-- Navigation Buttons -->
    <button class="nav-button left" @click="prevSlide" :disabled="currentIndex === 0">&#9665;</button>
    <button class="nav-button right" @click="nextSlide" :disabled="currentIndex === pairedImages.length - 1">&#9655;</button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const images = [
  { default: "/ovalm.png" },
  { default: "/pear.png" },
  { default: "/squarem.png" },
  { default: "/squw.png" },
  { default: "/intrim.png" },
  { default: "/intriw.png" },
  { default: "/maledefult.png" },
  { default: "/hour.png" },
  { default: "/trim.png" },
  { default: "/apple.png" },
];

const pairedImages = computed(() => {
  let pairs = [];
  for (let i = 0; i < images.length; i += 2) {
    pairs.push([images[i], images[i + 1]]);
  }
  return pairs;
});

const currentIndex = ref(0);

const nextSlide = () => {
  if (currentIndex.value < pairedImages.value.length - 1) {
    currentIndex.value++;
  }
};

const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
};

const getText = (image) => {
  if (image.includes("pear")) return "<span class='big-text'>W_01</span>Pear Body";
  if (image.includes("squw")) return "<span class='big-text'>W_02</span>Square Body";
  if (image.includes("intriw")) return "<span class='big-text'>W_03</span>Inverted Triangle Body";
  if (image.includes("apple")) return "<span class='big-text'>W_04</span>Apple Body";
  if (image.includes("hour")) return "<span class='big-text'>W_05</span>Hourglass Body";
  if (image.includes("maledefult")) return "<span class='big-text'>M_05</span>Trapezoid Body";
  if (image.includes("ovalm")) return "<span class='big-text'>M_01</span>Oval Body";
  if (image.includes("squarem")) return "<span class='big-text'>M_02</span>Square Body";
  if (image.includes("intrim")) return "<span class='big-text'>M_03</span>Inverted Triangle Body";
  if (image.includes("trim")) return "<span class='big-text'>M_04</span>Triangle Body";
};

</script>

<style scoped>

.big-text {
  font-size: 2vw; /* Adjust this as needed */
  font-weight: bold;
  display: block; /* Ensures it stays on its own line if needed */
}

.scroller-wrapper {
  overflow: hidden;
  width: 100vw;
  height: 70vh;
  position: relative;
}

.scroller {
  display: flex;
  transition: transform 0.5s ease-in-out;
  width: 100%;
  height: 100%;
}

.image-group {
  display: flex;
  flex-direction: row;
  min-width: 100%;
  justify-content: center;
  align-items: center;
}

.image-loop {
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.loop-image {
  width: auto;
  height: 36vw;
  height: 95vw;
  object-fit: contain;
}

/* Text Alignment */
.text-container {
  display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;
    font-size: 1vw;
    color: #333;
    /* font-weight: bold; */
    text-transform: uppercase;
}


.text-left {
  justify-content: flex-start;
  text-align: left;
  width: 100%;
}

.text-right {
  justify-content: flex-end;
  text-align: right;
  width: 100%;
}

/* SVG Icon Styles */
.icon {
  width: 24px;
  height: 24px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.left-icon {
  margin-right: 8px;
}

.right-icon {
  margin-left: 8px;
}

/* Progress Bar */
.progress-bar {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  height: 4px;
  background: #ddd;
}

.progress {
  height: 100%;
  background: rgb(173, 173, 173);
  transition: width 0.5s ease-in-out;
}

/* Navigation Buttons */
.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: #47494e;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 24px;
}

.nav-button.left {
  left: 10px;
}

.nav-button.right {
  right: 10px;
}

.nav-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
