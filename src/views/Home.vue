<script setup>
  import {ref, onMounted, onUnmounted} from 'vue';

  const hasScrolled = ref(false);

  const handleWheel = (event) => {
    if (event.deltaY > 0) {
      hasScrolled.value = true;
    }else if (event.deltaY < 0) {
      hasScrolled.value = false;
    }
  };

  onMounted(() => {
    window.addEventListener('wheel', handleWheel);
  });

  onUnmounted(() => {
    window.removeEventListener('wheel', handleWheel);
  });
</script>

<template>

  <div class="home-hero" :class="{ 'scrolled': hasScrolled }">

    <div class="decor-star top-left"></div>
    <div class="decor-star top-right"></div>
    <div class="decor-star bottom-left"></div>
    <div class="decor-star bottom-right"></div>

    <header class="hero-content">
      <h1 class="main-title">The Way of Witches</h1>
      <h2 class="main-subtitle">What if you could have a chat with yourself?</h2>

      <div class="scroll-indicator">
        <img src="@/assets/img/scroll-indicator.svg" alt="Scroll Indicator" />
      </div>
    </header>

    <main class="explanation-content">
      <h2 class="explanation-title">The Way of Witches</h2>
      <p class="intro-text">Tarot isn’t about predicting the future, it’s about understanding yourself.</p>

      <p class="description">The Way of Witches is an interactive learning space designed to help you read tarot intuitively. Instead of scrolling through endless text, you learn by doing.</p>

      <div class="tutorial">
        <p><strong class="accent-color">Tap and Flip :</strong> Click any card to read its upright meaning. Click it again to see its reversed side.</p>
        <p><strong class="accent-color">Fuse the Cards :</strong> Want to know what happens when The Fool meets the Three of Swords? Drag one card onto the other to fuse them and unlock their combined meaning.</p>
        <p><strong class="accent-color">Test yourself :</strong> Click on characters throughout the interface to test your skills. Drag the correct cards into place to complete the exercise.</p>
      </div>

      <router-link to="/Sandbox" class="btn-start">
        Start to learn
      </router-link>

    </main>

    <footer class="credits">
      © All rights reserved — Alyssa Beaufils
    </footer>

  </div>

</template>

<style lang="scss">
  @import '../assets/styles/variables.scss';
  body {
    margin: 0;
    padding: 0;
  }

  .home-hero{
    position: relative;
    width : 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #16011b98;
    margin: 0;
    padding: 0;
  }

  .home-hero.scrolled{

    .hero-content{
      transform: translate(-50%, calc(-50% - 60px));
      opacity: 0;
      pointer-events: none;
    }

    .explanation-content {
      transform: translate(-50%, -50%);
      opacity: 1;
      pointer-events: auto;
    }
  }

  .hero-content{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), 
    opacity 0.6s ease-out;
  }

  .explanation-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, calc(-50% + 55px));
    width: 80%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    opacity: 0;
    pointer-events: none;
    font-family: $font-secondary;
    font-size: 1.2rem;
    color: white;
    transition: transform 0.8s cubic-bezier(0.25, 1, 0.5, 1), 
    opacity 0.6s ease-out;
  }

  .credits{
    position: absolute;
    bottom: 48px;
    font-family: $font-secondary;
    color: $color-accent;
  }

  .main-title {
    font-family: $font-primary;
    font-weight: normal;
    font-size: 9rem;
    color: $color-accent;
    margin: 0;
    padding: 0;
  }

  .main-subtitle {
    font-family: $font-secondary;
    font-weight: normal;
    font-size: 2rem;
    color: $color-accent;
    margin-top: 32px;
    padding: 0;
  }

  .explanation-title{
    font-family: $font-primary;
    font-weight: normal;
    font-size: 4rem;
    color: $color-accent;
    padding: 0;
    margin: 0;
  }

  .intro-text{
    font-size: 1.5rem;
    margin-bottom: 16px;
    color: $color-accent;
  }

  .description{
    margin-bottom: 48px;
  }

  .accent-color{
    color: $color-accent;
  }

  .decor-star {
    position: absolute;
    width: 120px;
    height: 120px;
    background-image: url('@/assets/img/stars-decoration.svg');
    background-size: contain;
    background-repeat: no-repeat;
  }

  .top-left {
    top: 48px;
    left: 48px;
  }

  .top-right {
    top: 48px;
    right: 48px;
    transform: scaleX(-1);
  }

  .bottom-left {
    bottom: 48px;
    left: 48px;
    transform: scaleY(-1);
  }

  .bottom-right {
    bottom: 48px;
    right: 48px;
    transform: scale(-1);
  }

  .scroll-indicator {
    margin-top: 96px;
  }

  .btn-start{
    font-family: $font-secondary;
    background-color: $color-accent;
    color: $color-primary;
    width: fit-content;
    padding: 12px 24px;
    align-self: center;
    margin-top: 32px;
    margin-bottom: 48px;
    font-size: 1.2rem;
    text-decoration: none;
    border-radius: 8px;
    cursor: pointer;
  }

  .btn-start:hover {
    background-color: lighten($color-accent, 8%);
    transition: background-color 0.3s ease;
  }

</style>