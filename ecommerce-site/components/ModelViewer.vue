<template>
  <div class="model-container">
    <canvas ref="canvas"></canvas>
    <div class="controls absolute">
      <!-- Slider for controlling height morph target -->
      <input 
        type="range" 
        min="0" 
        max="1" 
        step="0.01" 
        v-model="heightValue"
        @input="updateHeight"
      />
      <label>Height: {{ heightValue }}</label>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
 props: {
    modelPath: String,
    morphMesh: Object,
    updateMorphTarget: Function,
  },
  data() {
    return {
      canvas: null,
      scene: null,
      camera: null,
      renderer: null,
      model: null,
      controls: null,
      mixer: null,
      heightValue: 0, // Initial height value (from slider)
    };
  },
  mounted() {
    if (this.modelPath) {
      console.log("🚀 ModelViewer mounted, initializing Three.js");
      this.initThreeJS();
    }
  },
  methods: {
    renderScene() {
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    },
    initThreeJS() {
      console.log("🔧 Initializing Three.js scene...");

      // Scene, Camera, Renderer setup
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xf9f9f1);

      this.camera = new THREE.PerspectiveCamera(
        50,
        this.$el.clientWidth / this.$el.clientHeight,
        0.1,
        1000
      );
      this.camera.position.set(0, 0, 3);

      this.canvas = this.$refs.canvas;
      this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
      this.renderer.setSize(this.$el.clientWidth, this.$el.clientHeight);

      // Load the model
      const loader = new GLTFLoader();
      loader.load(
        this.modelPath,
        (gltf) => {
          console.log("✅ Model loaded:", this.modelPath);
          this.model = gltf.scene;
          this.model.scale.set(1.1, 1.1, 1.1);
          this.model.position.set(0, -1, 0);

          this.scene.add(this.model);

          // Check for morph targets
          this.logMorphTargets();

          // Apply morph targets if provided
          this.applyMorphTargets();

          // Lighting setup
          const ambientLight = new THREE.AmbientLight(0xffffff, 1);
          this.scene.add(ambientLight);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
          directionalLight.position.set(5, 5, 5);
          this.scene.add(directionalLight);

          this.animate();
        },
        undefined,
        (error) => console.error("❌ Error loading model:", error)
      );
    },

    // Log morph target names when model is loaded
    logMorphTargets() {
      if (!this.model) return;
      console.log("🔍 Checking for morph targets...");

      this.model.traverse((child) => {
        if (child.isMesh && child.morphTargetDictionary) {
          console.log(`🎭 Morph targets found on ${child.name}:`, child.morphTargetDictionary);
        }
      });
    },

    // Apply morph target influences based on morphMesh values
    applyMorphTargets() {
      if (!this.morphMesh || !this.model) return;

      // Convert Vue reactive object to a plain JS object
      const morphValues = JSON.parse(JSON.stringify(this.morphMesh));

      console.log("🎭 Applying morph targets:", morphValues);

      this.model.traverse((child) => {
        if (child.isMesh && child.morphTargetInfluences) {
          Object.keys(morphValues).forEach((key) => {
            if (child.morphTargetDictionary && child.morphTargetDictionary[key] !== undefined) {
              const index = child.morphTargetDictionary[key];
              child.morphTargetInfluences[index] = parseFloat(morphValues[key]);
              console.log(`👩‍💻✅ Updated ${key} to ${morphValues[key]}`);
            }
          });
        }
      });

      this.renderer.render(this.scene, this.camera);
    },

    // Update height morph target dynamically when slider changes
    updateHeight() {
      this.morphMesh.height = this.heightValue; // Update the height value in morphMesh
      this.applyMorphTargets(); // Reapply morph targets with updated height
    },

    animate() {
      requestAnimationFrame(this.animate);
      if (this.controls) this.controls.update();
      if (this.mixer) this.mixer.update(0.01);
      this.renderer.render(this.scene, this.camera);
    },
  },
  watch: {
    morphMesh(newMorphMesh) {
      console.log("🔄 morphMesh updated:", newMorphMesh);
      this.applyMorphTargets(); // Apply changes when morphMesh updates
    },
  },
};
</script>


<style scoped>
.model-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
</style>
