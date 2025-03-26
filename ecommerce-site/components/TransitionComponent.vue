<template>
  <div>
    <transition name="screen-transition" mode="out-in">
      <div v-if="isTransitionActive" class="black-screen">
        <div class="flex h-screen w-screen justify-center align-middle items-center mx-auto">
          <p class="logo2 pr-[2vw]" >onboarding</p>
        </div>
      </div>
    </transition>

  
  </div>
</template>

<script>
export default {
  head() {
    return {
      link: [
        {
          rel: 'preload',
          href: '/static/background.jpg',
          as: 'image'
        }
      ]
    };
  },
  data() {
    return {
      // isTransitionActive: true,
      // isTextVisible: true,
      isTransitionActive: false,
      isTextVisible: false
    };
  },
  methods: {
    toggleTransition() {
      this.isTransitionActive = true;

    
      // Set a timeout to hide the text and end the transition after 3.5 seconds
      setTimeout(() => {
        this.isTextVisible = false;
        this.isTransitionActive = false;
      }, 3000); // Adjust the duration of text visibility as needed
    }
  },

  created() {
    // Call toggleTransition when the component is created to start the transition
    this.toggleTransition();
  }
};
</script>

<style scoped>


.logo2 {
   /* font-family: 'Algerian', sans-serif; */
   text-transform: uppercase;
   font-size: 3vw;
   top: .6vh;
   position: relative;
}

.text-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  color: #1d1d1b;
  z-index: 100003;
  transition: opacity 1s ease;
  pointer-events: none;
}

.text-content.active {
  visibility: visible;
  opacity: 1;
}

.black-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000; /* You can change this to your preferred background color */
  z-index: 1000000002;
  z-index: 102 !important;
  
}

.white-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;
  opacity: 0;
  transition: opacity 3.5s ease
}

.titleText {
  opacity: 0;
  transition: opacity 1s ease;
}

.titleText.active {
  opacity: 1;
}

.text-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  /* visibility: hidden; */
  color: #1d1d1b;
  z-index: 100003;
  transition: opacity 1s ease; /* Add transition for opacity */
pointer-events: none;
}

.text-content.active {
  visibility: visible;
  opacity: 1;
  transform: translate(-50%, -50%);
}

/* Styles for the black screen transition */
.black-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transition: opacity 1.5s ease; /* Adjust the duration to match the transition */
  background-color: #f9f9f1; 
  /* background-color: #ffffff4d !important; */
   /* backdrop-filter: blur(10px); */
   /* -webkit-backdrop-filter: blur(10px); */
  z-index: 1000000002;
  z-index: 102 !important;
  pointer-events: none;
  /* z-index: 46 !important; */

}

.white-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #fff;

  /* background-image: url("./static/background.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat; */
  opacity: 0;
  transition: opacity 3.5s ease; /* Adjust the duration to match the transition */
  z-index: 1000000001;
  z-index: 102 !important;
}

.white-screen.active {
  opacity: 1;
}

/* Transition animation */
.screen-transition-enter-active,
.screen-transition-leave-active {
  transition: opacity .5s ease; /* Adjust the duration to match the transition */
}

.screen-transition-enter {
  /* transition-delay: 2s; */
  opacity: 0;
}

.screen-transition-leave-to {
  opacity: 0;
}

.screen-transition-leave-to {
  /* transition-delay: 2s; */
}

/* Keyframe animation for the word "Casting" */
@keyframes slideInFromRight {
  0% {
    /* margin-right: 0px;  */
    transform: translateX(-20px);
    opacity: 0;
    /* opacity: 1; */
  }
  /* 25% {
    transform: translateX(-15px);
    opacity: 0;
  } */
  50% {
    transform: translateX(-10px);
    opacity: .2;
  }
  100% {
    /* margin-right: 200px;  */
    transform: translateX(0px);
    opacity: 1;
  }
}

.transition-word {
  transition-delay: .5s;
  animation: slideInFromRight 4s ease;
  display: inline-block;
  transform: translateX(0px);
  /* margin-right: 200px;  */
}

.transition-wordr {
  /* transition-delay: .2s; */
  animation: slideInFromRightr .5s ease;
  display: inline-block;
  /* transform: translateX(5px); */
  /* margin-right: 200px;  */
  transform: translateX(0px);
}

/* Keyframe animation for the word "rose" */
@keyframes slideInFromRightr {
  0% {
    /* margin-right: 0px;  */
    transform: translateX(-12px);
    opacity: 1;
  }
  100% {
    /* margin-right: 20px;  */
    transform: translateX(0px);
    opacity: 1;
  }
}
</style>