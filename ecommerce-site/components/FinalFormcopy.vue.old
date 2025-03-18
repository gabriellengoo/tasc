<template>
    <div>
        <h2 class="headerform">Final Preferences</h2>
        <div class="formstyle">
            <div class="form-section">
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

            <div class="form-section">
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

            <div class="form-section">
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

            <!-- Add the rest of your form fields here -->

        </div>
        <button class="headerform" @click="submitFinalForm">Submit</button>

    </div>
</template>


<script>
export default {
    data() {
        return {
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
            favColors: "",
            leastFavColors: "",
            adventureLevel: 5,
            favBrands: "",
            dislikedBrands: "",
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
                { img: "/images/outfit1.jpg", rating: null },
                { img: "/images/outfit2.jpg", rating: null },
                { img: "/images/outfit3.jpg", rating: null },
                { img: "/images/outfit4.jpg", rating: null },
                { img: "/images/outfit5.jpg", rating: null },
                { img: "/images/outfit6.jpg", rating: null },
                { img: "/images/outfit7.jpg", rating: null },
                { img: "/images/outfit8.jpg", rating: null },
                { img: "/images/outfit9.jpg", rating: null },
            ],
            showDropdowns: {
                modesty: false,
                fit: false,
                // add keys for other dropdowns as necessary
            },
        };
    },
    methods: {
        rateOutfit(index, rating) {
            this.outfits[index].rating = rating;
        },
        toggleDropdown(dropdownKey) {
            // Toggle the visibility of the dropdown list
            this.showDropdowns[dropdownKey] = !this.showDropdowns[dropdownKey];
        },
        selectOption(dropdownKey, value) {
            // Update the selected value and close the dropdown
            this[dropdownKey] = value;
            this.showDropdowns[dropdownKey] = false;
        },
        submitFinalForm() {
            console.log('Submitting Final Form:', this.$data);
            this.$emit('close');
        },
        selectBudget(category, level) {
            this.budget[category] = level;
        },
    
    },
};
</script>

<style scoped>
.dropdown-button {
    width: 100%;
    padding: .4vw;

    margin: 1vw 0;
    /* margin-bottom: 4vw; */
    /* border-radius: 5px; */
    border: 1px solid #000000;
    font-size: 1vw;
    background-color: #f9f9f2;
    background-color: #dbdbdb;
    /* color: white; */
    text-transform: uppercase;
    /* background-color: #f9f9f9; */
    cursor: pointer;
    transition: border-color 0.3s, background-color 0.3s;
}

.dropdown:hover {
    border-color: #000000;
    /* background-color: #e6f0ff; */
}

.dropdown:focus {
    outline: none;
    border-color: #6a6a6a;
 
    /* background-color: #e6f0ff; */
}

.dropdown-container {
    position: relative;
    width: 100%;
    margin-bottom: 1vw;
}



.dropdown-button:hover {
    border-color: #000000;
}

.dropdown-list {
    position: absolute;
        position: relative;
    top: 100%;
    left: 0;
    right: 0;
    /* background-color: #fff; */
    /* border-color: #000000; */
    border: 1px solid #000000;
    /* border-radius: 5px; */
    margin-bottom: 4vw;
    z-index: 10;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
}

.dropdown-option {
    padding: 0.5vw;
    cursor: pointer;
    text-align: left;
    /* margin-bottom: 1vw; */
    /* border: 1px solid #000000; */
}

.dropdown-option:hover {
    background-color: #dbdbdb;
    /* border: 1px solid #000000; */
}


.outfit-container img {
    width: 80px;
    height: 80px;
    margin: 5px;
}

.close-btn {
    background: transparent;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
}


.budget-container {
    display: flex;
    justify-content: center;
    gap: 1vw;
    margin-bottom: 3vw;
}

.budget-container span {
    cursor: pointer;
    font-size: 3vw;
    color: rgb(199, 199, 199);
    transition: color 0.3s;
}

.budget-container span.selected {
    color: rgb(39, 149, 11);
    background-color: rgba(0, 0, 0, 0) !important;
    /* font-weight: bold; */
}

.budget-container span:hover {
    color: black;
    background-color: rgba(0, 0, 0, 0) !important;
    /* font-weight: bold; */
}
</style>