<template>
  <div class="model-container">
    <canvas ref="canvas"></canvas>
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
    };
  },
  mounted() {
    if (this.modelPath) {
      console.log("🚀 ModelViewer mounted, initializing Three.js");
      this.initThreeJS();
    }
  },
  watch: {
    morphMesh: {
      handler(newVal) {
        console.log("Updating morph targets:", newVal);
        this.applyMorphTargets();
      },
      deep: true,
    },
  },
  methods: {
    renderScene() {
      if (this.renderer && this.scene && this.camera) {
        this.renderer.render(this.scene, this.camera);
      }
    },

    initThreeJS() {
      console.log("🔧 Initializing Three.js scene...");
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

      const loader = new GLTFLoader();
      loader.load(
        this.modelPath,
        (gltf) => {
          console.log("✅ Model loaded:", this.modelPath);
          this.model = gltf.scene;
          this.model.scale.set(1.1, 1.1, 1.1);
          this.model.position.set(0, -1, 0);
          this.scene.add(this.model);

          if (gltf.animations.length > 0) {
            this.mixer = new THREE.AnimationMixer(this.model);
            const action = this.mixer.clipAction(gltf.animations[0]);
            action.play();
          }

          this.logMorphTargets();
          this.applyMorphTargets();

          const ambientLight = new THREE.AmbientLight(0xffffff, 1);
          this.scene.add(ambientLight);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
          directionalLight.position.set(5, 50, 5);
          this.scene.add(directionalLight);

          this.animate();
        },
        undefined,
        (error) => console.error("❌ Error loading model:", error)
      );
    },

    updateMorphTarget(targetName, value) {
      if (this.model) {
        this.model.traverse((child) => {
          if (child.isMesh && child.morphTargetDictionary && targetName in child.morphTargetDictionary) {
            const index = child.morphTargetDictionary[targetName];
            child.morphTargetInfluences[index] = value;
          }
        });
        this.renderScene();
      }
    },

    logMorphTargets() {
      if (!this.model) return;
      console.log("🔍 Checking for morph targets...");
      this.model.traverse((child) => {
        if (child.isMesh && child.morphTargetDictionary) {
          console.log(`🎭 Morph targets found on ${child.name}:`, child.morphTargetDictionary);
        }
      });
    },


    zoomToPart(part) {
      const positions = {
        height: { position: new THREE.Vector3(0, 2, 2), lookAt: new THREE.Vector3(0, 1.8, 0) },
        hips: { position: new THREE.Vector3(0, 0, 2), lookAt: new THREE.Vector3(0, -0.2, 0) },
        shoulders: { position: new THREE.Vector3(0, 1.5, 2), lookAt: new THREE.Vector3(0, 1.5, 0) },
        waist: { position: new THREE.Vector3(0, 0.5, 2), lookAt: new THREE.Vector3(0, 0.5, 0) },
      };

      if (!positions[part]) return;

      const targetPos = positions[part].position;
      const targetLookAt = positions[part].lookAt;

      // Animate Camera
      const duration = 1.5; // Time in seconds
      let startTime = performance.now();

      const animateZoom = (time) => {
        let progress = (time - startTime) / (duration * 1000);
        if (progress > 1) progress = 1;

        this.camera.position.lerp(targetPos, progress);
        this.camera.lookAt(targetLookAt);

        if (progress < 1) {
          requestAnimationFrame(animateZoom);
        }
      };

      requestAnimationFrame(animateZoom);
    },


    applyMorphTargets() {
      if (!this.morphMesh || !this.model) return;
      const morphValues = JSON.parse(JSON.stringify(this.morphMesh));
      console.log("🎭 Applying morph targets:", morphValues);

      this.model.traverse((child) => {
        if (child.isMesh && child.morphTargetInfluences) {
          ["height", "hips", "sholders", "waist"].forEach((key) => {
            if (child.morphTargetDictionary && child.morphTargetDictionary[key] !== undefined) {
              const index = child.morphTargetDictionary[key];
              child.morphTargetInfluences[index] = parseFloat(morphValues[key] || 0);
              console.log(`👩‍💻✅ Updated ${key} to ${morphValues[key]}`);
            }
          });
        }
      });
      this.renderScene();
    },

    animate() {
      requestAnimationFrame(this.animate);
      if (this.controls) this.controls.update();
      if (this.mixer) this.mixer.update(0.01);
      this.renderer.render(this.scene, this.camera);
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
