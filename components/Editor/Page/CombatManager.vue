<template>
  <div>
    <div class="combatmanager-description">
      <h2 class="static">Combat Manager</h2>
      <p class="static">
        What's the use of dynamic stat blocks if we can't take full advantage of
        them in combat? The Combat Manager is designed to be opinionated and
        minimalistic: it focuses on providing only the most relevant information
        at any moment, leaving unnecessary stats to the players and hiding
        anything not immediately needed.
      </p>
      <p class="static">
        Monstershuffler's dynamic stat blocks make it possible to track each
        monster's available actions in real time. For example, during a player's
        turn, the Combat Manager shows only a monster's available reactions,
        giving DMs the option to mitigate attacks. On the monster's turn, it
        displays all actions and abilities they can now use, streamlining
        decision-making.
      </p>
      <h3 class="static mt-4">Key Features of the Combat Manager:</h3>
      <ul class="static">
        <li>
          <em>Minimalistic Interface</em>: Display only what the DM needs at any
          given moment, leaving character-related details to the players.
        </li>
        <li>
          <em>Optional Resource Tracking</em>: Track used spells, actions, and
          other monster resources. Disable this feature for an even simpler
          experience.
        </li>
        <li>
          <em>Integrated Dice Rolls</em>: Roll any monster ability, save, or
          damage dice directly within the manager. Get a detailed breakdown of
          damage types included in the total damage dealt.
        </li>
        <li>
          <em>Condition Tracking</em>: Apply conditions to monsters,
          automatically affecting their stats, actions and rolls.
        </li>
        <li>
          <em>Combat Preparation & Saving</em>: Set up combat in advance with
          enemies, then add player characters as a group when ready to start.
          Save ongoing battles to resume later, preserving initiative tracking,
          resource usage and remaining HP of all monsters.
        </li>
      </ul>
      <p class="static mt-4">
        The Combat Manager transforms encounters into a smoother, more intuitive
        experience while keeping the Dungeon Master in control.
      </p>
    </div>
    <div class="combatmanager-container mt-6">
      <div class="combatmanager">
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
              name="bitcoin-icons:shield-filled"
            />
            <span class="adventurer-ac-value">{{ adventurer.AC }}</span>
          </div>
          <div class="adventurer-options">
            <button>
              <Icon name="uil:ellipsis-v" />
              <span class="sr-only">Options</span>
            </button>
          </div>
        </div>
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
    name: "Barbed Devil",
    AC: 15,
    HP: 110,
    currentHP: 87,
  },
];
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
.combatmanager {
  display: flex;
  flex-direction: column;
  @apply gap-2;
}
.adventurer {
  display: grid;
  grid-template-columns: min-content 1fr min-content min-content;
  align-items: center;
  max-width: 400px;
  border: 1px solid theme("colors.inset.400");
  background-color: theme("colors.inset.200");
  overflow: hidden;
  @apply gap-2 rounded;
}
.adventurer-image {
  min-width: 40px;
  max-width: 40px;
  aspect-ratio: 1;
  box-sizing: content-box;
  border-right: 1px solid theme("colors.inset.400");
  @apply rounded;
}
.adventurer-name {
  font-family: "MrsEavesSmallCaps", serif;
  font-weight: bold;
  letter-spacing: 0.05em;
  line-height: 1em;
  @apply text-text;
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
  font-size: 50px;
  aspect-ratio: 1;
  @apply text-inset-400;
}
.adventurer-ac-value {
  font-family: "MrsEavesSmallCaps", serif;
  font-weight: bold;
  font-size: 1.3em;
  line-height: 1em;
  text-align: center;
  z-index: 1;
  @apply text-text;
}
</style>
