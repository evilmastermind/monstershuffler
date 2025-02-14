<template>
  <PresentationPage>
    <PresentationText class="mx-4">
      <h2 class="static max-width">
        Made to <span class="accent">level up</span> your Dungeon Master skills
      </h2>
      <p class="static max-width mt-6">
        Built with a purpose: to
        <b class="static"
          >never let you run out of NPCs during your game sessions</b
        >.
      </p>
      <p class="static max-width mt-1">
        Designed to generate NPCs as quickly and effortlessly as possible, while
        giving you the essential information to roleplay them
      </p>
    </PresentationText>
    <PresentationCardList image="/images/backgrounds/druid.webp">
      <ul class="card-list">
        <PresentationCard icon="streamline:input-box-solid">
          <template #title>Prompt Mode</template>
          <template #default>
            <p class="static">
              Need a human innkeper? An evil bard? Quickly type what you need
              mid-game, and save prepation time.
            </p>
          </template>
        </PresentationCard>
        <PresentationCard icon="ph:squares-four-fill">
          <template #title>Roleplay stats</template>
          <template #default>
            <p class="static">
              Choose one of the four generated NPCs. Read the carefully picked
              list of roleplay stats and get ready to bring the NPC to life.
            </p>
          </template>
        </PresentationCard>
        <PresentationCard icon="fluent:pin-12-filled">
          <template #title>Pinned list</template>
          <template #default>
            <p class="static">
              Instantly revisit any NPC: selected NPCs are added to a list;
              simply hover to preview their roleplay stats.
            </p>
          </template>
        </PresentationCard>
        <PresentationCard icon="bi:file-text-fill">
          <template #title>The best tools of the trade</template>
          <template #default>
            <p class="static">
              Click an NPC to open a character sheet with a
              <b class="static">dynamic stat block</b>, a
              <b class="static">physical description</b>, and
              <b class="static">an AI-generated adventure</b>.
            </p>
          </template>
        </PresentationCard>
      </ul>
    </PresentationCardList>
    <PresentationText class="mx-4 mt-9">
      <h2 class="static max-width">A preview of things to come</h2>
      <PresentationTool class="mt-8">
        <template #image>
          <ThumbnailNote />
        </template>
        <template #title> Notes </template>
        Imagine OneNote or Obsidian, but designed specifically for Dungeon
        Masters.<br />The NPC Sheet is the first prototype of a "Text Note", one
        of the various note types you'll use to create and share dynamic
        content, like full campaigns, adventures, interactive maps, monsters,
        puzzles, and much more.
      </PresentationTool>
      <PresentationTool class="mt-8">
        <template #image>
          <ThumbnailRandomText />
        </template>
        <template #title>Random Text Generators</template>
        Use a
        <span class="static-mono"
          ><span class="symbol">(+</span>simple
          <span class="symbol">|</span> easy
          <span class="symbol">|</span> intuitive<span class="symbol">) </span>
          <span class="symbol">[</span>but powerful<span class="symbol"
            >]</span
          ></span
        >
        grammar to create random text generators.<br />
        You can even feed the result to an AI as a prompt, and get even more
        randomness. That's how the AI-generated adventures are created, and it's
        a tool that will be available to you.
      </PresentationTool>
      <PresentationTool class="mt-8">
        <template #image>
          <ThumbnailStatBlock />
        </template>
        <template #title>Monster Editor, improved</template>
        The
        <a
          class="content"
          href="https://www.monstershuffler.com/monsters/editor.php"
          >original monster editor</a
        >
        is already a powerful tool, but the upcoming website upgrade will cut
        monster creation time in half with:
        <ul class="content mt-2">
          <li>
            A streamlined user experience (automatic saves, simplified UI, and
            more)
          </li>
          <li>Automatic stat calculations when adjusting Challenge Rating</li>
          <li>
            spell group templates, action groups, random actions, and much more
          </li>
        </ul>
      </PresentationTool>
    </PresentationText>
    <PresentationText class="mx-4 mt-10">
      <h2 class="static max-width">This isn't even my final form</h2>
      <p class="static mt-4">The NPC Generator's roadmap:</p>
    </PresentationText>
    <GeneratorPageRoadmap class="mt-4" />
    <GeneratorPageFooter class="mt-4" />
  </PresentationPage>
</template>

<script setup lang="ts">
import { random } from "monstershuffler-shared";

const card = ref(1);
let interval: NodeJS.Timeout | null = null;

onMounted(() => {
  interval = setInterval(() => {
    changeCard();
  }, 3000);
});

function changeCard() {
  card.value = random(1, 4);
}

onUnmounted(() => {
  if (interval) {
    clearInterval(interval);
  }
});
</script>

<style scoped>
.sheet-example {
  width: 100%;
  max-width: 100px;
}
</style>
