<!-- StepOne.vue -->
<template>
    <div class="formstyle">
      <h1 class="headerform">Step 1</h1>
      <label for="name">What's your name?</label>
      <input type="text" v-model="formData.name" id="name" />
      
      <label for="email">What's your e-mail?</label>
      <input type="email" v-model="formData.email" id="email" />
  
      <label for="age">Please select your age range</label>
      <select v-model="formData.age">
        <option value="18-24">18-24</option>
        <option value="25-34">25-34</option>
        <option value="35-44">35-44</option>
        <option value="45-59">45-59</option>
        <option value="60+">60+</option>
      </select>
  
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
        }
      };
    },
    methods: {
      nextStep() {
        this.$emit('next', this.formData); // Emit data to parent
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
  
  input {
margin-bottom: 2vw;
margin-bottom: 2vw;
    background: none;
    border-bottom: black .1vw solid;
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
  input[type="range"]:focus {
  border-color: #ffffff00; 
  /* box-shadow: 0 0 5px rgba(52, 152, 219, 0.3); Optional focus effect */
}

  input[type="range"] {
  font-size: 1rem;
  margin: 5px 0;
  /* border: 1px solid #ecf0f1; */
  outline: none;
  transition: border-color 0.3sease;
  width: 100%;
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