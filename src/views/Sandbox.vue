<script setup>
import Board from '../components/canvas/Board.vue'
</script>

<template>
  <header>
  </header>

  <main class="sandbox-container">
    <Board />
  </main>
</template>

<style scoped lang="scss">

.sandbox-container {
    background-image: url("@/assets/img/table.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    overflow-y: hidden;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
  }
</style>