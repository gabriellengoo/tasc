<template>
  <div class="formstyle">
    <h1 class="headerform">Step 2.3</h1>
    <label for="neck">Neck</label>
    <select v-model="formData.neck" @change="updateModel">
      <option value="thick">Thick</option>
      <option value="long">Long</option>
      <option value="short">Short</option>
      <option value="narrow">Narrow</option>
    </select>

    <label for="shoulders">Shoulders</label>
    <select v-model="formData.shoulders" @change="updateModel">
      <option value="broad">Broad Shoulders</option>
      <option value="narrow">Narrow Shoulders</option>
    </select>

    <label for="arms">Arms</label>
    <select v-model="formData.arms" @change="updateModel">
      <option value="long">Long</option>
      <option value="short">Short</option>
      <option value="thick">Thick</option>
      <option value="slim">Slim</option>
    </select>

    <label for="bust">Bust</label>
    <select v-model="formData.bust" @change="updateModel">
      <option value="large">Large Bust</option>
      <option value="small">Small Bust</option>
    </select>

    <label for="stomach">Stomach</label>
    <select v-model="formData.stomach" @change="updateModel">
      <option value="prominent">Prominent Stomach</option>
      <option value="slim">Slim Waist</option>
    </select>

    <label for="bum">Bum</label>
    <select v-model="formData.bum" @change="updateModel">
      <option value="full">Full Bum</option>
      <option value="flat">Flat Bum</option>
    </select>

    <label for="hips">Hips</label>
    <select v-model="formData.hips" @change="updateModel">
      <option value="wide">Wide Hips</option>
      <option value="narrow">Narrow Hips</option>
    </select>

    <label for="legs">Legs</label>
    <select v-model="formData.legs" @change="updateModel">
      <option value="long">Long Legs</option>
      <option value="short">Short Legs</option>
      <option value="thick">Thick Legs</option>
      <option value="slim">Slim Legs</option>
    </select>

    <button @click="nextStep">Next</button>
  </div>
</template>

<script>
export default {
  props: ['model'],
  data() {
    return {
      formData: {
        neck: '',
        shoulders: '',
        arms: '',
        bust: '',
        stomach: '',
        bum: '',
        hips: '',
        legs: ''
      }
    };
  },
  methods: {
    nextStep() {
      this.$emit('next', this.formData); // Emit data to parent
    },
    updateModel() {
      // Update the model based on user selections (body challenges)
      if (this.formData.neck) {
        this.model.neck = this.formData.neck;
      }

      if (this.formData.shoulders) {
        this.model.shoulders = this.formData.shoulders;
      }

      if (this.formData.arms) {
        this.model.arms = this.formData.arms;
      }

      if (this.formData.bust) {
        this.model.bust = this.formData.bust;
      }

      if (this.formData.stomach) {
        this.model.stomach = this.formData.stomach;
      }

      if (this.formData.bum) {
        this.model.bum = this.formData.bum;
      }

      if (this.formData.hips) {
        this.model.hips = this.formData.hips;
      }

      if (this.formData.legs) {
        this.model.legs = this.formData.legs;
      }
    }
  }
};
</script>

<style scoped>
  /* Global Styles */
  html, body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f7fa; /* Light background for the whole page */
    color: #333; /* Dark text color for readability */
  }
  
  /* Container for the form */
  .form-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff; /* White background for the form */
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin-top: 30px;
  }
  
  /* Title and Step Indicator */
  .form-container h1 {
    font-size: 2rem;
    color: #444;
    margin-bottom: 20px;
    text-align: center;
  }
  
  /* Sub-title or instructions */
  .form-container p {
    font-size: 1rem;
    color: #777;
    margin-bottom: 20px;
    text-align: center;
  }
  
  /* Form Step */
  .form-step {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  
  /* Input Fields */
  input[type="text"], input[type="email"], select {
    padding: 10px;
    font-size: 1rem;
    margin: 5px 0;
    /* border-radius: 5px; */
    border: 1px solid #ecf0f1;
    outline: none;
    transition: border-color 0.3sease;
  }
  
  /* Focus state for inputs */
  input[type="text"]:focus, input[type="email"]:focus, select:focus {
    border-color: #3498db; /* Highlight border when focused */
    box-shadow: 0 0 5px rgba(52, 152, 219, 0.3); /* Optional focus effect */
  }
  
  /* Labels for inputs */
  label {
    font-size: 1.1vw;
    color: #555;
    margin-bottom: 5px;
  }
  
  /* Button Styling */
  button {
    /* background-color: #3498db;
    color: #fff; */
    font-size: 1.1vw;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-top: 20px;
    align-self: center;
    font-family: 'Algerian', sans-serif; 
  }
  
  /* Hover effect for buttons */
  button:hover {
    /* background-color: #2980b9; */
  }
  
  /* Button disabled state */
  button:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
  
  /* Progress Bar between steps */
  .progress-bar {
    width: 100%;
    height: 8px;
    background-color: #e0e0e0;
    margin: 20px 0;
    border-radius: 5px;
  }
  
  .progress-bar span {
    display: block;
    width: 0;
    height: 100%;
    background-color: #3498db;
    border-radius: 5px;
    transition: width 0.3s ease;
  }
  
  /* Step navigation and buttons */
  .navigation-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  
  .prev-button, .next-button {
    padding: 10px 15px;
    font-size: 1rem;
    background-color: #ecf0f1;
    color: #333;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .prev-button:hover, .next-button:hover {
    background-color: #bdc3c7;
  }
  
  /* Error messages or warnings */
  .error-message {
    color: red;
    font-size: 0.9rem;
    margin-top: 5px;
  }
  
  /* Responsive Design */
  @media (max-width: 768px) {
    .form-container {
      padding: 15px;
    }
  
    .form-container h1 {
      font-size: 1.5rem;
    }
  
    input[type="text"], input[type="email"], select {
      font-size: 1rem;
      padding: 8px;
    }
  
    button {
      padding: 10px 18px;
    }
  
    .navigation-buttons {
      flex-direction: column;
      align-items: center;
    }
  
    .prev-button, .next-button {
      width: 100%;
      margin-bottom: 10px;
    }
  }
  
  
  </style>
