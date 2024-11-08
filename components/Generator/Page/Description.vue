<template>
  <PresentationPage>
    <PresentationText class="mx-4">
      <h2 class="static max-width">
        Made to <span class="accent">level up</span> your Dungeon Master skills
      </h2>
      <p class="static max-width mt-6">
        Built with a purpose: to
        <b class="bold"
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
          <Transition name="slide-right" mode="out-in">
            <MonsterLayoutExampleNoImage2Column
              v-if="card === 1"
              class="sheet-example"
            />
            <MonsterLayoutExample1ColumnA
              v-else-if="card === 2"
              class="sheet-example"
            />
            <MonsterLayoutExample2ColumnA
              v-else-if="card === 3"
              class="sheet-example"
            />
            <MonsterLayoutExample1ColumnC
              v-else-if="card === 4"
              class="sheet-example"
            />
          </Transition>
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
          <div class="random-example">
            <div class="example-prompt static-mono">
              A (loyal | faithful | false) (priest | paladin | servant) of
              Deity.
            </div>
            <Transition name="fade-slow" mode="out-in">
              <div :key="exampleResult" class="example-result">
                {{ exampleResult }}
              </div>
            </Transition>
          </div>
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
        You can even feed the result to an AI as prompt, and get even more
        randomness. That's how the AI-generated adventures are created, and it's
        a tool that will be available to you.
      </PresentationTool>
      <PresentationTool class="mt-8">
        <template #image>
          <div class="cute-stat-block-container">
            <Icon class="cute-stat-block-cog-o-1" name="lucide:cog" />
            <Icon class="cute-stat-block-cog-o-2" name="heroicons:cog-solid" />
            <Icon class="cute-stat-block-cog-o-3" name="game-icons:cog" />
            <div class="cute-stat-block-border" />
            <div class="cute-stat-block">
              <div class="cute-stat-block-gradient" />
              <p class="cute-stat-block-name">Dude</p>
              <p class="cute-stat-block-meta">Humanoid</p>
              <Icon class="cute-stat-block-cog-1" name="lucide:cog" />
              <Icon class="cute-stat-block-cog-2" name="heroicons:cog-solid" />
              <Icon class="cute-stat-block-cog-3" name="game-icons:cog" />
            </div>
            <div class="cute-stat-block-border" />
          </div>
        </template>
        <template #title>Monster Editor, improved</template>
        The original Monster Editor can be found
        <a
          class="content"
          href="https://www.monstershuffler.com/monsters/editor.php"
          >here</a
        >.<br />
        It's already a powerful tool, but the upcoming website upgrade will cut
        monster creation time in half with:
        <ul class="list mt-2">
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
const exampleResult = ref("A faithful paladin of Mystra.");

const exampleResults = [
  "A faithful servant of Lathander.",
  "A false priest of Bane.",
  "A loyal paladin of Asmodeus.",
  "A loyal servant of Torm.",
  "A faithful paladin of Mystra.",
];
const exampleIndex = ref(0);
const card = ref(1);

onMounted(() => {
  setInterval(() => {
    exampleResult.value =
      exampleResults[exampleIndex.value++ % exampleResults.length];
    changeCard();
  }, 3000);
});

function changeCard() {
  card.value = random(1, 4);
}
</script>

<style scoped>
.sheet-example {
  width: 100%;
  max-width: 100px;
}
.random-example {
  position: relative;
  width: 100px;
  height: 160px;
  @apply bg-background-100 rounded-lg p-2;
}
.random-example .example-prompt {
  font-family: monospace;
  font-size: 0.75rem;
  text-align: left;
  line-height: 1;
  @apply text-text-good;
}
.random-example .example-result {
  font-size: 0.875rem;
  text-align: left;
  line-height: 1.2;
  @apply text-text-evil pt-2;
}
.list {
  @apply list-disc list-inside;
}
.list li + li {
  @apply mt-1;
}
.cute-stat-block-container {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 140px;
  @apply bg-stone-200;
}
.cute-stat-block {
  position: relative;
  background-color: #fff8dc;
  background-image: url("@/assets/images/monster/paper-texture.webp");
  width: 66px;
  height: 100px;
  @apply shadow-xl px-1;
}
.cute-stat-block-border {
  position: relative;
  height: 4px;
  width: 70px;
  border: 1px solid #000;
  background-position: top left;
  background-repeat: repeat;
  background-image: url("@/assets/images/monster/sticks2.webp");
}
.cute-stat-block-name {
  position: relative;
  text-align: left;
  font-size: 1em;
  line-height: 1;
  font-family: "MrsEavesSmallCaps", serif;
  @apply mt-1 text-red-950;
}
.cute-stat-block-meta {
  position: relative;
  text-align: left;
  font-size: 0.7em;
  font-family: "ScalaSansOffc", sans-serif;
  font-style: italic;
  line-height: 1;
  @apply text-stone-600;
}
.cute-stat-block-cog-1 {
  position: absolute;
  bottom: 4px;
  right: 4px;
  font-size: 2.5em;
  animation: rotate-left 2s infinite linear;
  @apply text-red-950/20;
}
.cute-stat-block-cog-2 {
  position: absolute;
  bottom: 26px;
  left: 2px;
  font-size: 2em;
  animation: rotate-right 2s infinite linear;
  @apply text-red-950/20;
}
.cute-stat-block-cog-3 {
  position: absolute;
  bottom: 44px;
  right: 20px;
  font-size: 1.2em;
  animation: rotate-left 2s infinite linear;
  @apply text-yellow-800/25;
}
.cute-stat-block-cog-o-1 {
  position: absolute;
  bottom: -50px;
  right: -50px;
  font-size: 8em;
  animation: rotate-left 10s infinite linear;
  @apply text-stone-300;
}
.cute-stat-block-cog-o-2 {
  position: absolute;
  bottom: 20px;
  left: -35px;
  font-size: 7em;
  animation: rotate-right 15s infinite linear;
  @apply text-stone-300;
}
.cute-stat-block-cog-o-3 {
  position: absolute;
  top: -25px;
  right: -25px;
  font-size: 5em;
  animation: rotate-left 7s infinite linear;
  @apply text-stone-300;
}
.cute-stat-block-gradient {
  position: absolute;
  inset: 0;
  background: url("@/assets/images/monster/semitransparent.webp");
  background-size: 150px auto;
  background-repeat: repeat-x;
}

@keyframes rotate-left {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
@keyframes rotate-right {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
