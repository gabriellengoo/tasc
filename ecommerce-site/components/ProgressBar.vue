<template>
    <div class="progress-bar-container">
      <p class="logo pr-[2vw]" >Tasc</p>
     <div class="w-[100%]">
      <div class="progress-bar">
        <span :style="{ width: progressPercentage + '%' }"></span>
      </div>
      <div class="progress-text">
        Step {{ currentStep }} of 5
      </div>
     </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      currentStep: {
        type: Number,
        required: true
      }
    },
    computed: {
      progressPercentage() {
        return (this.currentStep / 5) * 100; // Calculate the percentage based on the current step
      }
    }
  };
  </script>
  
  <style scoped>
  .progress-bar-container {
    width: 100vw;
    /* margin-top: 20px; */
    text-align: center;
    position: absolute;
    top: 0;
    display: flex;
    left: 0;
    border-top: black solid 1px;
    border-bottom: black solid 1px;
    background-color: #f9f9f2;
    /* margin: 1vw 2vw; */
    padding: 1vw 2vw;
    padding: 0vw 2vw;
    /* margin-top: 6vw; */
    flex-direction: row;
    align-items:baseline;
  }
  
  .progress-bar {
    width: 100%;
    height: 0.4vw;
    background-color: #ececec;
    margin: 5px 0;
    z-index: 1;
    /* border-radius: 5px; */
  }
  
  .progress-bar span {
    display: block;
    height: 100%;
    background: black;
    /* border-radius: 5px; */
    transition: width 0.3s ease;
  }
  
  .progress-text {
    font-size: .8vw;
   /* padding-top: 3vw; */
   color: #222222;
   text-transform: uppercase;
    text-align: left;
  }

  @media only screen and (max-width: 768px) {
    .progress-bar-container
     {
    width: 100vw;
    /* margin-top: 20px; */
    text-align: center;
    position: absolute;
    top: 6vw;
    left: 0;
    border-top: black solid 1px;
    border-bottom: black solid 1px;
    background-color: #f9f9f2;
    /* margin: 1vw 2vw; */
    padding: 3vw 2vw;
    margin-top: 6vw;
}
.progress-text {
    font-size: 1.8vw;
    /* padding-top: 3vw; */
    color: #222222;
    text-transform: uppercase;
    text-align: left;
}
  }
  </style>
  