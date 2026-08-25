<script setup>
  import { onMounted, onUnmounted } from 'vue'

  defineProps({
    card: {
      type: Object,
      required: true
    }
  })

  const emit = defineEmits(['close'])

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      emit('close')
    }
  }

  onMounted(() => {
    window.addEventListener('keydown', handleKeyDown)
  })

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyDown)
  })
</script>

<template>
  <div class="inspect-overlay" @click.self="emit('close')">
    <button class="btn-close" aria-label="Close" @click="emit('close')">&#x2715;</button>
    <div class="card-focus-zone">
      <img
        class="inspect-card-img"
        :src="card.image"
        :alt="card.name"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
  @import '../../assets/styles/main.scss';

  .inspect-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(24, 0, 24, 0.773);
    backdrop-filter: blur(4px);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10000;
    animation: fadeIn 0.25s ease-out;
  }

  .btn-close {
    position: absolute;
    top: 48px;
    right: 48px;
    background: none;
    border: none;
    font-size: 32px;
    color: $color-accent;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: scale(1.2);
    }
  }

  .card-focus-zone {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: default;
  }

  .inspect-card-img {
    width: 340px;
    height: auto;
    user-select: none;
    -webkit-user-drag: none;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
</style>