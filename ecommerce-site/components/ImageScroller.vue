<template>
    <div class="scroller-wrapper">
      <div class="scroller">
        <div v-for="(group, index) in imageGroups" :key="index" class="image-group">
          <div class="image-loop">
            <img
              v-for="(image, imgIndex) in group"
              :key="imgIndex"
              :src="image"
              alt="Looping image"
              class="loop-image"
              @mouseover="hoveredText = getText(image)"
              @mouseleave="hoveredText = ''"
            />
            <!-- Spanning Text -->
            <span v-if="hoveredText" class="hover-text">{{ hoveredText }}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  
  
  <script setup>
  import { ref } from "vue";
  
  // Define multiple groups of 4 images
  const imageGroups = ref([
    ["/pear.png", "/paer2.png", "/paer3.png", "/paer4.png"],
    ["/squ.png", "/squ2.png", "/squ3.png", "/squ4.png"],
    ["/intri.png", "/intri2.png", "/intri3.png", "/intri4.png"],
  ]);
  
  // Hovered text
  const hoveredText = ref("");
  
  // Function to get text based on image name
  const getText = (image) => {
    if (image.includes("pear")) return "Pear Model";
    if (image.includes("squ")) return "Square Model";
    if (image.includes("intri")) return "Intricate Model";
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
    /* background: white; */
  }
  
  .scroller {
    display: flex;
    gap: 2px;
    animation: scroll 20s linear infinite;
  }
  
  .image-group {
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 10vw;
     /* Adjust as needed */
  }
  
  /* Image Loop Animation */
  .image-loop {
    position: relative;
    width: 40vw; /* Adjust size */
    height: max-content;
    /* padding: 2vw; */
  }
  
  .loop-image {
  position: absolute;
  width: 58%;
  height: 40vw;
  /* padding: 2vw; */
  object-fit: contain;
  /* animation: rotate-animation 4s infinite; */
  opacity: 0;
}

/* Apply a delay to each image based on its order */
.loop-image:nth-child(1) {
  animation-delay: 0s;
}
.loop-image:nth-child(2) {
  animation-delay: 1s;
}
.loop-image:nth-child(3) {
  animation-delay: 2s;
}
.loop-image:nth-child(4) {
  animation-delay: 3s;
}

@keyframes rotate-animation {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  25% {
    opacity: 1;
  }
  35% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

  
  /* Scrolling Animation */
  @keyframes scroll {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(-100%);
    }
  }

  .image-loop {
  position: relative;
  width: 40vw;
  height: max-content;
}

.loop-image {
  position: absolute;
  width: 58%;
  height: 40vw;
  object-fit: contain;
  animation: rotate-animation 4s infinite;
  opacity: 0;
}

/* Hover Text */
/* Hover Text */
.hover-text {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease-in-out; /* Add transition */
  z-index: 1000;
}

/* Show text when hovering over the image loop */
.image-loop:hover .hover-text {
  opacity: 1;
}


  </style>
  