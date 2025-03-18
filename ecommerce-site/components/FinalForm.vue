<template>
    <div>
      <h2 class="headerform">Final Preferences</h2>
  
      <div class="formstyle">
        <!-- Modesty Section -->
        <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <div v-if="currentChunk === 0" class="form-section">
            <h3 class="smalllable1">BODY - STEP 2.4 (Modesty Check)</h3>
            <label class="smalllable2">Are there any areas you would like to highlight in your outfits?</label>
            
            <!-- Custom Buttons -->
            <div class="stepbtncontainer">
              <button 
                v-for="option in ['No', 'Neutral', 'Highlight']"
                :key="option"
                class="btns"
                :class="{ selected: modesty === option }"
                @click="selectOption('modesty', option)">
                {{ option }}
              </button>
            </div>
          </div>
        </transition>
  
        <!-- Budget Section -->
        <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <div v-if="currentChunk === 1" class="form-section">
            <h3 class="smalllable1 pt-[2vw]">BUDGET - STEP 3</h3>
            <div v-for="item in budgetItems" :key="item.key">
              <label class="smalllable2">{{ item.name }}</label>
              <div class="budget-container">
                <button 
                  v-for="level in ['£', '££', '£££', '££££']"
                  :key="level"
                  :class="{'selected': budget[item.key] === level, 'unselected': budget[item.key] !== level}"
                  @click="selectBudget(item.key, level)">
                  {{ level }}
                </button>
              </div>
            </div>
          </div>
        </transition>
  
        <!-- Preferences Section -->
        <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <div v-if="currentChunk === 2" class="form-section">
            <h3 class="smalllable1 pt-[2vw]">PREFERENCES - STEP 4</h3>
            <label class="smalllable2">How do you like your clothes to fit?</label>
            
            <!-- Custom Buttons -->
            <div class="stepbtncontainer">
              <button 
                v-for="option in ['Fitted', 'True to Size', 'Oversized']"
                :key="option"
                class="btns"
                :class="{ selected: fit === option }"
                @click="selectOption('fit', option)">
                {{ option }}
              </button>
            </div>
          </div>
        </transition>
      </div>
  
      <button class="headerform" @click="submitFinalForm">Submit</button>
  
      <!-- Navigation Buttons -->
      <div>
        <button v-if="currentChunk > 0" @click="prevStep">Previous</button>
        <button v-if="currentChunk < 2" @click="nextStep">Next</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        currentChunk: 0,
        modesty: "",
        budget: {
          outerwear: "",
          knitwear: "",
          tops: "",
          bottoms: "",
          dresses: "",
          footwear: "",
          accessories: "",
          jewellery: "",
        },
        fit: "",
        budgetItems: [
          { name: "Outerwear", key: "outerwear" },
          { name: "Knitwear", key: "knitwear" },
          { name: "Tops", key: "tops" },
          { name: "Bottoms", key: "bottoms" },
          { name: "Dresses", key: "dresses" },
          { name: "Footwear", key: "footwear" },
          { name: "Accessories", key: "accessories" },
          { name: "Jewellery", key: "jewellery" },
        ],
      };
    },
    methods: {
      nextStep() {
        if (this.currentChunk < 2) this.currentChunk++;
      },
      prevStep() {
        if (this.currentChunk > 0) this.currentChunk--;
      },
      selectOption(category, value) {
        this[category] = value;
      },
      selectBudget(category, level) {
        this.budget[category] = level;
      },
      submitFinalForm() {
        console.log('Submitting Final Form:', this.$data);
        this.$emit('close');
      },
      beforeEnter(el) {
        el.style.opacity = 0;
      },
      enter(el, done) {
        el.offsetHeight; // Trigger reflow
        el.style.transition = 'opacity 0.5s';
        el.style.opacity = 1;
        done();
      },
      leave(el, done) {
        el.style.transition = 'opacity 0.5s';
        el.style.opacity = 0;
        done();
      },
    },
  };
  </script>
  
  <style scoped>
  /* Button Styling */
  .btns {
    background-color: #f0f0f0;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .btns.selected {
    background-color: #4CAF50;
    color: white;
  }
  
  .stepbtncontainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }
  
  .stepbtncontainer2 {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }
  
  .stepbtncontainer button {
    margin-right: 10px;
  }
  
  .selected2 {
    background-color: #FF5733;
    color: white;
  }
  
  .slide-enter-active, .slide-leave-active {
    transition: transform 0.5s ease;
  }
  .slide-enter, .slide-leave-to {
    transform: translateY(100%);
  }
  
  .nextbtn {
    margin-top: 20px;
  }
  </style>
  