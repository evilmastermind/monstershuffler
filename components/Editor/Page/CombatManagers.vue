<template>
  <div class="relative">
    <h2 class="static">Combat Manager</h2>
    <div class="combatmanagers-container mt-6">
      <div class="combatmanagers">
        <div class="combatmanager-container p-1">
          <div class="combatmanager-gradient" />
          <div class="combatmanager">
            <div
              v-for="enemy in enemies"
              :key="enemy.name"
              class="enemy enemy-selected"
            >
              <div class="enemy-stats">
                <div class="enemy-left-top">
                  <img
                    class="enemy-image"
                    :src="`images/presentation/${enemy.image}`"
                  />
                  <span class="adventurer-name">{{ enemy.name }}</span>
                </div>
                <div class="enemy-right-top">
                  <div class="adventurer-hp-container">
                    <ClientOnly>
                      <div
                        class="adventurer-hp-bar"
                        :style="getHealthBarCss(enemy.currentHP, enemy.HP)"
                      />
                      <template #fallback>
                        <div
                          class="adventurer-hp-bar"
                          :style="{
                            width: '100%',
                            backgroundColor: 'hsl(120, 100%, 21%)',
                          }"
                        />
                      </template>
                    </ClientOnly>
                    <div class="adventurer-hp">
                      <div class="adventurer-hp-data">
                        <Icon
                          class="adventurer-hp-icon"
                          aria-hidden
                          name="fluent:heart-48-filled"
                        />
                        <span class="adventurer-value adventurer-hp-value">
                          {{ enemy.currentHP }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="adventurer-ac">
                    <Icon
                      class="adventurer-ac-icon"
                      aria-hidden
                      name="fluent:shield-48-filled"
                    />
                    <span class="adventurer-value">{{ enemy.AC }}</span>
                  </div>
                  <div class="adventurer-options">
                    <button>
                      <Icon name="uil:ellipsis-v" />
                      <span class="sr-only">Options</span>
                    </button>
                  </div>
                </div>
                <div class="enemy-left-bottom">
                  <p
                    v-for="save in enemy.saves"
                    :key="save.name"
                    class="enemy-save"
                  >
                    <span
                      class="enemy-save-label roll-underline decoration-text-evil/30"
                      >{{ save.name }}
                    </span>
                    <!-- <span class="enemy-save-value">{{ save.value }}</span> -->
                  </p>
                </div>
                <div class="enemy-right-bottom">
                  <div class="adventurer-res-imm">
                    <div class="adventurer-res">
                      <Icon
                        class="adventurer-resistance"
                        name="mdi:circle-half"
                        :style="{ color: '#8b4513' }"
                      />
                      <Icon
                        class="adventurer-resistance"
                        name="mdi:circle-half"
                        :style="{ color: '#d2d9e1' }"
                      />
                      <Icon
                        class="adventurer-resistance"
                        name="mdi:circle-half"
                        :style="{ color: '#b19298' }"
                      />
                    </div>
                    <div class="adventurer-con-imm">
                      <div class="diagonal-line" />
                      <Icon
                        class="adventurer-resistance"
                        name="mdi:sleep"
                        :style="{ color: '#5400ff' }"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="enemy-actions">
                <!-- <p class="actions-container">
                <span class="actions-group font-bold italic">Actions. </span>
                <span class="actions">
                  <span class="action">Multiattack</span>,
                  <span class="action">Halberd</span>
                </span>
              </p>
              <p class="actions-container">
                <span class="font-bold italic">Bonus Actions. </span>
                <span class="actions">
                  <span class="action">Rage</span>,
                  <span class="action">Frenzy (while raging)</span>
                </span>
              </p> -->
                <p class="actions-container pt-[4px]">
                  <Icon
                    name="mdi:checkbox-blank-circle-outline"
                    class="mb-[4px]"
                  />
                  <span class="font-bold italic">Reactions: </span>
                  <span class="actions">
                    <span class="action">Retailation</span>
                  </span>
                </p>
              </div>
            </div>
            <div
              v-for="(adventurer, index) in adventurers"
              :key="adventurer.name"
              class="adventurer"
              :class="index === 1 ? 'adventurer-turn' : ''"
            >
              <img
                class="adventurer-image"
                :src="`images/presentation/${adventurer.image}`"
              />
              <span class="adventurer-name">{{ adventurer.name }}</span>
              <div class="adventurer-ac">
                <Icon
                  class="adventurer-ac-icon"
                  aria-hidden
                  name="fluent:shield-48-filled"
                />
                <span class="adventurer-value">{{ adventurer.AC }}</span>
              </div>
              <div class="adventurer-options">
                <button>
                  <Icon name="uil:ellipsis-v" />
                  <span class="sr-only">Options</span>
                </button>
              </div>
            </div>
          </div>
          <div class="statblock">
            <MonsterStatBlock :columns="1" />
          </div>
        </div>
        <div class="combatmanager-2">
          <div class="combatmanager-container mt-8 p-1">
            <div class="combatmanager-gradient" />
            <div class="combatmanager">
              <div
                v-for="enemy in enemies"
                :key="enemy.name"
                class="enemy adventurer-turn enemy-selected"
              >
                <div class="enemy-stats">
                  <div class="enemy-left-top">
                    <img
                      class="enemy-image"
                      :src="`images/presentation/${enemy.image}`"
                    />
                    <span class="adventurer-name">{{ enemy.name }}</span>
                  </div>
                  <div class="enemy-right-top">
                    <div class="adventurer-hp-container">
                      <ClientOnly>
                        <div
                          class="adventurer-hp-bar"
                          :style="getHealthBarCss(enemy.currentHP, enemy.HP)"
                        />
                        <template #fallback>
                          <div
                            class="adventurer-hp-bar"
                            :style="{
                              width: '100%',
                              backgroundColor: 'hsl(120, 100%, 21%)',
                            }"
                          />
                        </template>
                      </ClientOnly>
                      <div class="adventurer-hp">
                        <div class="adventurer-hp-data">
                          <Icon
                            class="adventurer-hp-icon"
                            aria-hidden
                            name="fluent:heart-48-filled"
                          />
                          <span class="adventurer-value adventurer-hp-value">
                            {{ enemy.currentHP }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div class="adventurer-ac">
                      <Icon
                        class="adventurer-ac-icon"
                        aria-hidden
                        name="fluent:shield-48-filled"
                      />
                      <span class="adventurer-value">{{ enemy.AC }}</span>
                    </div>
                    <div class="adventurer-options">
                      <button>
                        <Icon name="uil:ellipsis-v" />
                        <span class="sr-only">Options</span>
                      </button>
                    </div>
                  </div>
                  <div class="enemy-left-bottom">
                    <p
                      v-for="save in enemy.saves"
                      :key="save.name"
                      class="enemy-save"
                    >
                      <span
                        class="enemy-save-label roll-underline decoration-text-evil/30"
                        >{{ save.name }}
                      </span>
                      <!-- <span class="enemy-save-value">{{ save.value }}</span> -->
                    </p>
                  </div>
                  <div class="enemy-right-bottom">
                    <div class="adventurer-res-imm">
                      <div class="adventurer-res">
                        <Icon
                          class="adventurer-resistance"
                          name="mdi:circle-half"
                          :style="{ color: '#8b4513' }"
                        />
                        <Icon
                          class="adventurer-resistance"
                          name="mdi:circle-half"
                          :style="{ color: '#d2d9e1' }"
                        />
                        <Icon
                          class="adventurer-resistance"
                          name="mdi:circle-half"
                          :style="{ color: '#b19298' }"
                        />
                      </div>
                      <div class="adventurer-con-imm">
                        <div class="diagonal-line" />
                        <Icon
                          class="adventurer-resistance"
                          name="mdi:sleep"
                          :style="{ color: '#5400ff' }"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="enemy-actions pt-[4px]">
                  <p class="actions-container">
                    <Icon
                      name="mdi:checkbox-blank-circle-outline"
                      class="mb-[4px]"
                    />
                    <span class="actions-group font-bold italic"
                      >Actions.
                    </span>
                    <span class="actions">
                      <span class="action">Multiattack</span>,
                      <span class="action">Halberd</span>
                    </span>
                  </p>
                  <p class="actions-container actions-spent">
                    <Icon
                      name="mdi:checkbox-marked-circle-outline"
                      class="mb-[4px]"
                    />
                    <span class="font-bold italic">Bonus Actions. </span>
                    <span class="actions">
                      <span class="action">Rage</span>,
                      <span class="action">Frenzy (while raging)</span>
                    </span>
                  </p>
                  <!-- <p class="actions-container">
                  <Icon
                    name="mdi:checkbox-blank-circle-outline"
                    class="mb-[4px]"
                  />
                  <span class="font-bold italic">Reactions: </span>
                  <span class="actions">
                    <span class="action">Retailation</span>
                  </span>
                </p> -->
                </div>
              </div>
              <div
                v-for="adventurer in adventurers"
                :key="adventurer.name"
                class="adventurer"
              >
                <img
                  class="adventurer-image"
                  :src="`images/presentation/${adventurer.image}`"
                />
                <span class="adventurer-name">{{ adventurer.name }}</span>
                <div class="adventurer-ac">
                  <Icon
                    class="adventurer-ac-icon"
                    aria-hidden
                    name="fluent:shield-48-filled"
                  />
                  <span class="adventurer-value">{{ adventurer.AC }}</span>
                </div>
                <div class="adventurer-options">
                  <button>
                    <Icon name="uil:ellipsis-v" />
                    <span class="sr-only">Options</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="statblock">
              <MonsterStatBlock :columns="1" />
            </div>
          </div>
        </div>
      </div>
      <div class="combatmanager-description">
        <p class="static">
          What's the use of dynamic stat blocks if we can't take full advantage
          of them in combat? The Combat Manager is designed to be opinionated
          and minimalistic: it focuses on providing only the most relevant
          information at any moment, leaving unnecessary stats to the players
          and hiding anything not immediately needed.
        </p>
        <p class="static mt-4">
          Monstershuffler's dynamic stat blocks make it possible to track each
          monster's available actions in real time. For example, during a
          player's turn, the Combat Manager shows only a monster's available
          reactions, giving DMs the option to mitigate attacks. On the monster's
          turn, it displays all actions and abilities they can now use.
        </p>
        <h3 class="static mt-4">Key Features of the Combat Manager:</h3>
        <ul class="static">
          <li class="item-minimalistic">
            <em>Minimalistic Interface</em>: Display only what the DM needs at
            any given moment, leaving character-related details to the players.
          </li>
          <li class="item-resources">
            <em>Optional Resource Tracking</em>: Track used spells, actions, and
            other monster resources. Disable this feature for an even simpler
            experience.
          </li>
          <li class="item-rolls">
            <em>Integrated Dice Rolls</em>: Roll any monster ability, save, or
            damage dice directly within the manager. Get a detailed breakdown of
            damage types included in the total damage dealt.
          </li>
          <li class="item-condition">
            <em>Condition Tracking</em>: Apply conditions to monsters,
            automatically affecting their stats, actions and rolls.
          </li>
          <li class="item-prepare">
            <em>Combat Preparation & Saving</em>: Set up combat in advance with
            enemies, then add player characters as a group when ready to start.
            Save ongoing battles to resume later, preserving initiative
            tracking, resource usage and remaining HP of all monsters.
          </li>
        </ul>
        <p class="static mt-4">
          The Combat Manager doesn't get in your way with unnecessary features,
          while reminding you of the most important information at all times.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const adventurers = [
  {
    name: "Kalo",
    AC: 13,
    image: "kalo.webp",
  },
  {
    name: "Nyx",
    AC: 11,
    image: "nyx.webp",
  },
  {
    name: "Arkantos",
    AC: 20,
    image: "arkantos.webp",
  },
  {
    name: "Loretta",
    AC: 14,
    image: "loretta.webp",
  },
  {
    name: "Chrond",
    AC: 16,
    image: "chrond.webp",
  },
];
const enemies = [
  {
    name: "Johnny Frenzy",
    AC: 15,
    HP: 161,
    currentHP: 101,
    image: "john_frenzy.webp",
    saves: [
      {
        name: "Str",
        value: "+9",
      },
      {
        name: "Dex",
        value: "+0",
      },
      {
        name: "Con",
        value: "+5",
      },
      {
        name: "Int",
        value: "+1",
      },
      {
        name: "Wis",
        value: "-1",
      },
      {
        name: "Cha",
        value: "+0",
      },
    ],
  },
];

const ui = useUiStore();

function getHealthBarCss(currentHealth: number, totalHealth: number) {
  let healthPercentage = currentHealth / totalHealth;
  // Ensure health percentage is between 0 and 1
  healthPercentage = Math.min(1, Math.max(0, healthPercentage));

  // Define HSL colors
  const darkGreen = { h: 120, s: 80, l: 21 }; // Dark green
  const darkRed = { h: 0, s: 90, l: 35 }; // Light red
  const lightGreen = { h: 120, s: 75, l: 66 }; // Light green
  const lightRed = { h: 0, s: 100, l: 56 }; // Dark red

  // Determine base colors based on mode
  const startColor = ui.currentThemeType === "light" ? lightRed : darkRed;
  const endColor = ui.currentThemeType === "light" ? lightGreen : darkGreen;

  // Interpolate HSL values
  const interpolate = (start: number, end: number, percentage: number) =>
    Math.ceil(start + (end - start) * percentage);

  const h = interpolate(startColor.h, endColor.h, healthPercentage);
  const s = interpolate(startColor.s, endColor.s, healthPercentage);
  const l = interpolate(startColor.l, endColor.l, healthPercentage);

  // Convert HSL to a CSS string
  const color = `hsl(${h}, ${s}%, ${l}%)`;

  const healthWidth = `${Math.ceil(healthPercentage * 100)}%`;

  return { width: healthWidth, backgroundColor: color };
}
/**
 * COMBAT MANAGER
 * ==============
 * Players' stats:
 * - AC (must be editable in real time)
 * - Initiative (could be hidden when the game starts)
 *
 * Monsters' stats:
 * - HP (must be editable in real time)
 * - AC (must be editable in real time)
 * - Speed
 * - Resistances, Vulnerabilities, Immunities and Condition Immunities
 * - a button that "disables" it (ex: dead, escaped), moving it out of the initiative order.
 *   don't assume that the monster is dead when their health reaches 0.
 * - currently available actions (reactions, actions, bonus actions,
 *
 *
 *
 *
 * RESISTANCES: colors, half circle
 * IMMUNITIES: colors, full circle with a line through the middle
 * CONDITION IMMUNITIES: colored icons representing the condition
 * VULNERABILITIES: colors, double circle (like the mastercard logo)
 * acid:
 * bludgeoning
 * cold
 * fire
 * force
 * lightning
 * necrotic
 * piercing
 * poison
 * psychic
 * radiant
 * slashing
 * thunder
 */
</script>

<style scoped>
.combatmanager-2 {
  display: none;
}
.item-minimalistic::before {
  content: "🙂";
}
.item-resources::before {
  content: "✅";
}
.item-rolls::before {
  content: "🎲";
}
.item-condition::before {
  content: "🤢";
}
.item-prepare::before {
  content: "💾";
}

/* ---------------------------------- */

.combatmanager-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
      to right,
      transparent 97%,
      theme("colors.background.100")
    ),
    linear-gradient(to bottom, transparent 97%, theme("colors.background.100"));
  z-index: 2;
}
.adventurer {
  display: grid;
  grid-template-columns: min-content 1fr min-content min-content;
  align-items: center;
  max-width: 400px;
  @apply gap-2 rounded bg-inset-200 border border-inset-400 text-text;
}
.enemy {
  display: grid;
  grid-template-rows: 1fr min-content;
  max-width: 400px;
  @apply rounded border border-inset-400 bg-card-evil text-text-evil;
}
.enemy-stats {
  display: grid;
  grid-template-columns: 1fr min-content;
  align-items: stretch;
  min-height: 100%;
}

/* ACTIONS */
.enemy-actions {
  line-height: 0.5;
  @apply border-t border-inset-400 px-1;
}
.actions-container {
  display: flex;
  align-items: center;
  font-family: "ScalaSansOffc", sans-serif;
  line-height: 0.5;
  height: 25px; /* forcing this value temporarily */
  @apply gap-1;
}
.actions-spent {
  opacity: 0.4;
}
.action {
  @apply text-text;
}

/* STATS */

.enemy-left-top {
  display: flex;
  align-items: center;
  @apply gap-2 border-b border-r border-inset-400;
}
.enemy-right-top {
  display: flex;
  align-items: center;
  @apply gap-2  border-b border-inset-400;
}
.enemy-left-bottom {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  align-items: center;
}
.enemy-right-bottom {
  display: flex;
  justify-content: stretch;
  align-items: stretch;
}
.enemy-save {
  text-align: center;
  line-height: 1em;
  font-size: 0.875em;
  font-weight: bold;
  font-family: "MrsEavesSmallCaps", serif;
  white-space: nowrap;
  @apply border-r pt-[2px] border-inset-400;
}
.enemy-save-label {
  text-align: center;
}
.enemy-save-value {
  text-align: center;
  @apply text-text;
}
.adventurer-image,
.enemy-image {
  min-width: 40px;
  max-width: 40px;
  aspect-ratio: 1;
  box-sizing: content-box;
  border-right: 1px solid theme("colors.inset.600");
  border-top-left-radius: 0.25rem;
}
.adventurer-image {
  border-bottom-left-radius: 0.25rem;
}

.adventurer-name {
  font-family: "MrsEavesSmallCaps", serif;
  font-weight: bold;
  letter-spacing: 0.05em;
  line-height: 1em;
}

.adventurer-hp-container {
  position: relative;
  display: grid;
  height: 100%;
  grid-template-rows: 1fr min-content;
  /* background: linear-gradient(
    to top,
    theme("colors.background.0") 12px,
    theme("colors.card-evil") 60%
  ); */
  overflow: hidden;
}
.adventurer-hp {
  position: relative;
  width: 80px;
  height: 100%;
  display: grid;
  place-items: center;
  @apply gap-1 text-text;
}
.adventurer-hp-data {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
  height: 100%;
  @apply gap-1;
}
.adventurer-hp-bar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width 0.7s, background-color 0.7s;
}

.enemy .adventurer-ac-icon {
  @apply text-evil-200;
}

.adventurer-ac {
  width: 40px;
  position: relative;
  display: grid;
  place-items: center;
}
.adventurer-ac-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  aspect-ratio: 1;
  @apply text-inset-400;
}
.adventurer-value {
  font-family: "MrsEavesSmallCaps", serif;
  font-weight: bold;
  font-size: 1.3em;
  line-height: 1em;
  text-align: center;
  z-index: 1;
  @apply text-text;
}

/* ---------------------------------- */

.enemy-main {
  display: grid;
  grid-template-columns: min-content 1fr min-content min-content min-content;
  align-items: center;
  @apply gap-2;
}

.adventurer-res-imm {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  @apply px-1 py-[4px];
}

.adventurer-res,
.adventurer-con-imm {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 4px;
}
.adventurer-resistance {
  position: relative;
  font-size: 13px;
  min-width: 13px;
  min-height: 13px;
  text-align: center;
  line-height: 1em;
  display: inline-block;
  border-radius: 50%;
  @apply bg-white border border-inset-400;
}
.diagonal-line {
  position: absolute;
  content: "";
  top: 50%;
  left: 50%;
  width: 120%; /* Extend beyond the element for diagonal line */
  height: 1px; /* Thickness of the line */
  transform: translate(-50%, -50%) rotate(45deg); /* Rotate to create diagonal */
  transform-origin: center; /* Rotate around the center */
  z-index: 1;
  @apply bg-evil-500;
}

.adventurer-turn {
  outline: 2px solid theme("colors.text-evil");
  border: 0px solid theme("colors.text-evil");
  margin: 1px;
}
/*
.roll-underline {
  text-decoration-line: underline;
  text-decoration-style: wavy;
  text-decoration-thickness: 1px;
  text-decoration-skip-ink: all;
}
*/
/* ---------------------------------- */
/* ---------------------------------- */
/* ---------------------------------- */
/* ---------------------------------- */
/* ---------------------------------- */
.combatmanagers-container {
  max-width: 500px;
  width: 100%;
}
.combatmanagers {
  display: flex;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  overflow: hidden;
}
.combatmanager-container {
  position: relative;
  display: grid;
  grid-template-columns: minmax(90%, 400px) minmax(0, 400px);
  width: 100%;
  max-height: 350px;
  overflow: hidden;
  @apply gap-4;
}
.combatmanager {
  display: flex;
  flex-direction: column;
  @apply gap-2;
}
.statblock {
  flex-shrink: 0;
  width: 400px;
}
.combatmanager-description {
  @apply mt-6;
}

@media (min-width: theme("screens.md")) {
  .combatmanagers-container {
    display: flex;
    max-width: 100%;
    flex-direction: row;
    @apply gap-8;
  }
  .combatmanagers {
    min-width: 450px;
  }
  .combatmanager-description {
    @apply mt-0;
  }
  .combatmanager-2 {
    display: block;
  }
}
</style>
