<template>
  <div class="model-container">
    <canvas ref="canvas"  :style="{ width, height }"></canvas>
  </div>
</template>

<script>
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default {
  props: {
    modelPath: String,
    width: { type: String, default: "50vw" },
    height: { type: String, default: "50vh" },
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
      this.initThreeJS();
    }
  },
  methods: {
    initThreeJS() {
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
          this.model = gltf.scene;
          this.model.scale.set(1.1, 1.1, 1.1);
          // this.model.rotation.y = -Math.PI / 2;
          this.model.position.set(0, -1, 0);

          this.scene.add(this.model);

          if (gltf.animations.length) {
            this.mixer = new THREE.AnimationMixer(this.model);
            gltf.animations.forEach((clip) => this.mixer.clipAction(clip).play());
          }

          const ambientLight = new THREE.AmbientLight(0xffffff, 1);
          this.scene.add(ambientLight);

          const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
          directionalLight.position.set(5, 5, 5);
          this.scene.add(directionalLight);

          this.animate();
        },
        undefined,
        (error) => console.error("Error loading model:", error)
      );

      // this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      // this.controls.enableDamping = true;
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
  /* height: 100%; */
  /* height: 65vh; */
  /* width: 100%; */
}

</style>
