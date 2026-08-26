<script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue'

  const portfolioUrl = 'https://alyssabeaufils.be/portfolio/'
  const figmaUrl = 'https://www.figma.com/community/file/1020701317322253884/stars-pack'
  
  const currentYear = ref(new Date().getFullYear())
  const scrollContainer = ref(null)

  let observer = null

  onMounted(() => {
    const options = {
      root: scrollContainer.value,
      rootMargin: '0px',
      threshold: 0.15
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        } else {
          entry.target.classList.remove('is-visible')
        }
      })
    }, options)

    const targets = scrollContainer.value.querySelectorAll('.animate-on-scroll')
    targets.forEach(target => observer.observe(target))
  })

  onBeforeUnmount(() => {
    if (observer) observer.disconnect()
  })
</script>

<template>
  <div class="credits-page">
    <div class="decor-star top-left"></div>
    <div class="decor-star top-right"></div>
    <div class="decor-star bottom-left"></div>
    <div class="decor-star bottom-right"></div>

    <div ref="scrollContainer" class="credits-container">
      
      <header class="credits-header animate-on-scroll">
        <h1 class="credits-title">Credits & Attributions</h1>
        <p class="intro-text">
          Thank you for exploring <strong class="highlight">The Way of Witches</strong>! 
          Here is a breakdown of the visual creation and the technologies that brought this project to life.
        </p>
      </header>

      <section class="credits-section original-work animate-on-scroll">
        <h2 class="section-subtitle">Original Work</h2>
        <div class="credit-block">
          <h3>Illustrations & Art Direction</h3>
          <p class="process-text">All illustrations were fully created with love by myself &lt;3</p>
          <a :href="portfolioUrl" target="_blank" rel="noopener" class="portfolio-btn">
            View Portfolio
          </a>
        </div>
      </section>

      <section class="credits-section third-party animate-on-scroll">
        <h2 class="section-subtitle">Third-Party Resources</h2>

        <div class="credit-block">
          <h3>Typography</h3>
          <p><strong class="highlight">Erben Gothic</strong> — via Fontesk</p>
          <p><strong class="highlight">Sinistre</strong> — via Collletttivo</p>
        </div>

        <div class="credit-block">
          <h3>Icons</h3>
          <p><strong class="highlight">Stars</strong> by Dasha Dzisko via <a :href="figmaUrl" target="_blank" rel="noopener" class="inline-link">Figma Community</a></p>
          <p><strong class="highlight">Other icons</strong> are used under open-source licenses via Iconify.</p>
        </div>
      </section>

      <section class="credits-section tech-stack animate-on-scroll">
        <h2 class="section-subtitle">Built With</h2>
        <div class="credit-block">
          <h3>Technologies & Frameworks</h3>
          <p><strong class="highlight">Vue.js</strong> — The progressive JavaScript framework.</p>
          <p><strong class="highlight">Konva.js</strong> — The 2D canvas library handling the interactive graphics.</p>
        </div>
      </section>

    </div>

    <footer class="credits-footer">
      <p>&copy; {{ currentYear }} Alyssa Beaufils. All rights reserved for the original illustrations.</p>
    </footer>
  </div>
</template>

<style lang="scss">
  @import '../assets/styles/variables.scss';

  body {
    margin: 0;
    padding: 0;
  }

  .credits-page {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    background-color: #16011b98; 
    margin: 0;
    padding: 0;
  }

  .credits-container {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, calc(-50% - 20px));
    width: 85%;
    max-width: 750px;
    max-height: 75vh;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
    text-align: left;
    font-family: $font-secondary;
    font-size: 1.1rem;
    color: white;
    padding-right: 10px;

    &::-webkit-scrollbar {
      width: 0px;
    }
    scrollbar-width: none;
  }

  .credits-title {
    font-family: $font-primary;
    font-weight: normal;
    font-size: 3rem;
    color: $color-accent;
    margin: 0 0 16px 0;
    text-align: left; 
  }

  .intro-text {
    font-size: 1.2rem;
    color: lighten($color-accent, 15%);
    line-height: 1.5;
    margin: 0;
  }

  .section-subtitle {
    font-family: $font-primary;
    font-weight: normal;
    font-size: 2.5rem;
    color: $color-accent;
    margin-bottom: 16px;
    padding-bottom: 8px;
  }

  .credit-block {
    margin-bottom: 16px;

    h3 {
      font-family: $font-primary;
      font-size: 1.5rem;
      font-weight: normal;
      color: $color-accent;
      margin-top: 0;
      margin-bottom: 8px;
    }

    p {
      margin: 8px 0;
      opacity: 0.9;
      line-height: 1.4;
    }
  }

  .highlight {
    font-weight: bold;
  }

  .inline-link {
    color: $color-accent;
    text-decoration: underline;
    &:hover {
      color: white;
    }
  }

  .portfolio-btn {
    font-family: $font-secondary;
    background-color: $color-accent;
    color: $color-primary;
    display: inline-block;
    width: fit-content;
    padding: 10px 24px;
    margin-top: 12px;
    font-size: 1.1rem;
    text-decoration: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;

    &:hover {
      background-color: lighten($color-accent, 8%);
    }
  }

  .credits-footer {
    position: absolute;
    bottom: 32px;
    width: 100%;
    text-align: center;
    font-family: $font-secondary;
    color: rgba($color-accent, 0.7);
    font-size: 0.9rem;
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
  
  .animate-on-scroll {
    opacity: 0;
    transform: translateY(30px);
    transition: transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), 
    opacity 0.7s ease-out;
  }

  .animate-on-scroll.is-visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media screen and (max-width: 930px) and (orientation: landscape) {
    .credits-container {
      max-height: 55vh;
      width: 65vw;
      gap: 16px;
      padding-right: 6px;
    }

    .credits-title {
      font-size: 1.5rem;
      margin-bottom: 6px;
    }

    .section-subtitle {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }

    .portfolio-btn {
      padding: 10px 10px;
      font-size: 1rem;
    }

    .credits-footer {
      display: none;
    }
  }

  @media screen and (min-width: 931px) and (max-width: 1200px) and (orientation: landscape) {
    .credits-container {
      max-height: 85vh;
      width: 60vw;
    }

    .credits-title {
      font-size: 1.5rem;
      margin-bottom: 6px;
    }

    .section-subtitle {
      font-size: 1.2rem;
      margin-bottom: 8px;
    }

    .portfolio-btn {
      padding: 10px 10px;
      font-size: 1rem;
    }

    .credits-footer {
      display: none;
    }
  }

</style>