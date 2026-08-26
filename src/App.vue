<script setup>
  import { RouterLink, useRoute } from 'vue-router'
  import { ref, watch } from 'vue'

  const route = useRoute()
  const currentYear = new Date().getFullYear()

  const isMenuOpen = ref(false)

  const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
  }

  const closeMenu = () => {
    isMenuOpen.value = false
  }

  watch(() => route.fullPath, () => {
    closeMenu()
  })
</script>

<template>
  <div class="desktop-only-warning">
    <div class="warning-box">
      <div class="warning-content">
        <div class="decor-star-mobile"></div>
        <h2>Hold on, fellow mystic!</h2>
        <p>We designed this interactive Tarot board with lots of tiny details, drag-and-drop mechanics, and features that simply don't fit into portrait mode just yet!</p>
        <p>Please <strong>rotate your device</strong> or come back on a computer to start your journey. The cards will be waiting for you!</p>
      </div>
    </div>
    <footer class="credits">
      &copy; {{ currentYear }} Alyssa Beaufils. All rights reserved.
    </footer>
  </div>

  <button
    v-if="route.meta.showNav"
    class="burger-btn"
    :class="{ 'is-open': isMenuOpen }"
    @click="toggleMenu"
  >
    <span class="burger-bar"></span>
    <span class="burger-bar"></span>
    <span class="burger-bar"></span>
  </button>

  <nav
    class="main-nav"
    v-if="route.meta.showNav"
    :class="{ 'is-open': isMenuOpen }"
  >
    <button class="burger-close-btn" @click="closeMenu">&#x2715;</button>

    <RouterLink to="/" class="nav-link" @click="closeMenu">Home</RouterLink>
    <span class="nav-divider">
      <img src="@/assets/img/star-divider.svg" alt="Star Decoration" class="nav-divider-img"/>
    </span>
    <RouterLink to="/Sandbox" class="nav-link" @click="closeMenu">Cards</RouterLink>
    <span class="nav-divider">
      <img src="@/assets/img/star-divider.svg" alt="Star Decoration" class="nav-divider-img"/>
    </span>
    <RouterLink to="/Credits" class="nav-link" @click="closeMenu">Credits</RouterLink>
  </nav>

  <div
    v-if="isMenuOpen"
    class="burger-overlay"
    @click="closeMenu"
  ></div>

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

  .burger-btn, .burger-close-btn, .burger-overlay{
    display: none;
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

  @media screen and (max-width: 1200px) and (orientation: landscape) {
    .burger-btn {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      position: fixed;
      top: 16px;
      right: 24px;
      width: 48px;
      height: 48px;
      padding: 8px;
      background: none;
      border: none;
      cursor: pointer;
      z-index: 4500;
      transition: transform 0.2s ease;

      .burger-bar {
        width: 100%;
        height: 3px;
        background-color: $color-accent;
        border-radius: 2px;
      }
    }
  
    .main-nav {
      position: fixed;
      top: 0;
      right: 0;
      width: 350px;
      height: 100vh;
      background-color: $color-primary;
      border-left: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      transform: translateX(100%);
      transition: transform 0.35s ease;
      z-index: 9000;

      &.is-open {
        transform: translateX(0);
      }
    }

    .burger-close-btn {
      display: block;
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      color: $color-accent;
      cursor: pointer;
      transition: transform 0.2s ease;

      &:hover {
        transform: scale(1.2);
      }
    }

    .nav-divider-img {
      width: 32px;
      margin: 0;
    }

    .burger-overlay {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(24, 0, 24, 0.477);
      z-index: 4800;
    }

  }

  @media screen and (min-width: 931px) and (max-width: 1200px) and (orientation: landscape) {
    .main-nav {
      width: 300px;
      gap: 24px;
    }

    .burger-close-btn {
      font-size: 32px;
    }

    .nav-link {
      font-size: 32px;
    }
  }

  @media screen and (max-width: 930px) and (orientation: landscape) {
    .main-nav {
      width: 230px;
      gap: 20px;
    }

    .burger-close-btn {
      font-size: 28px;
    }

    .nav-link {
      font-size: 24px;
    }
  }

  @media screen and (orientation: portrait), screen and (max-width: 650px) {

    .desktop-only-warning {
      display: flex;
      flex-direction: column;
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
