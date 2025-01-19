<template>
  <client-only>
    <div ref="canvasContainer" class="three-container absolute"></div>
  </client-only>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  name: "ThreeModel",
  setup() {
    const canvasContainer = ref(null);

    onMounted(() => {
      // Import necessary Three.js modules
      import("three").then((THREE) => {
        const {
          Scene,
          PerspectiveCamera,
          WebGLRenderer,
          AmbientLight,
          DirectionalLight,
        } = THREE;

        // Dynamically import FBXLoader and OrbitControls
        Promise.all([
          import("three/examples/jsm/loaders/FBXLoader.js"),
          import("three/examples/jsm/controls/OrbitControls.js"),
        ]).then(([FBXLoaderModule, OrbitControlsModule]) => {
          const FBXLoader = FBXLoaderModule.FBXLoader;
          const OrbitControls = OrbitControlsModule.OrbitControls;

          // Initialize the scene, camera, and renderer
          const scene = new Scene();
          const camera = new PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
          );
          const renderer = new WebGLRenderer({ antialias: true });
          renderer.setSize(window.innerWidth, window.innerHeight);
          renderer.setClearColor(0xffffff, 1); // Set background color to white

          // Add the canvas to the DOM
          canvasContainer.value.appendChild(renderer.domElement);

          // Add lights to the scene
          const ambientLight = new AmbientLight(0x404040, 30); // Soft white ambient light
          scene.add(ambientLight);

          const directionalLight = new DirectionalLight(0xffffff, 10); // Bright directional light
          directionalLight.position.set(5, 5, 7.5);
          scene.add(directionalLight);

          // Load the FBX model
          const loader = new FBXLoader();
          loader.load("models/femalest.fbx", (object) => {
            // Scale the model
            object.scale.set(0.07, 0.07, 0.07); // Adjust the scale to make it smaller
            object.position.set(0, -6, 0);

            // Add the animation mixer
            const mixer = new THREE.AnimationMixer(object);

            // Traverse through the model to apply any additional settings
            object.traverse((child) => {
              if (child.isMesh) {
                child.castShadow = true; // Optional: Enable shadow casting
              }

              if (child.animations && child.animations.length > 0) {
                child.animations.forEach((animation) => {
                  mixer.clipAction(animation).play(); // Play the first animation
                });
              }
            });

            scene.add(object);

            // Adjust camera position to frame the model
            camera.position.set(0, 0, 10);

            // Render loop with animation updates
            const animate = () => {
              requestAnimationFrame(animate);
              mixer.update(0.01); // Update the animation
              renderer.render(scene, camera);
            };

            animate();
          });

          // Add OrbitControls for interactivity
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.enableDamping = true;
          controls.dampingFactor = 0.25;

          // Handle window resizing
          window.addEventListener("resize", () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
          });
        });
      });
    });

    return {
      canvasContainer,
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
}
</style>
