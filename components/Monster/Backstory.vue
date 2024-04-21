<template>
  <div class="backstory">
    <h1 class="name mb-2" :class="moral">{{ statistics.fullName }}</h1>
    <p class="backstory-text">
      ...clattering of chains echoed through the newly occupied halls, Yurdir
      Stonebeard stood at the center, his gaze piercing the darkness. Around
      him, the shadows danced, as if mocking his somber mood. He had never asked
      for this life, to be the master of chains and keeper of wills. Yet, there
      he was, a Dwarf of considerable skill and strength, bound to a profession
      that gnawed at his conscience. "Ye think this is what I wanted?" Yurdir
      muttered to the empty air, his voice a blend of resentment and
      resignation. His hands, calloused and scarred, ran over the cold iron of a
      shackle, a silent testament to the lives he had altered. Yet, in the midst
      of his brooding, a spark of gratitude flickered within him. This house,
      this new beginning, was a chance to alter the course, to weave a thread of
      compassion through the fabric of servitude. As if in response to his
      contemplation, a faint stir broke the silence. From the shadows emerged a
      figure, small and trembling. A young Elf, her eyes wide with fear and
      confusion, yet there was a defiance in her stance that caught Yurdir off
      guard. "You... you are the master here?" she asked, her voice barely a
      whisper. Yurdir's heart clenched. "Aye, I am that," he replied, the weight
      of his title heavier than the mightiest axe he had wielded. The Elf
      squared her shoulders, taking a step forward. "Then hear my plea, Master
      Dwarf. I seek not freedom for myself, but for my brother. He is but a
      child, innocent in the ways of the world. If there is any kindness in your
      heart, any at all, let him go." In that moment, Yurdir saw the crossroads
      laid before him. To continue down the path of apathy and compliance, or to
      forge a new destiny, not just for himself, but for those under his
      dominion. The choice was clear, and yet, the consequences of such a
      decision loomed large. "I..." Yurdir began, his voice strong, yet laden
      with an emotion he had long since buried. "I will consider your request.
      Not out of duty, but out of respect for the courage you've shown." As the
      Elf's eyes filled with a cautious hope, Yurdir Stonebeard felt a shift
      within him. This was his moment, his chance to redefine the legacy of his
      name. Not as a master of slaves, but as a beacon of...
    </p>
    <p class="backstory-text">
      With a scoff, Ernald interrupted, "Oaths? Codes? They are but chains. My
      actions are dictated not by ancient words but by the will to forge my own
      path. The world is not black and white, and neither am I. I am the grey in
      between, the storm that rages against the calm." He lifted his sword, the
      blade catching the first light of dawn, casting shadows that danced like
      specters. "Today, I fight not for glory, not for honor, but for the simple
      truth that even in chaos, there is purpose." As he stepped forward, the
      abyss seemed to pause, its breath held in anticipation. Ernald's voice,
      now a whisper, carried a weight that belied his massive form. "Let those
      who hide in the dark fear me, for I am their reckoning. Let those who
      stand in the light doubt me, for I am their test." With that, Ernald leapt
      into the abyss, his battle cry slicing through the silence, a beacon of
      chaotic resolve in the endless night... And as his allies watched, one
      whispered to another, "May his soul find what it seeks, amidst the chaos
      and the shad...
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
  font-weight: 500;
  font-family: "MrsEavesSmallCaps", serif;
}
.backstory-text {
  font-family: "LibreBaskerville", serif;
  line-height: 1.5;
  @apply my-2;
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
