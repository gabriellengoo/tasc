<template>
    <div>
      <h2 class="headerform">Final Preferences</h2>
  
      <div class="formstyle">
        <!-- Modesty Section -->
        <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <div v-if="currentChunk === 0" class="form-section">
            <h3 class="smalllable1">BODY - STEP 2.4 (Modesty Check)</h3>
            <label class="smalllable2">Are there any areas you would like to highlight in your outfits?</label>
            
            <!-- Custom Dropdown -->
            <div class="dropdown-container">
              <div class="dropdown-button" @click="toggleDropdown('modesty')">
                {{ modesty || 'Select an option' }}
              </div>
              <div v-if="showDropdowns.modesty" class="dropdown-list">
                <div @click="selectOption('modesty', 'no')" class="dropdown-option">No</div>
                <div @click="selectOption('modesty', 'neutral')" class="dropdown-option">Neutral</div>
                <div @click="selectOption('modesty', 'highlight')" class="dropdown-option">Highlight</div>
              </div>
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
                <span 
                  v-for="level in ['£', '££', '£££', '££££']" 
                  :key="level" 
                  :class="{'selected': budget[item.key] === level, 'unselected': budget[item.key] !== level}"
                  @click="selectBudget(item.key, level)">
                  {{ level }}
                </span>
              </div>
            </div>
          </div>
        </transition>
  
        <!-- Preferences Section -->
        <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
          <div v-if="currentChunk === 2" class="form-section">
            <h3 class="smalllable1 pt-[2vw]">PREFERENCES - STEP 4</h3>
            <label class="smalllable2">How do you like your clothes to fit?</label>
            
            <!-- Custom Dropdown -->
            <div class="dropdown-container">
              <div class="dropdown-button" @click="toggleDropdown('fit')">
                {{ fit || 'Select Fit' }}
              </div>
              <div v-if="showDropdowns.fit" class="dropdown-list">
                <div @click="selectOption('fit', 'fitted')" class="dropdown-option">Fitted</div>
                <div @click="selectOption('fit', 'true')" class="dropdown-option">True to Size</div>
                <div @click="selectOption('fit', 'oversized')" class="dropdown-option">Oversized</div>
              </div>
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
        currentChunk: 0,  // Track the current step
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
        showDropdowns: {
          modesty: false,
          fit: false,
        },
      };
    },
    methods: {
      nextStep() {
        if (this.currentChunk < 2) this.currentChunk++;
      },
      prevStep() {
        if (this.currentChunk > 0) this.currentChunk--;
      },
      toggleDropdown(dropdownKey) {
        this.showDropdowns[dropdownKey] = !this.showDropdowns[dropdownKey];
      },
      selectOption(dropdownKey, value) {
        this[dropdownKey] = value;
        this.showDropdowns[dropdownKey] = false;
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
  /* Add your existing styles or additional styles here */
  </style>
  