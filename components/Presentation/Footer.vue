<template>
  <div class="footer-container">
    <div v-if="$slots.feedback" class="feedback mt-6">
      <slot name="feedback" />
    </div>
    <div class="footer-cta mt-10 mb-8 mx-4">
      <div class="logo-container">
        <div class="logo-gradients">
          <!-- <div class="gradient gradient-1" />
          <div class="gradient gradient-2" />
          <div class="gradient gradient-3" /> -->
        </div>
        <MSLogo class="logo" />
      </div>
      <h2 class="static mt-6">Help bring this vision to life</h2>
      <p class="static max-width mt-4">
        With your support, we can build this project in months, not years.
      </p>
      <NavbarSupportButtonKickstarter class="mt-6" />
    </div>
    <footer class="footer mt-4 p-4">
      <p class="footer-text footer-copyright">
        © 2022 Monstershuffler, created by
        <a href="mailto:ismael@monstershuffler.com">Ismael</a>. All rights
        reserved.
      </p>
      <p class="footer-text footer-dnd">
        Some features of this website are under the
        <a href="http://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf"
          >D&D Open Gaming License (OGL)</a
        >. DUNGEONS & DRAGONS is a registered trademark owned by WIZARDS OF THE
        COAST LLC.
      </p>
      <p class="footer-text">
        Contact:
        <a href="mailto:info@monstershuffler.com">info@monstershuffler.com</a>
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer-container {
}
.footer-cta {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.footer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @apply border-t border-t-background-300 bg-gradient-to-b from-background-150 to-background-200 gap-2;
}
.footer-text {
  max-width: 600px;
  @apply text-xs text-center;
}
.footer-text a {
  font-weight: bold;
}
.logo-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.logo {
  position: relative;
  width: 70px;
  aspect-ratio: 1;
  background-color: black;
  box-shadow: 0 0 20px theme("colors.text / 10%");
  @apply rounded-xl;
}
.logo-gradients {
  position: absolute;
  inset: 0;
}
.gradient {
  position: absolute;
  width: 100%;
  opacity: 1;
  mix-blend-mode: difference;
  aspect-ratio: 1;
  @apply rounded-xl;
}
.gradient-1 {
  background: red;
  animation: gradient-2 1.3s alternate infinite;
}
.gradient-2 {
  background: blue;
  animation: gradient-2 1s linear infinite;
  animation-delay: 0.2s;
}
.gradient-3 {
  background: rgb(0, 255, 0);
  animation: gradient-2 1.1s linear infinite;
  animation-delay: 0.4s;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes gradient-1 {
  0% {
    top: 1.5px;
    left: 1.5px;
  }
  20% {
    top: -1.5px;
    left: 0%;
  }
  40% {
    top: 0%;
    left: -1.5px;
  }
  60% {
    top: 1.5px;
    left: 1.5px;
  }
  80% {
    top: 1.5%;
    left: 0%;
  }
  100% {
    top: 1.5px;
    left: 1.5px;
  }
}
@keyframes gradient-2 {
  0% {
    top: -1.5px;
    left: -1.5px;
  }
  20% {
    top: 0%;
    left: -1.5px;
  }
  40% {
    top: 1.5%;
    left: 0%;
  }
  60% {
    top: 1.5px;
    left: 1.5px;
  }
  80% {
    top: 1.5px;
    left: -1.5px;
  }
  100% {
    top: -1.5px;
    left: -1.5px;
  }
}
@keyframes gradient-3 {
  0% {
    bottom: 0%;
    right: -1.5px;
  }
  20% {
    bottom: 1.5%;
    right: 0%;
  }
  40% {
    bottom: -1.5px;
    right: -1.5px;
  }
  60% {
    bottom: -1.5px;
    right: 0%;
  }
  80% {
    bottom: 1.5px;
    right: -1.5px;
  }
  100% {
    bottom: 0%;
    right: -5;
  }
}
</style>
