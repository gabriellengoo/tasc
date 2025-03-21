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
                        <button v-for="option in ['No', 'Neutral', 'Highlight']" :key="option" class="btns"
                            :class="{ selected: modesty === option }" @click="selectOption('modesty', option)">
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
                            <button v-for="level in ['💸', '💸💸', '💸💸💸', '💸💸💸💸']" :key="level"
                                :class="{ 'selected': budget[item.key] === level, 'unselected': budget[item.key] !== level }"
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
                        <button v-for="option in ['Fitted', 'True to Size', 'Oversized']" :key="option" class="btns"
                            :class="{ selected: fit === option }" @click="selectOption('fit', option)">
                            {{ option }}
                        </button>
                    </div>
                </div>
            </transition>
        </div>

        <!-- Navigation Buttons -->
        <div class="navbutform" v-if="currentChunk !== 2">
            <button class="nextbtn" v-if="currentChunk > 0" @click="prevStep"><svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                    <g id="SVGRepo_iconCarrier">
                        <path
                            d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17"
                            stroke="#000000" stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                </svg></button>
            <button class="nextbtn" v-if="currentChunk < 2" @click="nextStep"> <svg viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7"
                        stroke="#000000" stroke-width="0.8879999999999999" stroke-linecap="round"
                        stroke-linejoin="round">
                    </path>
                </svg>
            </button>
        </div>

        <button class="headerformsub pt-[5vw]" v-if="currentChunk === 2" @click="submitFinalForm">Submit</button>


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

.budget-container button {
    cursor: pointer;
    font-size: 2vw;
    color: rgb(199, 199, 199);
    transition: color 0.3s;
    padding-right: 3vw;
}

.budget-container button.selected {
    color: rgb(39, 149, 11);
    background-color: rgba(0, 0, 0, 0) !important;
    opacity: .3;
    /* font-weight: bold; */
}

.budget-container button:hover {
    color: black;
    background-color: rgba(0, 0, 0, 0) !important;
    opacity: .3;
    /* font-weight: bold; */
}


.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateX(100%);
}

.nextbtn {
    margin-top: 20px;
}
</style>