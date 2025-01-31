<template>
    <div class="scroller-wrapper">
      <div class="scroller">
        <!-- Loop for 3 GIF images -->
        <div v-for="(image, index) in images" :key="index" class="image-loop">
          <img
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
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  // Define the three GIF images
  const images = ref([
    "/paer.gif", 
    "/squr.gif", 
    "/intri.gif"
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
  }
  
  .scroller {
    display: flex;
    gap: 2px;
    animation: scroll 20s linear infinite;
  }
  
  .image-loop {
    position: relative;
    width: 40vw; /* Adjust size */
    height: max-content;
  }
  
  .loop-image {
    position: absolute;
    width: 58%;
    height: 40vw;
    object-fit: contain;
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
    transition: opacity 0.3s ease-in-out;
    z-index: 1000;
  }
  
  .image-loop:hover .hover-text {
    opacity: 1;
  }
  </style>
  