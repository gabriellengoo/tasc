<template>
  <div class="scroller-wrapper">
    <div class="scroller" @mouseover="isHovered = true" @mouseleave="isHovered = false">
      <div v-for="(pair, index) in pairedImages" :key="index" class="image-group">
        <div v-for="(image, imgIndex) in pair" :key="imgIndex" class="image-loop"
          :class="imgIndex === 0 ? 'higher' : 'lower'" @mouseover="hoveredIndex = image.default"
          @mouseleave="hoveredIndex = null">
          <router-link :to="`/model/${image.model}`">
            <!--   :src="
                hoveredIndex === image.default ? image.hover : image.default
              " -->
            <img :src="image.default
              " alt="Scrolling image" class="loop-image" @click="selectModel(image)" />
          </router-link>
          <div v-if="hoveredIndex === image.default" class="tooltip">
            <div class="tooltip-line-container">
              <div class="tooltip-line"></div>
            </div>
            <div class="tooltip-text" v-html="getText(image.default)"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
// import { useRouter } from "vue-router";

// const router = useRouter();

// const selectModel = (image) => {
//   router.push({
//     path: '/model-viewer',
//     query: { id: image.id }
//   });
// };

const images = [
  {
    id: "M_01",
    default: "/ovalm.png",
    model: "maovam",
    hover: "/ovalm.png",
  },
  {
    id: "W_01",
    default: "/pear.png",
    model: "pearfem",
    hover: "/pear.png",
  },



  {
    id: "W_02",
    default: "/auth.png",
    model: "athfm",
    hover: "/auth.png",
  },

  {
    id: "M_02",
    default: "/squarem.png",
    model: "squarem",
    hover: "/squarem.png",
  },

  // { id: "M_03", default: "/intrim.png", model: "intrim.glb", hover: "/intrim.png" },
  {
    id: "M_03",
    default: "/menhh.png",
    model: "inrimam",
    hover: "/menhh.png",
  },
  {
    id: "W_03",
    default: "/intriw.png",
    model: "inrifem",
    hover: "/intriw.png",
  },


  {
    id: "M_04",
    default: "/trim.png",
    model: "trim",
    hover: "/trim.png",
  },

  {
    id: "W_04",
    default: "/apple.png",
    model: "applefem",
    hover: "/apple.png",
  },


  {
    id: "M_05",
    default: "/mende.png",
    model: "maledefault",
    hover: "/menhh.png",
  },
  {
    id: "W_05",
    default: "/femh.png",
    model: "hour",
    hover: "/femh.png",
  },

  // { id: "W_02", default: "/squw.png", model: "squw.glb", hover: "/squw.png" },


];

// Pair images together
const pairedImages = computed(() => {
  let pairs = [];
  for (let i = 0; i < images.length; i += 2) {
    pairs.push([images[i], images[i + 1]]);
  }
  return [...pairs, ...pairs, ...pairs]; // Duplicate for seamless scrolling
});

const hoveredIndex = ref(null);
const isHovered = ref(false);

const getText = (image) => {
  if (image.includes("pear")) return "WOMENSWEAR <br> Pear Body <br> 01/10";
  if (image.includes("squw")) return "WOMENSWEAR <br> Square Body <br> 02/10";
  if (image.includes("intriw"))
    return "WOMENSWEAR <br> Inverted Triangle Body <br> 03/10";
  if (image.includes("apple")) return "WOMENSWEAR <br> Apple Body <br> 04/10";
  if (image.includes("femh"))
    return "WOMENSWEAR <br> Hourglass Body <br> 05/10";
  if (image.includes("mende"))
    return "MENSWEAR <br> Trapezoid Body <br> 06/10";
  if (image.includes("ovalm")) return "MENSWEAR <br> Oval Body <br> 07/10";
  if (image.includes("auth")) return "WOMENSWEAR <br> Oval Body <br> 07/10";
  if (image.includes("squarem")) return "MENSWEAR <br> Square Body <br> 08/10";
  if (image.includes("menhh"))
    return "MENSWEAR <br> Inverted Triangle Body <br> 09/10";
  if (image.includes("trim")) return "MENSWEAR <br> Triangle Body <br> 10/10";

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
  top: 13vh;
  left: 0;
}

.scroller {
  display: flex;
  gap: 2px;
  width: max-content;
  animation: scroll 17s linear infinite;
  animation-play-state: running;
  transition: animation-play-state 0.3s;
}

.scroller:hover {
  animation-play-state: paused;
}

.image-group {
  display: flex;
  flex-direction: column;
  gap: 3vw;
  min-width: 10vw;
  min-width: 20vw;
}

.image-loop {
  position: relative;
  width: auto;
  height: -moz-max-content;
  height: 50vw;
}

.loop-image {
  width: auto;
  height: 36vw;
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
/* .tooltip-line-container:nth-child(2) .tooltip-line {
  animation: line-span 1s forwards, line-bend 2s forwards;
} */

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

.image-group {
  display: flex;
  flex-direction: column;
  flex-direction: row;
  gap: 1vw;
  min-width: 20vw;
  padding: 5vw;
}

.image-loop {
  position: relative;
  width: auto;
  height: 50vw;
}

.loop-image {
  width: auto;
  height: 36vw;
  object-fit: contain;
  opacity: 1;
}

/* Adjust positioning */
.higher {
  transform: translateY(-5vw);
}

.lower {
  transform: translateY(-5vw);

  /*     transform: translateY(-4vw);
    height: 20vw;
    width: 15.5vw; */
}
</style>
