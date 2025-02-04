<template>
  <div class="scroller-wrapper">
    <div
      class="scroller"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <div
        v-for="(image, index) in infiniteImages"
        :key="index"
        class="image-group"
      >
        <div class="image-loop">
          <img
            :src="image"
            alt="Scrolling image"
            class="loop-image"
            @mouseover="hoveredIndex = image"
            @mouseleave="hoveredIndex = null"
          />
          <div v-if="hoveredIndex === image" class="tooltip">
            <div class="tooltip-line-container">
              <div class="tooltip-line"></div>
            </div>
            <div class="tooltip-text" v-html="getText(image)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const images = ["/pear.png", "/squ.png", "/intri.png"];

// Duplicate images to ensure seamless scrolling
const infiniteImages = computed(() => [...images, ...images, ...images]);

const hoveredIndex = ref(null);
const isHovered = ref(false);

const getText = (image) => {
  if (image.includes("pear")) return "Feminine <br> Pear Body <br> 01/10";
  if (image.includes("squ")) return "Feminine <br> Square Body <br> 02/10";
  if (image.includes("intri")) return "Feminine <br> Intricate Body <br> 03/10";
  return "";
};
</script>

<style scoped>
.scroller-wrapper {
  overflow: hidden;
  width: 100vw;
  height: 40vw;
  white-space: nowrap;
  position: absolute;
  top: 20vh;
  left: 0;
}

.scroller {
  display: flex;
  gap: 2px;
  width: max-content;
  animation: scroll 7s linear infinite;
  animation-play-state: running;
  transition: animation-play-state 0.3s;
}

.scroller:hover {
  animation-play-state: paused;
}

.image-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 10vw;
}

.image-loop {
  position: relative;
  width: auto;
  height: -moz-max-content;
  height: 50vw;
}

.loop-image {
  width: auto;
  height: 40vw;
  object-fit: contain;
  opacity: 1;
}

.loop-image:hover {
  cursor: pointer;
}

.tooltip {
  position: absolute;
  bottom: 43vw;
  left: 70%;
  color: black;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 0.3s ease-in-out;
  z-index: 10;
  width: auto;
}

.tooltip-line-container {
  position: relative;
  margin-bottom: 8px;
}

.tooltip-line {
  position: absolute;
  top: 0;
  left: 0;
  height: 1px;
  background-color: black;
  width: 0;
  animation: line-span 1s forwards;
}

.tooltip-line::before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: black;
}

.tooltip-text {
  opacity: 0;
  overflow: hidden;
  width: 0;
  white-space: nowrap;
  animation: typing 1s steps(30) 0.1s forwards;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-33.33%);
  }
}

@keyframes line-span {
  0% {
    width: 0;
  }
  50% {
    width: 50%;
  }
  100% {
    width: 100%;
  }
}

@keyframes typing {
  to {
    opacity: 1;
    width: 100%;
  }
}

/* Example line with bends */
.tooltip-line-container:nth-child(2) .tooltip-line {
  animation: line-span 1s forwards, line-bend 2s forwards;
}

@keyframes line-bend {
  0% {
    width: 0;
    transform: translateX(0) rotate(0deg);
  }
  50% {
    width: 50%;
    transform: translateX(50px) rotate(45deg);
  }
  100% {
    width: 100%;
    transform: translateX(100px) rotate(0deg);
  }
}
</style>
