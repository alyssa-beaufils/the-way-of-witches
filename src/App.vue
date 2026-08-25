<script setup>
  import { RouterLink, useRoute } from 'vue-router'

  const route = useRoute()
  const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="desktop-only-warning">
    <div class="warning-box">
      <div class="warning-content">
        <div class="decor-star-mobile"></div>
        <h2>Hold on, fellow mystic!</h2>
        <p>It looks like you're trying to open this interactive Tarot experience on a smaller screen.</p>
        <p>We designed this interactive Tarot board with lots of tiny details, drag-and-drop mechanics, and features that simply don't fit into a portrait mode just yet!</p>
        <p>Please rotate your device or come back on a computer to start your journey. The cards will be waiting for you!</p>
      </div>
    </div>
    <footer class="credits">
      &copy; {{ currentYear }} Alyssa Beaufils. All rights reserved.
    </footer>
  </div>

  <nav class="main-nav" v-if="route.meta.showNav">
    <RouterLink to="/" class="nav-link">Home</RouterLink>
    <span class="nav-divider">
      <img src="@/assets/img/star-divider.svg" alt="Star Decoration" class="nav-divider-img"/>
    </span>
    <RouterLink to="/Sandbox" class="nav-link">Cards</RouterLink>
    <span class="nav-divider">
      <img src="@/assets/img/star-divider.svg" alt="Star Decoration" class="nav-divider-img"/>
    </span>
    <RouterLink to="/Credits" class="nav-link">Credits</RouterLink>
  </nav>

  <div id="app-container">
    <router-view />
  </div>
</template>

<style lang="scss">

  @import './assets/styles/variables.scss';
  body {
    background-image: url("assets/img/table.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    overflow-y: hidden;
  }

  app-container {
    width: 100%;
    height: 100%;
  }

  .main-nav {
    position: absolute;
    top: 28px;
    right: 48px;
    display: flex;
    align-items: center;
    gap: 18px;
    z-index: 4000;
    user-select: none;
  }

  .nav-link {
    font-family: $font-primary;
    font-size: 28px;
    color: $color-accent;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: lighten($color-accent, 8%);
      transform: scale(1.03);
    }

    &.router-link-active {
      color: white;
      text-decoration: underline;
      text-decoration-color: white;
      text-decoration-thickness: 2px;
    }
  }

  .nav-divider {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-divider-img {
    width: 24px;
    height: auto;
    display: block;
  }

  .desktop-only-warning {
      display: none;
  }

  @media (max-width: 1023px) and (orientation: portrait), screen and (max-width: 600px) {

    .main-nav {
      display: none;
    }  

    .desktop-only-warning {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: $color-primary;
      z-index: 999999;
      justify-content: center;
      align-items: center;
      padding: 20px;
      box-sizing: border-box;
    }

    .warning-box {
      position: relative;
      width: 100%;
      max-width: 550px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .warning-content {
      width: 80%;
      justify-content: center;
      margin-top: -70px;
      text-align: left;
      font-family: $font-secondary;
      color: $color-accent;
          
      h2 {
        font-size: 28px;
        margin-bottom: 12px;
        color: $color-accent;
      }

      p {
        font-size: 18px;
        line-height: 1.5;
        margin: 24px 0;
      }
    }

    .decor-star-mobile {
      width: 120px;
      height: 90px;
      margin: 0;
      padding: 0;
      background-image: url('@/assets/img/stars-decoration.svg');
      background-size: contain;
      background-repeat: no-repeat;

      transform: rotateX(180deg);
    }

    .credits{
      font-family: $font-secondary;
      color: $color-accent;
    }

    .app-container {
      display: none !important;
    }
}
</style>
