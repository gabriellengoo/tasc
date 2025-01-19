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
    <button class="prev-button" @click="prevModel">‹</button>
    <button class="next-button" @click="nextModel">›</button>
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
          image: "pose.png",
          path: "models/test.glb",
          scale: 3,
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
          image: "pose.png",
          path: "models/test.glb",
          scale: 3,
          position: [0, -2, 0],
          loaded: false,
        },
        // {
        //   image: "model3.png",
        //   path: "models/test3.glb",
        //   scale: 2,
        //   position: [0, -3, 0],
        //   loaded: false,
        // },
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

        const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
        directionalLight.position.set(5, 5, 10);
        scene.add(directionalLight);

        // OrbitControls
        import("three/examples/jsm/controls/OrbitControls.js").then(
          ({ OrbitControls }) => {
            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.25;
            controls.minDistance = 2;
            controls.maxDistance = 10;
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
  width: 30%;
  height: 100%;
  position: absolute;
    /* top: 13vh; */
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
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
</style>
