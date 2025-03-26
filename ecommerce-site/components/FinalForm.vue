<template>
    <div>
        <h2 class="headerform">Final Preferences</h2>

        <div class="formstyle">
            <!-- Budget Section -->
            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="currentChunk === 0" class="form-section">
                    <h3 class="smalllable1 pt-[2vw]">BUDGET - STEP 3</h3>

                    <!-- List of categories -->
                    <div class="category-list">
                        <div v-for="(item, index) in budgetItems" :key="item.key"
                            :class="['category-item', { selectedbud: selectedCategory === item.key }]"
                            @click="selectCategory(item.key)">
                            <label class="">{{ item.name }}</label>
                        </div>
                    </div>

                    <!-- Budget level selection for selected category -->
                    <div v-if="selectedCategory" class="budget-selection pt-[2vw]">
                        <h4>Select a Budget Level for {{ selectedCategoryName }}</h4>
                        <div class="budget-container">
                            <button class="btnsimgcol" v-for="level in ['£', '££', '£££', '££££']" :key="level" :class="{
                                'selected': selectedBudget[selectedCategory] === level,

                            }" @click="selectBudget('selectedBudget', level)">
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

            <!-- Favorite Colors -->
            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="currentChunk === 2" class="form-section">
                    <h3 class="smalllable1 pt-[2vw]">COLOR PREFERENCES</h3>

                    <label class="smalllable2">What are your <span class="smalllable2 font-semibold">favourite</span>
                        colours to wear? (Up to 4 colors)</label>

                    <!-- Color Picker -->
                    <input type="color" v-model="favoriteColor" @input="addColorFromPicker" class="color-picker" />

                    <!-- Suggested Color Options -->
                    <!-- <div class="color-suggestions">
            <span v-for="color in colorOptions" :key="color" 
                  :style="{ backgroundColor: color }" 
                  class="color-swatch"
                  @click="addColorFromSuggestion(color)">
            </span>
        </div> -->

                    <!-- Selected Colors -->
                    <div class="color-tags">
                        <span v-for="(color, index) in selectedColors" :key="index" :style="{ backgroundColor: color }"
                            class="color-tag">
                            {{ color }}
                            <span @click="removeColor(index)" class="remove-tag">✖</span>
                        </span>
                    </div>
                </div>
            </transition>

            <!-- Least Favorite Colors -->
            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="currentChunk === 3" class="form-section">
                    <h3 class="smalllable1 pt-[2vw]">COLOR PREFERENCES</h3>

                    <label class="smalllable2">What are your <span class="smalllable2 font-semibold">least
                            favourite</span> colours to wear? (Up to 4 colors)</label>

                    <!-- Color Picker -->
                    <input type="color" v-model="leastFavoriteColor" @input="addLeastColorFromPicker"
                        class="color-picker" />

                    <!-- Suggested Color Options -->
                    <!-- <div class="color-suggestions">
            <span v-for="color in colorOptions" :key="color" 
                  :style="{ backgroundColor: color }" 
                  class="color-swatch"
                  @click="addLeastColorFromSuggestion(color)">
            </span>
        </div> -->

                    <!-- Selected Colors -->
                    <div class="color-tags">
                        <span v-for="(color, index) in selectedLeastColors" :key="index"
                            :style="{ backgroundColor: color }" class="color-tag">
                            {{ color }}
                            <span @click="removeLeastColor(index)" class="remove-tag">✖</span>
                        </span>
                    </div>
                </div>
            </transition>



            <!-- Adventurous Style Section -->
            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="currentChunk === 4" class="form-section">
                    <h3 class="smalllable1 pt-[2vw]">STYLE PREFERENCES</h3>
                    <label class="smalllable2">How adventurous would you describe your style? ( 1 to 10 )</label>
                    <input v-model="adventurousLevel" type="range" min="1" max="10" step="1" class="slider" />
                    <span class="slider-value">{{ adventurousLevel }}</span>
                </div>
            </transition>


            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">

                <div v-if="currentChunk === 5" class="outfit-feedback">

                    <h3 class="smalllable1 pt-[2vw]">Please tell us how you feel about these looks?</h3>
                    <p class="smalllable2">This helps us better understand your style better. ( scroll )</p>

                    <div class="outfits">
                        <div v-for="(outfit, index) in outfits" :key="index" class="outfit-item">
                            <img :src="outfit.image" :alt="`Outfit ${index + 1}`" class="outfit-image" />
                            <div class="button-group">

                                <div class="flex text-black p-[.1vw] dresst flex-col w-[50%]">
                                    <p>Dress code:</p>
                                    <p>Smart casual</p>
                                </div>
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
                <div v-if="currentChunk === 6">
                    <!-- Favorite Brands Section -->
                    <h3 class="smalllable1 pt-[2vw]">BRAND PREFERENCES</h3>

                    <label class="smalllable2">Please tell us your <span
                            class="smalllable2 font-semibold">favourite</span> brands (Up to 10 brands)</label>
                    <div v-if="!showBrandInput" class="flex items-center">
                        <button @click="showBrandInput = true" class="plus-btn">+</button>
                    </div>
                    <div v-else class="flex items-center space-x-2">
                        <input v-model="brandInput" @input="onBrandInput" type="text" class="color-input"
                            placeholder="Start typing a brand..." />
                        <button @click="addBrand" class="plus-btn">+</button>
                    </div>

                    <!-- <ul v-if="filteredBrands.length > 0" class="suggestions">
                        <li v-for="brand in filteredBrands" :key="brand" @click="addBrandFromSuggestion(brand)">{{ brand
                            }}</li>
                    </ul> -->

                    <div class="color-tags">
                        <span v-for="(brand, index) in selectedBrands" :key="index" class="brand-tag">
                            {{ brand }} <button @click="removeBrand(index)">✕</button>
                        </span>
                    </div>


                </div>
            </transition>

            <transition name="slide" @before-enter="beforeEnter" @enter="enter" @leave="leave">
                <div v-if="currentChunk === 7">
                    <!-- Favorite Brands Section -->
                    <h3 class="smalllable1 pt-[2vw]">BRAND PREFERENCES</h3>



                    <label class="smalllable2">Are there any brands you <span class="smalllable2 font-semibold">do
                            not</span> like to wear? (Up to 10 brands)</label>
                    <div v-if="!showDislikeBrandInput" class="flex items-center">
                        <button @click="showDislikeBrandInput = true" class="plus-btn">+</button>
                    </div>
                    <div v-else class="flex items-center space-x-2">
                        <input v-model="dislikeBrandInput" @input="onDislikeBrandInput" type="text" class="color-input"
                            placeholder="Start typing a brand..." />
                        <button @click="addDislikeBrand" class="plus-btn">+</button>
                    </div>

                    <!-- <ul v-if="filteredDislikeBrands.length > 0" class="suggestions">
                        <li v-for="brand in filteredDislikeBrands" :key="brand"
                            @click="addDislikeBrandFromSuggestion(brand)">{{ brand }}</li>
                    </ul> -->

                    <div class="color-tags">
                        <span v-for="(brand, index) in selectedDislikeBrands" :key="index" class="brand-tag">
                            {{ brand }} <button @click="removeDislikeBrand(index)">✕</button>
                        </span>
                    </div>
                </div>
            </transition>


        </div>

        <!-- Navigation Buttons -->
        <div class="navbutform" v-if="currentChunk !== 7">
            <button class="nextbtn2" @click="nextStep">Skip?</button>

            <div class="nav-buttons">
                <button class="" @click="prevChunk" v-if="currentChunk > 0">↰</button>
                <button class="bg-[white] text-[black]" @click="handleNextClick">
                    {{ currentChunk === totalChunks - 7 ? "↳" : "↱" }}
                </button>
            </div>

        </div>

        <button class="headerformsub pt-[5vw]" v-if="currentChunk === 7" @click="submitFinalForm">Submit</button>
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



            filteredBrands: [],
            filteredDislikeBrands: [],
            allBrands: ['Nike', 'Adidas', 'Gucci', 'Louis Vuitton', 'Zara', 'H&M', 'Chanel'], // Replace with API data
            maxBrands: 10,

            brandInput: '',
            dislikeBrandInput: '',
            selectedBrands: [],
            selectedDislikeBrands: [],
            showBrandInput: false,
            showDislikeBrandInput: false,

            totalChunks: 7,
            filteredLeastColors: [],
            maxColors: 4,

            favoriteColor: "#ffffff", // Default color
            leastFavoriteColor: "#ffffff", // Default color
            selectedColors: [], // Stores favorite colors
            selectedLeastColors: [], // Stores least favorite colors
            colorOptions: ["#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#FFD700", "#8A2BE2", "#00CED1"], // Suggested colors

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
            // selectedCategory: {},
            // budget: {},
            selectedCategory: null,  // Store selected category key
            selectedBudget: {},
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

        addColorFromPicker() {
            if (this.selectedColors.length < 4 && !this.selectedColors.includes(this.favoriteColor)) {
                this.selectedColors.push(this.favoriteColor);
            }
        },
        addLeastColorFromPicker() {
            if (this.selectedLeastColors.length < 4 && !this.selectedLeastColors.includes(this.leastFavoriteColor)) {
                this.selectedLeastColors.push(this.leastFavoriteColor);
            }
        },
        addColorFromSuggestion(color) {
            if (this.selectedColors.length < 4 && !this.selectedColors.includes(color)) {
                this.selectedColors.push(color);
            }
        },
        addLeastColorFromSuggestion(color) {
            if (this.selectedLeastColors.length < 4 && !this.selectedLeastColors.includes(color)) {
                this.selectedLeastColors.push(color);
            }
        },
        removeColor(index) {
            this.selectedColors.splice(index, 1);
        },
        removeLeastColor(index) {
            this.selectedLeastColors.splice(index, 1);
        },

        // Select the category
        selectCategory(categoryKey) {
            this.selectedCategory = categoryKey;
        },

        // Select the budget for the currently selected category
        selectBudget(level) {
            this.$set(this.selectedBudget, this.selectedCategory, level);  // Set the selected budget for the category
        },


        // Filter brand suggestions
        onBrandInput() {
            this.filteredBrands = this.allBrands.filter(brand =>
                brand.toLowerCase().includes(this.brandInput.toLowerCase())
            );
        },
        addBrand() {
            if (this.brandInput && this.selectedBrands.length < 10) {
                this.selectedBrands.push(this.brandInput);
                this.brandInput = '';
                this.filteredBrands = [];
            }
        },
        addBrandFromSuggestion(brand) {
            if (this.selectedBrands.length < 10) {
                this.selectedBrands.push(brand);
            }
        },


        onDislikeBrandInput() {
            this.filteredDislikeBrands = this.allBrands.filter(brand =>
                brand.toLowerCase().includes(this.dislikeBrandInput.toLowerCase())
            );
        },

        addDislikeBrandFromSuggestion(brand) {
            if (this.selectedDislikeBrands.length < 10) {
                this.selectedDislikeBrands.push(brand);
            }
        },

        addBrand() {
            if (this.brandInput.trim() && this.selectedBrands.length < 10) {
                this.selectedBrands.push(this.brandInput.trim());
                this.brandInput = '';
                this.showBrandInput = false;
            }
        },
        addDislikeBrand() {
            if (this.dislikeBrandInput.trim() && this.selectedDislikeBrands.length < 10) {
                this.selectedDislikeBrands.push(this.dislikeBrandInput.trim());
                this.dislikeBrandInput = '';
                this.showDislikeBrandInput = false;
            }
        },
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
            if (this.currentChunk < 7) this.currentChunk++;
        },
        prevStep() {
            if (this.currentChunk > 0) this.currentChunk--;
        },
        nextChunk() {
            if (this.currentChunk < 7) {
                this.currentChunk++;
            }
        },
        selectAge(age) {
            this.formData.age = age;
        },
        handleNextClick() {
            if (this.currentChunk === this.totalChunks - 1) {
                this.submitForm();
            } else {
                this.nextChunk();
            }
        },
        nextChunk() {
            if (this.currentChunk < this.totalChunks - 1) {
                this.currentChunk++;
            }
        },
        prevChunk() {
            if (this.currentChunk > 0) {
                this.currentChunk--;
            }
        },
        submitForm() {
            console.log("Form submitted:", this.formData);
            // this.$emit("submit", this.formData);
            this.$emit('next', this.formData);
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
    },
    computed: {
        // Get the name of the selected category to display in the budget section
        selectedCategoryName() {
            const selectedCategory = this.budgetItems.find(item => item.key === this.selectedCategory);
            return selectedCategory ? selectedCategory.name : '';
        }
    },
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
    border-radius: 1px;
    background-color: rgba(149, 149, 149, 0.1);
    box-shadow: #222e3a 0px 0px 0px 1px inset;
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
    /* padding: 0vw 1vw; */
    justify-content: space-evenly;
    flex-direction: column;
    width: 20vw;
}

.dresst{
    line-height: normal;
    color: black;
    padding: 1vw 1.5vw;
    line-height: normal;
}

.outfit-image {
    height: 30vw;
    padding: 2vw;
    /* border-bottom: solid black 1px; */
    -o-object-fit: cover;
    object-fit: contain;
    border-radius: 0;
}

.button-group {
    width: 100%;
    display: flex;
    background: white;
    border: black solid 1px;
    /* border-top: 0; */
    /* border-bottom: 0;  */
    justify-content: space-evenly;
}

.buttons {
    margin-top: 10px;
}

.thumb-button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 5px;
    border-left: black solid 1px;
    border-bottom: 0;
    border-top: 0;
}

.thumb-button svg {
    /* width: 12%; */
    height: 29px;
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
    /* background: #ddd; */
    color: white;
    color: #4a5764;
    /* padding: 0.5vw; */
    /* margin-right: 0.5vw; */
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
    /* padding-right: 3vw; */
}

.budget-container button.selected {
    color: rgb(39, 149, 11);
    background-color: rgba(0, 0, 0, 0) !important;
    opacity: .3;
    /* font-weight: p class=" font-semibold"; */
}

.budget-container button:hover {
    color: black;
    background-color: rgba(0, 0, 0, 0) !important;
    opacity: .3;
    /* font-weight: p class=" font-semibold"; */
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