<template>
  <div class="backstory">
    <h1 class="name mb-2" :class="moral">Allip</h1>
    <p class="backstory-text">
      And so, with the dawn's light glinting off his broadsword, Ernald Herren
      stood at the edge of the abyss. Below, the snarls of unseen creatures
      echoed, as if challenging the very notion of courage. "I did not choose
      the light," Ernald's voice rumbled, his words aimed at the darkness below
      as much as to his own heart. "But I will wield it against those who lurk
      in the shadows." Beside him, a figure cloaked in the whispers of shadow
      shifted uneasily. "You walk a path no other Paladin dares, Ernald. To
      embrace chaos, to question... Are you certain of your purpose?" Ernald
      turned, his gaze fixed on the horizon where the sky bled into the earth.
      "Certainty is a luxury afforded to those who do not bear my burden. I
      search for purpose, yes, but I do not expect to find it in the light nor
      in the dark. It is the struggle, the constant battle against the chains of
      destiny, that defines me." The cloaked figure stepped closer, the air
      chilling as they spoke, "And what of the codes you once held dear? The
      sacred oaths..." With a scoff, Ernald interrupted, "Oaths? Codes? They are
      but chains. My actions are dictated not by ancient words but by the will
      to forge my own path. The world is not black and white, and neither am I.
      I am the grey in between, the storm that rages against the calm." He
      lifted his sword, the blade catching the first light of dawn, casting
      shadows that danced like specters. "Today, I fight not for glory, not for
      honor, but for the simple truth that even in chaos, there is purpose." As
      he stepped forward, the abyss seemed to pause, its breath held in
      anticipation. Ernald's voice, now a whisper, carried a weight that belied
      his massive form. "Let those who hide in the dark fear me, for I am their
      reckoning. Let those who stand in the light doubt me, for I am their
      test." With that, Ernald leapt into the abyss, his battle cry slicing
      through the silence, a beacon of chaotic resolve in the endless night...
      And as his allies watched, one whispered to another, "May his soul find
      what it seeks, amidst the chaos and the shad...
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Statistics } from "@/types";

const statistics = inject("statistics") as ComputedRef<Statistics>;
const moral = inject("moral") as ComputedRef<string>;
</script>

<style scoped>
.backstory {
}
.name {
  font-size: 2.5rem;
  line-height: 1;
  letter-spacing: 0.05em;
  font-weight: 600;
  font-family: "MrsEavesSmallCaps";
}
/*
.backstory-text:first-letter {
  initial-letter: 5;
  font-family: "AngloText";
  font-weight: 400;
  @apply text-text-neutral;
}
*/
</style>
