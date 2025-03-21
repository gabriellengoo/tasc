<template>
    <div>
        <h2 class="headerform">Final Preferences</h2>

        <div class="formstyle">
            <!-- Budget Section -->
            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="currentChunk === 0" class="form-section">
                    <h3 class="smalllable1 pt-[2vw]">BUDGET - STEP 3</h3>
                    <div v-for="item in budgetItems" :key="item.key">
                        <label class="smalllable2">{{ item.name }}</label>
                        <div class="budget-container">
                            <button class="" v-for="level in ['💸', '💸💸', '💸💸💸', '💸💸💸💸']" :key="level"
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
                <div v-if="currentChunk === 1" class="form-section">
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

            <!-- Color Preferences Section -->
            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="currentChunk === 2" class="form-section">
                    <h3 class="smalllable1 pt-[2vw]">COLOR PREFERENCES</h3>

                    <label class="smalllable2">What are your favourite colours to wear? (Up to 4 colors)</label>
                    <input v-model="colorInput" @input="onInput" @keydown.enter="addColor" type="text"
                        class="color-input" placeholder="Start typing a color..." />
                    <ul v-if="filteredColors.length > 0" class="suggestions">
                        <li v-for="color in filteredColors" :key="color" @click="addColorFromSuggestion(color)">{{ color
                            }}</li>
                    </ul>
                    <div class="color-tags">
                        <span v-for="(color, index) in selectedColors" :key="index" class="color-tag">{{ color }}</span>
                    </div>

                    <label class="smalllable2">What are your least favourite colours to wear? (Up to 4 colors)</label>
                    <input v-model="leastColorInput" @input="onLeastInput" @keydown.enter="addLeastColor" type="text"
                        class="color-input" placeholder="Start typing a color..." />
                    <ul v-if="filteredLeastColors.length > 0" class="suggestions">
                        <li v-for="color in filteredLeastColors" :key="color"
                            @click="addLeastColorFromSuggestion(color)">{{ color }}</li>
                    </ul>
                    <div class="color-tags">
                        <span v-for="(color, index) in selectedLeastColors" :key="index" class="color-tag">{{ color
                            }}</span>
                    </div>
                </div>
            </transition>

            <!-- Adventurous Style Section -->
            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="currentChunk === 3" class="form-section">
                    <h3 class="smalllable1 pt-[2vw]">STYLE PREFERENCES</h3>
                    <label class="smalllable2">How adventurous would you describe your style? ( 1 to 10 )</label>
                    <input v-model="adventurousLevel" type="range" min="1" max="10" step="1" class="slider" />
                    <span class="slider-value">{{ adventurousLevel }}</span>
                </div>
            </transition>


            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">

                <div v-if="currentChunk === 4" class="outfit-feedback">

                    <h3 class="smalllable1 pt-[2vw]">Please tell us how you feel about these looks?</h3>
                    <p class="smalllable2">This helps us better understand your style better. ( scroll )</p>

                    <div class="outfits">
                        <div v-for="(outfit, index) in outfits" :key="index" class="outfit-item">
                            <img :src="outfit.image" :alt="`Outfit ${index + 1}`" class="outfit-image" />
                            <div class="button-group">
                                <!-- Thumbs Up Button -->
                                <button @click="setPreference(index, 'like')" class="thumb-button">
                                    <svg :class="{ selectedlike: outfit.preference === 'like' }" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                        </g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M8 14V20M8 20L4 20V9.99998H8L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20M8 20H12"
                                                stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </g>
                                    </svg>
                                </button>

                                <!-- Thumbs Down Button -->
                                <button @click="setPreference(index, 'dislike')" class="thumb-button">
                                    <svg :class="{ selecteddisl: outfit.preference === 'dislike' }" viewBox="0 0 24 24"
                                        fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                        <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round">
                                        </g>
                                        <g id="SVGRepo_iconCarrier">
                                            <path
                                                d="M8 10V4M8 4L4 4.00002V14H8L13.1956 20.0615C13.6886 20.6367 14.4642 20.884 15.1992 20.7002L15.2467 20.6883C16.5885 20.3529 17.1929 18.7894 16.4258 17.6387L14 14H18.5604C19.8225 14 20.7691 12.8454 20.5216 11.6078L19.3216 5.60779C19.1346 4.67294 18.3138 4.00002 17.3604 4.00002M8 4H12"
                                                stroke="#000000" stroke-width="1.5" stroke-linecap="round"
                                                stroke-linejoin="round"></path>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        </div>

                    </div>

                </div>
            </transition>

            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="currentChunk === 5">
                    <!-- Favorite Brands Section -->
                    <h3 class="smalllable1 pt-[2vw]">BRAND PREFERENCES</h3>

                    <label class="smalllable2">Please tell us your favorite brands (Up to 10 brands)</label>
                    <input v-model="brandInput" @input="onBrandInput" @keydown.enter="addBrand" type="text"
                        class="color-input" placeholder="Start typing a brand..." />
                    <ul v-if="filteredBrands.length > 0" class="suggestions">
                        <li v-for="brand in filteredBrands" :key="brand" @click="addBrandFromSuggestion(brand)">{{ brand
                        }}</li>
                    </ul>
                    <div class="color-tags">
                        <span v-for="(brand, index) in selectedBrands" :key="index" class="brand-tag">
                            {{ brand }} <button @click="removeBrand(index)">✕</button>
                        </span>
                    </div>

                    <label class="smalllable2">Are there any brands you do not like to wear? (Up to 10 brands)</label>
                    <input v-model="dislikeBrandInput" @input="onDislikeBrandInput" @keydown.enter="addDislikeBrand"
                        type="text" class="color-input" placeholder="Start typing a brand..." />
                    <ul v-if="filteredDislikeBrands.length > 0" class="suggestions">
                        <li v-for="brand in filteredDislikeBrands" :key="brand"
                            @click="addDislikeBrandFromSuggestion(brand)">{{ brand }}</li>
                    </ul>
                    <div class="color-tags">
                        <span v-for="(brand, index) in selectedDislikeBrands" :key="index" class="brand-tag">
                            {{ brand }} <button @click="removeDislikeBrand(index)">✕</button>
                        </span>
                    </div>

                </div>
            </transition>
        </div>

        <!-- Navigation Buttons -->
        <div class="navbutform" v-if="currentChunk !== 5">
            <button class="nextbtn" v-if="currentChunk > 0" @click="prevStep"><svg viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path
                d="M13 8L9 12M9 12L13 16M9 12H21M19.4845 7C17.8699 4.58803 15.1204 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C15.1204 21 17.8699 19.412 19.4845 17"
                stroke="#000000" stroke-width="0.8879999999999999" stroke-linecap="round"
                stroke-linejoin="round"></path>
            </g>
          </svg></button>
            <button class="nextbtn" v-if="currentChunk < 5" @click="nextStep"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 16L15 12M15 12L11 8M15 12H3M4.51555 17C6.13007 19.412 8.87958 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C8.87958 3 6.13007 4.58803 4.51555 7" stroke="#000000"
          stroke-width="0.8879999999999999" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg></button>
        </div>

        <button class="headerformsub pt-[5vw]" v-if="currentChunk === 5" @click="submitFinalForm">Submit</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            currentChunk: 0,
            colorInput: "",
            leastColorInput: "",
            selectedColors: [],
            selectedLeastColors: [],
            allColors: ['red', 'blue', 'green', 'yellow', 'orange', 'pink', 'purple', 'brown', 'black', 'white', 'gray'],
            filteredColors: [],
            brandInput: "",
            dislikeBrandInput: "",
            selectedBrands: [],
            selectedDislikeBrands: [],
            allBrands: ['Nike', 'Adidas', 'Gucci', 'Zara', 'H&M', 'Balenciaga', 'Louis Vuitton', 'Puma', 'Reebok', 'Uniqlo'],
            filteredBrands: [],
            filteredDislikeBrands: [],
            maxBrands: 10,
            filteredLeastColors: [],
            maxColors: 4,
            adventurousLevel: 5,
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
            outfits: [
                { image: 'https://cdn.meideinthe.cloud/entirestudios.com/content/player/227-tricky-wearswares-pant-seal/entire-studios-wares-pant-seal-tricky-01-2.webp' },
                { image: 'https://cdn.meideinthe.cloud/entirestudios.com/content/player/227-tricky-wearswares-pant-seal/entire-studios-wares-pant-seal-tricky-01-2.webp' },
                { image: 'https://cdn.meideinthe.cloud/entirestudios.com/content/player/227-tricky-wearswares-pant-seal/entire-studios-wares-pant-seal-tricky-01-2.webp' },
                { image: 'https://cdn.meideinthe.cloud/entirestudios.com/content/player/227-tricky-wearswares-pant-seal/entire-studios-wares-pant-seal-tricky-01-2.webp' },
                { image: 'https://cdn.meideinthe.cloud/entirestudios.com/content/player/227-tricky-wearswares-pant-seal/entire-studios-wares-pant-seal-tricky-01-2.webp' },
                { image: 'https://cdn.meideinthe.cloud/entirestudios.com/content/player/227-tricky-wearswares-pant-seal/entire-studios-wares-pant-seal-tricky-01-2.webp' },
                { image: 'https://cdn.meideinthe.cloud/entirestudios.com/content/player/227-tricky-wearswares-pant-seal/entire-studios-wares-pant-seal-tricky-01-2.webp' },
                { image: 'https://cdn.meideinthe.cloud/entirestudios.com/content/player/227-tricky-wearswares-pant-seal/entire-studios-wares-pant-seal-tricky-01-2.webp' },
                { image: 'https://cdn.meideinthe.cloud/entirestudios.com/content/player/227-tricky-wearswares-pant-seal/entire-studios-wares-pant-seal-tricky-01-2.webp' }
            ],
            feedback: Array(9).fill(null)

        };
    },
    methods: {
        // Filter brand suggestions
        onBrandInput() {
            this.filteredBrands = this.allBrands.filter(brand =>
                brand.toLowerCase().includes(this.brandInput.toLowerCase()) &&
                !this.selectedBrands.includes(brand)
            );
        },
        onDislikeBrandInput() {
            this.filteredDislikeBrands = this.allBrands.filter(brand =>
                brand.toLowerCase().includes(this.dislikeBrandInput.toLowerCase()) &&
                !this.selectedDislikeBrands.includes(brand)
            );
        },

        // Add brand from input
        addBrand() {
            if (this.brandInput && this.selectedBrands.length < this.maxBrands && !this.selectedBrands.includes(this.brandInput)) {
                this.selectedBrands.push(this.brandInput);
            }
            this.brandInput = "";
            this.filteredBrands = [];
        },
        addDislikeBrand() {
            if (this.dislikeBrandInput && this.selectedDislikeBrands.length < this.maxBrands && !this.selectedDislikeBrands.includes(this.dislikeBrandInput)) {
                this.selectedDislikeBrands.push(this.dislikeBrandInput);
            }
            this.dislikeBrandInput = "";
            this.filteredDislikeBrands = [];
        },

        // Add brand from suggestions
        addBrandFromSuggestion(brand) {
            if (this.selectedBrands.length < this.maxBrands) {
                this.selectedBrands.push(brand);
            }
            this.brandInput = "";
            this.filteredBrands = [];
        },
        addDislikeBrandFromSuggestion(brand) {
            if (this.selectedDislikeBrands.length < this.maxBrands) {
                this.selectedDislikeBrands.push(brand);
            }
            this.dislikeBrandInput = "";
            this.filteredDislikeBrands = [];
        },

        // Remove brand
        removeBrand(index) {
            this.selectedBrands.splice(index, 1);
        },
        removeDislikeBrand(index) {
            this.selectedDislikeBrands.splice(index, 1);
        },
        setFeedback(index, value) {
            this.feedback[index] = value;
        },
        skipAll() {
            this.feedback = Array(9).fill(null); // Reset feedback
        },
        nextStep() {
            if (this.currentChunk < 5) this.currentChunk++;
        },
        prevStep() {
            if (this.currentChunk > 0) this.currentChunk--;
        },
        setPreference(index, preference) {
            this.$set(this.outfits, index, { ...this.outfits[index], preference });
        },
        skipPreferences() {
            this.outfits.forEach((outfit, index) => {
                this.$set(this.outfits, index, { ...outfit, preference: 'neutral' });
            });
        },
        submitFinalForm() {
            console.log('Submitting Final Form:', this.$data);
        },
        onInput() {
            this.filteredColors = this.allColors.filter(color => color.includes(this.colorInput.trim().toLowerCase()));
        },
        onLeastInput() {
            this.filteredLeastColors = this.allColors.filter(color => color.includes(this.leastColorInput.trim().toLowerCase()));
        },
        addColor() {
            if (this.colorInput && this.selectedColors.length < this.maxColors && !this.selectedColors.includes(this.colorInput)) {
                this.selectedColors.push(this.colorInput);
                this.colorInput = "";
                this.filteredColors = [];
            }
        },
        addColorFromSuggestion(color) {
            if (this.selectedColors.length < this.maxColors && !this.selectedColors.includes(color)) {
                this.selectedColors.push(color);
                this.colorInput = "";
                this.filteredColors = [];
            }
        },
        addLeastColor() {
            if (this.leastColorInput && this.selectedLeastColors.length < this.maxColors && !this.selectedLeastColors.includes(this.leastColorInput)) {
                this.selectedLeastColors.push(this.leastColorInput);
                this.leastColorInput = "";
                this.filteredLeastColors = [];
            }
        },
        addLeastColorFromSuggestion(color) {
            if (this.selectedLeastColors.length < this.maxColors && !this.selectedLeastColors.includes(color)) {
                this.selectedLeastColors.push(color);
                this.leastColorInput = "";
                this.filteredLeastColors = [];
            }
        },
        selectOption(category, value) {
            this[category] = value;
        },
        selectBudget(category, level) {
            this.budget[category] = level;
        },
    }
};
</script>

<style scoped>
.outfit-feedback {
    /* text-align: center; */
}

.outfits {
    height: 35vh;
    width: 50vw;
    width: 100%;
    overflow: scroll;
    display: flex;
    padding-top: 0;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    justify-content: center;
    margin-top: 20px;
    flex-wrap: wrap;
}

.outfit-item {
    position: relative;
    display: flex;
    align-items: center;
    border-radius: 5px;
    background-color: rgba(149, 149, 149, 0.1);
    box-shadow: #bbbbbb 0px 0px 0px 1px inset;
    color: #c3c3c3;
    max-width: 100%;
    outline: 0px;
    transition-duration: 0.1s;
    transition-property: background-color, color, border-color, opacity, box-shadow;
    transition-timing-function: ease-out;
    width: max-content;
    word-break: break-word;
    cursor: pointer;
    opacity: 1;
    margin: 1vw 0vw;
    padding: 0vw 1vw;
    justify-content: space-evenly;
}

.outfit-image {
    height: 17vw;
    padding: 2vw;
    -o-object-fit: cover;
    object-fit: contain;
    border-radius: 10px;

}

.buttons {
    margin-top: 10px;
}

.thumb-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
}

.thumb-button svg {
    width: 32px;
    height: 32px;
    transition: fill 0.3s ease, stroke 0.3s ease;
    stroke: #999;
    /* Default stroke color */
}

.thumb-button svg:hover {
    stroke: black;
    /* Darker stroke on hover */
}

.thumb-button svg.selected {
    fill: black;
    /* Fill when selected */
    stroke: black;
}


.skip {
    margin-top: 20px;
    background-color: transparent;
    color: gray;
    text-decoration: underline;
    cursor: pointer;
}

.color-input {
    width: 100%;
    padding: 0.5vw;
    margin-top: 1vw;
}

.suggestions {
    background: white;
    border: 1px solid #ddd;
    position: absolute;
}

.color-tags span {
    background: #ddd;
    padding: 0.5vw;
    margin-right: 0.5vw;
}

.slider {
    width: 100%;
    margin-top: 1vw;
}

.slider-value {
    font-size: 1.5vw;
    display: block;
    text-align: center;
    margin-top: 1vw;
}

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


/* .slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s ease;
}

.slide-enter,
.slide-leave-to {
    transform: translateY(-100%);
} */

.nextbtn {
    margin-top: 20px;
}



/* Styling for the color input and suggestions */
.color-input {
    padding: 8px;
    font-size: 1rem;
    margin: 10px 0;
    width: 100%;
    background: #f2f2f200;
    border-bottom: black solid 1px;
}

.suggestions {
    border: 1px solid #ddd;
    border: solid #c3c3c3 .1vw;
    margin-top: 1vw;
    padding: .5vw;
    background-color: #f2f2f2;
    position: relative;
    max-height: 4vw;
    width: 100%;
    overflow-y: auto;

}

.suggestions ul {
    list-style-type: none;
    padding: 0;
}

.suggestions li {
    padding: 8px;
    cursor: pointer;
}

.suggestions li:hover {
    background-color: #ddd;
}

.color-tags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
}

.color-tag {
    background-color: #eee;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 4px;
    font-size: 0.9rem;
}
</style>