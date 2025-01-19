<template>
  <div ref="canvasContainer" class="three-container absolute">
    <!-- Loading Indicator -->
    <div v-if="isLoading" class="loading-indicator">
      <div class="spinner"></div>
    </div>

    <!-- Carousel Layout -->
    <div class="carousel">
      <!-- Next Model Image (Static Left) -->
      <div v-if="state.models[nextIndex]" class="carousel-item static-left">
        <img :src="state.models[nextIndex].image" alt="Next Model Preview" />
      </div>

      <!-- Current Model (Center) -->
      <div class="carousel-item center">
        <img
          v-if="state.models[state.currentIndex].image"
          :src="state.models[state.currentIndex].image"
          alt="Current Model Preview"
        />
        <div v-else ref="modelCanvas" class="model-canvas"></div>
      </div>

      <!-- Last Model Image (Static Right) -->
      <div v-if="state.models[lastIndex]" class="carousel-item static-right">
        <img :src="state.models[lastIndex].image" alt="Last Model Preview" />
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button class="prev-button" @click="prevModel"><svg height="auto" width="auto" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff" stroke="#ffffff" stroke-width="2.56" transform="rotate(180)"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#bdedff" stroke-width="21.503999999999998"> <path style="fill:#3dcfff;" d="M108.432,512c-5.363,0-10.754-1.238-15.775-3.752c-11.973-5.995-19.41-18.04-19.41-31.429V199.195 c0-7.642,6.196-13.836,13.836-13.836c7.64,0,13.836,6.195,13.836,13.836v277.624c0,4.168,2.888,6.063,4.129,6.686 c1.241,0.621,4.49,1.799,7.826-0.699L408.08,261.987c2.61-1.951,2.998-4.588,2.998-5.987s-0.389-4.036-2.998-5.988L112.875,29.195 c-3.335-2.497-6.586-1.32-7.826-0.699c-1.241,0.623-4.129,2.518-4.129,6.686v57.144c0,7.642-6.196,13.836-13.836,13.836 s-13.836-6.195-13.836-13.836V35.182c0-13.389,7.437-25.433,19.41-31.429c11.97-5.995,26.069-4.739,36.795,3.282l295.206,220.818 c8.958,6.701,14.095,16.961,14.095,28.147c0,11.187-5.137,21.446-14.095,28.146l-295.207,220.82 C123.224,509.623,115.857,512,108.432,512z"></path> <polygon style="fill:#bdedff;" points="150.989,120.234 150.989,391.766 332.492,256 "></polygon> <path style="fill:#3dcfff;" d="M150.987,405.604c-2.113,0-4.235-0.483-6.195-1.465c-4.684-2.345-7.64-7.134-7.64-12.371V120.233 c0-5.238,2.958-10.027,7.64-12.371c4.682-2.345,10.292-1.844,14.484,1.292L340.78,244.921c3.491,2.612,5.548,6.719,5.548,11.08 c0,4.361-2.056,8.468-5.548,11.08L159.277,402.849C156.839,404.671,153.922,405.604,150.987,405.604z M164.825,147.863v216.276 l144.566-108.137L164.825,147.863z"></path> </g><g id="SVGRepo_iconCarrier"> <path style="fill:#3dcfff;" d="M108.432,512c-5.363,0-10.754-1.238-15.775-3.752c-11.973-5.995-19.41-18.04-19.41-31.429V199.195 c0-7.642,6.196-13.836,13.836-13.836c7.64,0,13.836,6.195,13.836,13.836v277.624c0,4.168,2.888,6.063,4.129,6.686 c1.241,0.621,4.49,1.799,7.826-0.699L408.08,261.987c2.61-1.951,2.998-4.588,2.998-5.987s-0.389-4.036-2.998-5.988L112.875,29.195 c-3.335-2.497-6.586-1.32-7.826-0.699c-1.241,0.623-4.129,2.518-4.129,6.686v57.144c0,7.642-6.196,13.836-13.836,13.836 s-13.836-6.195-13.836-13.836V35.182c0-13.389,7.437-25.433,19.41-31.429c11.97-5.995,26.069-4.739,36.795,3.282l295.206,220.818 c8.958,6.701,14.095,16.961,14.095,28.147c0,11.187-5.137,21.446-14.095,28.146l-295.207,220.82 C123.224,509.623,115.857,512,108.432,512z"></path> <polygon style="fill:#bdedff;" points="150.989,120.234 150.989,391.766 332.492,256 "></polygon> <path style="fill:#3dcfff;" d="M150.987,405.604c-2.113,0-4.235-0.483-6.195-1.465c-4.684-2.345-7.64-7.134-7.64-12.371V120.233 c0-5.238,2.958-10.027,7.64-12.371c4.682-2.345,10.292-1.844,14.484,1.292L340.78,244.921c3.491,2.612,5.548,6.719,5.548,11.08 c0,4.361-2.056,8.468-5.548,11.08L159.277,402.849C156.839,404.671,153.922,405.604,150.987,405.604z M164.825,147.863v216.276 l144.566-108.137L164.825,147.863z"></path> </g></svg></button>
    <button class="next-button" @click="nextModel"><svg height="auto" width="auto" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#ffffff" stroke="#ffffff" stroke-width="2.56"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" stroke="#bdedff" stroke-width="21.503999999999998"> <path style="fill:#3dcfff;" d="M108.432,512c-5.363,0-10.754-1.238-15.775-3.752c-11.973-5.995-19.41-18.04-19.41-31.429V199.195 c0-7.642,6.196-13.836,13.836-13.836c7.64,0,13.836,6.195,13.836,13.836v277.624c0,4.168,2.888,6.063,4.129,6.686 c1.241,0.621,4.49,1.799,7.826-0.699L408.08,261.987c2.61-1.951,2.998-4.588,2.998-5.987s-0.389-4.036-2.998-5.988L112.875,29.195 c-3.335-2.497-6.586-1.32-7.826-0.699c-1.241,0.623-4.129,2.518-4.129,6.686v57.144c0,7.642-6.196,13.836-13.836,13.836 s-13.836-6.195-13.836-13.836V35.182c0-13.389,7.437-25.433,19.41-31.429c11.97-5.995,26.069-4.739,36.795,3.282l295.206,220.818 c8.958,6.701,14.095,16.961,14.095,28.147c0,11.187-5.137,21.446-14.095,28.146l-295.207,220.82 C123.224,509.623,115.857,512,108.432,512z"></path> <polygon style="fill:#bdedff;" points="150.989,120.234 150.989,391.766 332.492,256 "></polygon> <path style="fill:#3dcfff;" d="M150.987,405.604c-2.113,0-4.235-0.483-6.195-1.465c-4.684-2.345-7.64-7.134-7.64-12.371V120.233 c0-5.238,2.958-10.027,7.64-12.371c4.682-2.345,10.292-1.844,14.484,1.292L340.78,244.921c3.491,2.612,5.548,6.719,5.548,11.08 c0,4.361-2.056,8.468-5.548,11.08L159.277,402.849C156.839,404.671,153.922,405.604,150.987,405.604z M164.825,147.863v216.276 l144.566-108.137L164.825,147.863z"></path> </g><g id="SVGRepo_iconCarrier"> <path style="fill:#3dcfff;" d="M108.432,512c-5.363,0-10.754-1.238-15.775-3.752c-11.973-5.995-19.41-18.04-19.41-31.429V199.195 c0-7.642,6.196-13.836,13.836-13.836c7.64,0,13.836,6.195,13.836,13.836v277.624c0,4.168,2.888,6.063,4.129,6.686 c1.241,0.621,4.49,1.799,7.826-0.699L408.08,261.987c2.61-1.951,2.998-4.588,2.998-5.987s-0.389-4.036-2.998-5.988L112.875,29.195 c-3.335-2.497-6.586-1.32-7.826-0.699c-1.241,0.623-4.129,2.518-4.129,6.686v57.144c0,7.642-6.196,13.836-13.836,13.836 s-13.836-6.195-13.836-13.836V35.182c0-13.389,7.437-25.433,19.41-31.429c11.97-5.995,26.069-4.739,36.795,3.282l295.206,220.818 c8.958,6.701,14.095,16.961,14.095,28.147c0,11.187-5.137,21.446-14.095,28.146l-295.207,220.82 C123.224,509.623,115.857,512,108.432,512z"></path> <polygon style="fill:#bdedff;" points="150.989,120.234 150.989,391.766 332.492,256 "></polygon> <path style="fill:#3dcfff;" d="M150.987,405.604c-2.113,0-4.235-0.483-6.195-1.465c-4.684-2.345-7.64-7.134-7.64-12.371V120.233 c0-5.238,2.958-10.027,7.64-12.371c4.682-2.345,10.292-1.844,14.484,1.292L340.78,244.921c3.491,2.612,5.548,6.719,5.548,11.08 c0,4.361-2.056,8.468-5.548,11.08L159.277,402.849C156.839,404.671,153.922,405.604,150.987,405.604z M164.825,147.863v216.276 l144.566-108.137L164.825,147.863z"></path> </g></svg>
    </button>

  
    <!-- Select Model Message -->
    <div v-if="!selectedModel" class="select-message">
      <p>Please select a body</p>
    </div>

    <!-- Select This Model Button -->
    <button 
      v-if="!selectedModel" 
      class="select-button" 
      @click="selectModel"
    >
      Select this body
    </button>
  </div>
</template>

<script>
import { onMounted, ref, reactive, nextTick, computed } from "vue"; // Added 'computed' import
import * as THREE from "three";

export default {
  name: "ThreeModel",
  setup() {
    const canvasContainer = ref(null);

    const state = reactive({
      models: [
        {
          image: "hg.png",
          path: "models/test3.glb",
          scale: 0.03,
          position: [0, -3, 0],
          loaded: false,
        },
        {
          image: "applenew.png",
          path: "models/test2.glb",
          scale: 0.03,
          position: [0, -3, 0],
          loaded: false,
        },
        {
          image: "intri.png",
          path: "models/test4.glb",
          scale: 0.03,
          position: [0, -3, 0],
          loaded: false,
        },
      ],
      currentIndex: 0,
      isLoading: false, // Indicates if the model is currently loading
    });

    let scene, camera, renderer, controls;

    const loadModel = (index) => {
      const model = state.models[index];
      state.isLoading = true; // Show loading spinner
      import("three/examples/jsm/loaders/GLTFLoader.js").then(({ GLTFLoader }) => {
        import("three/examples/jsm/loaders/DRACOLoader.js").then(({ DRACOLoader }) => {
          const dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v3/decoders/");

          const loader = new GLTFLoader();
          loader.setDRACOLoader(dracoLoader);

          loader.load(
            model.path,
            (gltf) => {
              const object = gltf.scene;
              object.scale.set(model.scale, model.scale, model.scale);
              object.position.set(...model.position);
              scene.add(object);
              model.object = object;
              model.loaded = true;

              // Hide loading spinner after model is loaded
              state.isLoading = false;

              // Remove the previous model if it exists
              const prevModelIndex =
                (index - 1 + state.models.length) % state.models.length;
              const prevModel = state.models[prevModelIndex];
              if (prevModel?.object) {
                scene.remove(prevModel.object);
                prevModel.object = null;
              }
            },
            undefined,
            (error) => {
              console.error("Error loading model:", error);
              state.isLoading = false; // Hide spinner even if load fails
            }
          );
        });
      });
    };

    const prevModel = () => {
      state.currentIndex =
        (state.currentIndex - 1 + state.models.length) % state.models.length;
      loadModel(state.currentIndex);
    };

    const nextModel = () => {
      state.currentIndex = (state.currentIndex + 1) % state.models.length;
      loadModel(state.currentIndex);
    };

    const nextIndex = computed(() =>
      (state.currentIndex + 1) % state.models.length
    );
    const lastIndex = computed(() =>
      (state.currentIndex - 1 + state.models.length) % state.models.length
    );

    onMounted(() => {
      nextTick(() => {
        if (!canvasContainer.value) {
          console.error("canvasContainer is not available.");
          return;
        }

        // Three.js Setup
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        );
        camera.position.set(0, 1, 5);
        renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0xffffff, 1);
        canvasContainer.value.appendChild(renderer.domElement);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 1);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
        directionalLight.position.set(5, 5, 10);
        scene.add(directionalLight);

        // OrbitControls
        import("three/examples/jsm/controls/OrbitControls.js").then(
          ({ OrbitControls }) => {
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.minDistance = 4;
            controls.maxDistance = 3;
            controls.target.set(0, 0, 0);
            controls.update();
          }
        );

        // Initial model load
        loadModel(state.currentIndex);

        // Animation Loop
        const animate = () => {
          requestAnimationFrame(animate);
          controls?.update();
          renderer.render(scene, camera);
        };
        animate();

        // Resize Event
        window.addEventListener("resize", () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        });
      });
    });

    return {
      canvasContainer,
      prevModel,
      nextModel,
      nextIndex,
      lastIndex,
      state,
    };
  },
};
</script>

<style scoped>

.select-message {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  font-size: 16px;
  color: #fff;
}

.select-button {
  position: absolute;
    top: 47vh;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    /* background-color: #007bff; */
        /* background-color: rgb(0 0 0); */
        color: #000000;
    /* color: white; */
    text-transform: uppercase;
    border: none;
    /* border-radius: 5px; */
    cursor: pointer;
    font-size: 1vw;
    margin: 0;
    height: max-content;
    transition-duration:background-color 3sec ease;
}

.select-button:hover {
  background-color: #5fd8fa;
  background-color: rgb(0 0 0); 
  transition-duration: background-color 3sec ease;
  color: white; 
}


.three-container {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
}

.carousel {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60%;
  height: 100%;
    /* position: relative; */
    /* z-index: 100; */
}

.carousel-item {
  width: 54%;
    opacity: .2;
    height: 100%;
    position: absolute;
    /* top: 13vh; */
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
}

.static-left {
  position: absolute;
  /* left: 10%; */
}

.center {
  position: relative;
  z-index: 1;
}

.static-right {
  position: absolute;
    right: 0%;
    z-index: 10;
}

.model-canvas {
  width: 100%;
  height: 100%;
}

.loading-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.8);
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border: 6px solid #f3f3f3;
  border-top: 6px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  /* background: rgba(0, 0, 0, 0.5); */
  color: rgb(108 193 225);
  border: none;
  padding: 0 0vw;
  margin: 0 25vw;
  font-size: 18vw;
  cursor: pointer;
  z-index: 10;
  /* box-shadow: rgba(72, 135, 202, 0.8) 0 0 90px 33px; */

}


.prev-button {
  left: 1rem;
}

.next-button {
  right: 1rem;
}

.prev-button svg {
  width: 7vw;
}

.next-button svg{
  width: 7vw;
}
</style>
