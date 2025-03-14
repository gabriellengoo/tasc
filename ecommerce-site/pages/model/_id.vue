<template>
  <div v-if="!modelPath" class="error">Model Not Found</div>


  <div v-else class="model-wrapper">

    <div class="content1">
      <Name />
    </div>

    <div class="content">
      <Form :model="morphMesh" @update-morph="applyMorphUpdate" />
    </div>

    <ModelViewer 
      :modelPath="modelPath" 
      width="40vw" 
      height="40vh" 
      :morphMesh="morphMesh" 
    />

  </div>
</template>

<script>
import ModelViewer from "~/components/ModelViewer.vue";
import Form from "~/components/form.vue";
import Name from '~/components/Name.vue';

export default {
  async asyncData({ params }) {
    console.log("Route Params:", params);
    return { id: params.id };
  },
  components: { ModelViewer, Form, Name },
  data() {
    return {
      canvas: null,
      modelPath: null,
      morphMesh: {},
      models: {
        maovam: "/models/maovam.glb",
        squarem: "/models/squarem.glb",
        inrimam: "/models/inrimam.glb",
        inrifem: "/models/inrifem.glb",
        mendefultm: "/models/mendefultm.glb",
        hourt: "/models/hourt.glb",
        squw: "/models/squw.glb",
        applefem: "/models/applefem.glb",
        pearfem: "/models/pearfem.glb",
        athfm: "/models/athfm.glb",
      },
    };
  },
  mounted() {
    this.modelPath = this.models[this.$route.params.id] || null;
  },
  methods: {
  applyMorphUpdate({ key, value }) {
    console.log(`👨‍👨‍👧‍👧 Received morph update: ${key} = ${value}`);

    if (this.morphMesh && this.morphMesh.morphTargetDictionary) {
      const index = this.morphMesh.morphTargetDictionary[key];

      if (index !== undefined) {
        // Update Three.js morph target influence
        this.morphMesh.morphTargetInfluences[index] = parseFloat(value);
        console.log(`👨‍👨‍👧‍👧 ✅ Updated morph target ${key} to ${value}`);

        // Trigger render if necessary
        this.$nextTick(() => {
          this.$refs.modelViewer.renderScene();
        });
      } else {
        console.warn(`👨‍👨‍👧‍👧 ⚠️ Morph target ${key} not found in dictionary`);
      }
    }
  }
},
};
</script>

<style scoped>
.model-wrapper {
  display: flex;
  width: 100%;
  height: 100vh;
  /* top: 5vh; */
  /* padding-top: 5vh; */
  margin-top: 7vh;
  position: relative;
  border-top: #333 solid .1vw;
  /* border-bottom:#333 solid .1vw; */
}

.model-viewer {
  /* width: 50vw; */
  /* height: 100vh; */
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  width: 50%;
  height: 100%;
  padding: 20px;
  background-color: #e7ecea;
  background-color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  z-index: 2;
  border-right: #333 solid .1vw;
}

.content1 {
  width: 30%;
  height: 100%;
  padding: 20px;
  /* background-color: #f0f0f0; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  z-index: 2;
  border-right: #333 solid .1vw;
}

.content h1 {
  font-size: 2rem;
  text-align: center;
}
</style>
