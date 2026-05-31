<template>
  <div class="desktop-only-warning">
    <div class="warning-box">
      <div class="warning-content">
        <div class="decor-star-mobile"></div>
        <h2>Hold on, fellow mystic!</h2>
        <p>It looks like you're trying to open this interactive Tarot experience on a smaller screen.</p>
        <p>We designed this interactive Tarot board with lots of tiny details, drag-and-drop mechanics, and features that simply don't fit into a pocket just yet!</p>
        <p>Please resize your window or come back on a computer to start your journey. The cards will be waiting for you!</p>
      </div>
    </div>
    <footer class="credits">
      © All rights reserved — Alyssa Beaufils
    </footer>
  </div>

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

  .desktop-only-warning {
      display: none;
  }

  .app-container {
      width: 100%;
      height: 100%;
  }

  @media (max-width: 1023px) {

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
