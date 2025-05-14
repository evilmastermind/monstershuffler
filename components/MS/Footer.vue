<template>
  <div>
    <div v-if="$slots.feedback" class="flex justify-center mt-6 mx-4">
      <div class="max-w-[500px] md:max-w-[600px]">
        <slot name="feedback" />
      </div>
    </div>

    <!-- <div class="mt-10 mb-8 mx-4 flex flex-col items-center">
      <div class="relative flex items-center justify-center">
        <div class="absolute inset-0 grid">
          <div
            class="rounded-xl w-full h-full opacity-30 mix-blend-difference bg-red-500 animate-gradient-2"
          />
          <div
            class="rounded-xl w-full h-full opacity-30 mix-blend-difference bg-blue-500 animate-gradient-1 animation-delay-[0.33s]"
          />
          <div
            class="rounded-xl w-full h-full opacity-30 mix-blend-difference bg-green-500 animate-gradient-2 animation-duration-[6s] animation-delay-[0.66s]"
          />
        </div>
        <MSLogo
          class="rounded-xl w-[70px] aspect-square bg-black shadow-[0_0_20px_theme(colors.text/10)] z-10"
        />
      </div>

      <h2 class="mt-6">Help bring this vision to life</h2>
      <p class="mt-4 text-center text-base max-w-[550px]">
        With your support, we can build this project in months, not years.
      </p>
      <p class="mt-4 text-center text-base max-w-[550px]">
        If you’re excited about this, head over to the Kickstarter pre-launch
        page and click “Notify me on launch” so you don’t miss the early rewards
        and campaign-only deals.
      </p>
      <NavbarSupportButtonKickstarter class="mt-6" />
    </div> -->

    <footer
      class="mt-4 p-4 flex flex-col items-center border-t border-accented bg-linear-to-b from-(--ui-bg-muted)/50 to-(--ui-bg-muted) gap-2"
    >
      <p class="max-w-lg text-xs text-center">
        © 2022 Monstershuffler, created by
        <a href="mailto:ismael@monstershuffler.com" class="font-bold">Ismael</a
        >. All rights reserved.
      </p>
      <p class="max-w-lg text-xs text-center">
        Some features of this website are under the
        <a
          href="http://media.wizards.com/2016/downloads/DND/SRD-OGL_V5.1.pdf"
          class="font-bold"
          >D&D Open Gaming License (OGL)</a
        >. DUNGEONS & DRAGONS is a registered trademark owned by WIZARDS OF THE
        COAST LLC.
      </p>
      <p class="max-w-lg text-xs text-center">
        Contact:
        <a href="mailto:info@monstershuffler.com" class="font-bold"
          >info@monstershuffler.com</a
        >
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// no changes
</script>

<style scoped>
@keyframes gradient-1 {
  0% {
    top: -1.5px;
    left: -1.5px;
  }
  15% {
    top: 0;
    left: -1.5px;
  }
  30% {
    top: 1.5px;
    left: 0;
  }
  45% {
    top: 1.5px;
    left: 1.5px;
  }
  60% {
    top: 0;
    left: 1.5px;
  }
  75% {
    top: -1.5px;
    left: 1.5px;
  }
  90% {
    top: -1.5px;
    left: 0;
  }
  100% {
    top: -1.5px;
    left: -1.5px;
  }
}

@keyframes gradient-2 {
  0% {
    top: -1.5px;
    left: -1.5px;
  }
  15% {
    top: -1.5px;
    left: 0;
  }
  30% {
    top: -1.5px;
    left: 1.5px;
  }
  45% {
    top: 0;
    left: 1.5px;
  }
  60% {
    top: 1.5px;
    left: 1.5px;
  }
  75% {
    top: 1.5px;
    left: 0;
  }
  90% {
    top: 0;
    left: -1.5px;
  }
  100% {
    top: -1.5px;
    left: -1.5px;
  }
}

/* Utility classes for animation, defined here because dynamic */
.animate-gradient-1 {
  animation: gradient-1 3.2s linear infinite;
}
.animate-gradient-2 {
  animation: gradient-2 2s alternate infinite;
}
.animation-delay-\[0\.33s\] {
  animation-delay: 0.33s;
}
.animation-duration-\[6s\] {
  animation-duration: 6s;
}
.animation-delay-\[0\.66s\] {
  animation-delay: 0.66s;
}
</style>
