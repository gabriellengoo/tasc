<template>
  <div class="formstyle">
    <h1 class="headerform">Step 1</h1>
    <label for="name">What's your name?</label>
    <input type="text" v-model="formData.name" id="name" />
    
    <label for="email">What's your e-mail?</label>
    <input type="email" v-model="formData.email" id="email" />

    <label for="age">Please select your age range</label>
    <div class="age-group">
      <button v-for="age in ageRanges" :key="age" 
              :class="{'selected': formData.age === age}" 
              @click="selectAge(age)">
        {{ age }}
      </button>
    </div>

    <button @click="nextStep">Next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        age: ''
      },
      ageRanges: ["18-24", "25-34", "35-44", "45-59", "60+"]
    };
  },
  methods: {
    selectAge(age) {
      this.formData.age = age;
    },
    nextStep() {
      this.$emit('next', this.formData); // Emit data to parent
    }
  }
};
</script>

<style scoped>
button {
  padding: 10px 15px;
  border: none;
  background: #fff;
  cursor: pointer;
  border-radius: 5px;
  transition: 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button:hover {
  background: #3498db;
  color: white;
}
.age-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.age-group button {
  padding: 10px 15px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  transition: background 0.3s, border-color 0.3s;
}

.age-group button.selected {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.age-group button:hover {
  background: #2980b9;
  color: white;
  border-color: #2980b9;
}
</style>





