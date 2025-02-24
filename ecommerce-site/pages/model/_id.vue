<template>
  <div v-if="!modelPath" class="error">Model Not Found</div>

  <div v-else class="model-wrapper">
    <div class="content">
      <!-- Your text content here -->
      <Form :model="morphMesh" />
    </div>
    <div class="model-viewer">
      <canvas ref="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Form from "~/components/form.vue";

export default {
  async asyncData({ params }) {
    console.log("Route Params:", params);
    return { id: params.id };
  },
  data() {
    return {
      canvas: null,
      modelPath: null,
      models: {
        ovalm: "/models/ovalm.glb",
        squarem: "/models/squarem.glb",
        intrim: "/models/intrim.glb",
        trim: "/models/trim.glb",
        maledefault: "/models/maledefault.glb",
        hour: "/models/hourt.glb",
        W_02: "/models/squw.glb",
        W_03: "/models/intriw.glb",
        W_04: "/models/apple.glb",
        W_01: "/models/pear.glb",
      },
      controls: null, // Declare controls here
      mixer: null, // Declare animation mixer
      model: null, // Store model object
      morphTargets: {},  // Store morph target information
      morphMesh: null,
    };
  },
  mounted() {
    this.modelPath = this.models[this.$route.params.id];

    if (!this.modelPath) {
      console.error("Model StepID.vue not found!");
      return;
    }

    this.initThreeJS();
  },
  methods: {
    initThreeJS() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0xf9f9f1); // Light blue background color

      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 1, 3);

      this.canvas = this.$refs.canvas;
      const renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      const loader = new GLTFLoader();
      loader.load(
        this.modelPath,
        (gltf) => {
          this.model = gltf.scene;
          this.model.scale.set(1.5, 1.5, 1.5); // Scale down the model
          this.model.position.y = -1.5; // Lower the model by 1 unit
          this.model.rotation.y = -Math.PI / 2; // Rotates 45 degrees on the Y-axis

          scene.add(this.model);

          // Check if model has morph targets
           // Find and store the mesh with morph targets
      this.model.traverse((child) => {
        if (child.isMesh && child.morphTargetDictionary) {
          this.morphMesh = child;
          console.log("Morph Mesh Found StepID.vue:", this.morphMesh);
        }
      });

          console.log("Model StepID.vue Loaded:", this.model);

          // Add orbit controls
          this.controls = new OrbitControls(camera, renderer.domElement); // Assign to data property
          this.controls.enableDamping = true; // Smooth controls
          this.controls.dampingFactor = 0.25;
          this.controls.screenSpacePanning = false; // Prevent panning in screen space

          // Set up animation if available
          if (gltf.animations && gltf.animations.length) {
            this.mixer = new THREE.AnimationMixer(this.model);
            gltf.animations.forEach((clip) => {
              this.mixer.clipAction(clip).play(); // Play the first animation
            });
          }

          // Add more light
          const ambientLight = new THREE.AmbientLight(0xffffff, 3); // Ambient light
          scene.add(ambientLight);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 5); // Directional light
          directionalLight.position.set(5, 5, 5); // Position the light
          scene.add(directionalLight);

          animate();
        },
        undefined,
        (error) => console.error("Error loading model StepID.vue:", error)
      );

      const animate = () => {
        requestAnimationFrame(animate);

        // Update the controls
        if (this.controls) {
          this.controls.update();
        }

        // Update animation mixer if available
        if (this.mixer) {
          this.mixer.update(0.01); // Update animation
        }

        // Render the scene
        renderer.render(scene, camera);
      };

      animate();
    },
    // Method to adjust the morph target based on user selection
    updateMorphTarget(targetName, influence) {
      const targetIndex = this.morphTargets[targetName];
      if (targetIndex !== undefined) {
        // Set the influence for the morph target (0 - 1)
        this.model.traverse((child) => {
          if (child.isMesh && child.morphTargetDictionary) {
            console.log(
              "Morph Targets in id.vue StepID.vue:",
              child.morphTargetDictionary
            );
          }
        });
      }
    },
  },
};
</script>

<style scoped>
.model-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  top: 5vh;
  position: relative;
  /* border-top:#333 solid .1vw; */
}

.model-viewer {
  width: 50vw;
  /* height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  width: 70vw;
  height: 100vh;
  padding: 20px;
  /* background-color: #f0f0f0; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  z-index: 2;
  /* border-right:#333 solid .1vw; */
}

.content h1 {
  font-size: 2rem;
  text-align: center;
}
</style>
