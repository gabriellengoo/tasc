<template>
  <div class="name">
    <h1 class="uppercase font-semibold">
      To create your personalized style profile, we’ll ask a few questions about your preferences, body shape, and style choices. Here's what to expect
    </h1>
    <div class="h-[100%] namecon text-xs">
      <p class="pt-[2vw] font-bold uppercase">Step 1: Basic Info</p>
      <p>Provide your name, email, and age range to help us customize your experience.</p>
      
      <p class="pt-[2vw] font-bold uppercase">Step 2: Avatar & Body Details</p>
      <p>Tell us about your hairstyle, skin tone, face shape, eye color, and body proportions. This helps us recommend styles that suit you best.</p>
      
      <p class="pt-[2vw] font-bold uppercase">Step 3: Fit Challenges</p>
      <p>Let us know if you have specific fit concerns like shoulder width, bust size, or leg length, so we can refine our recommendations.</p>
      
      <p class="pt-[2vw] font-bold uppercase">Step 4: Modesty Preferences</p>
      <p>Choose which areas you’d like to highlight or keep neutral in your outfits.</p>
      
      <p class="pt-[2vw] font-bold uppercase">Step 5: Budget</p>
      <p>Select your preferred price range for different clothing categories.</p>
      
      <p class="pt-[2vw] font-bold uppercase">Step 6: Style Preferences</p>
      <p>Tell us how you like your clothes to fit, your favorite colors, and your overall style preferences.</p>
    </div>
    <!-- <button class="smalllable2 font-semibold">Get Started</button> -->
  </div>
</template>

<script>
export default {
  methods: {
    nextStep() {
      this.$emit('next'); // Move to the next step
    }
  }
};
</script>

<style scoped>
.name{
  color: rgb(170, 170, 170);
}
/* Add your styles here */
</style>
