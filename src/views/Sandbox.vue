<script setup>
  import { ref, onMounted } from 'vue'
  import Board from '../components/canvas/Board.vue'
  import tarotData from '@/assets/data/cards.json'
  import character from '@/assets/characters/mentor.png'
  import parchment from '@/assets/img/parchment.svg'
  import backgroundDialogue from '@/assets/img/bg-dialogue.svg'
  import backgroundButton from '@/assets/img/bg-btn.svg'

  const isLoading = ref(true)
  const readyCards = ref([])

  const preloadAssets = async () => {
    const cards = tarotData
    const staticAssets = [character, parchment, backgroundDialogue, backgroundButton]

    const loadSingleImage = async (src) => {
      const img = new Image()
      img.src = src
      try {
        await img.decode()
      } catch {
      }
    }

    const staticPromises = staticAssets.map(src => loadSingleImage(src))
    const cardPromises = cards.map(async (card) => {
      const img = await loadSingleImage(card.image)
      return { ...card, imageObj: img }
    })

    await Promise.all(staticPromises)
    readyCards.value = await Promise.all(cardPromises)
    
    setTimeout(() => {
      isLoading.value = false
    }, 200)
  }

  onMounted(() => {
    preloadAssets()
  })
</script>

<template>
  <header>
  </header>

  <main class="sandbox-container">
    <Transition name="fade-loader">
      <div v-if="isLoading" class="loading-overlay">
        <div class="decor-star top-left"></div>
        <div class="decor-star top-right"></div>
        <div class="decor-star bottom-left"></div>
        <div class="decor-star bottom-right"></div>

        <div class="loader-center">
          <div class="loading-star center"></div>
          <div class="loading-text"></div>
        </div>
      </div>
    </Transition>

    <Board v-if="!isLoading" :tarotCards="readyCards" />
  </main>
</template>

<style scoped lang="scss">

  @import '@/assets/styles/variables.scss';

  .sandbox-container {
    background-image: url("@/assets/img/table.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    overflow-y: hidden;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
  }

  .loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: $color-primary;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99999;
    user-select: none;
  }

  .decor-star {
    position: absolute;
    width: 120px;
    height: 120px;
    background-image: url('@/assets/img/stars-decoration.svg');
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
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

  .loader-center {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }

  .loading-star {
    width: 60px;
    height: 90px;
    margin: 0;
    background-image: url('@/assets/img/single-star.svg');
    background-size: contain;
    background-repeat: no-repeat;
    pointer-events: none;
    animation: pulse 1.8s ease-in-out infinite;
  }

  .loading-text {
    font-family: $font-secondary;
    font-size: 18px;
    color: $color-accent;
    margin: 0;
    clip-path: inset(0 3ch 0 0);
    animation: l4 0.8s steps(4) infinite;
  }

  .loading-text:before {
    content:"Loading..."
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(0.9);
      opacity: 0.7;
    }
    50% {
      transform: scale(1.15);
      opacity: 1;
    }
  }

  @keyframes l4 {to{clip-path: inset(0 -1ch 0 0)}}

  .fade-loader-leave-active {
    transition: opacity 0.6s ease;
  }

  .fade-loader-leave-to {
    opacity: 0;
  }
</style>