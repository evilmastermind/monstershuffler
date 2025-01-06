<template>
  <div>
    <h2 class="static">Stat Blocks</h2>
    <div class="statblocks mt-5">
      <ClientOnly>
        <div class="statblock">
          <MonsterStatBlock :columns="1" />
        </div>
        <div class="statblocks-description">
          <h3 class="static">Old Version</h3>
          The original stat block editor on
          <a href="monstershuffler.com" class="static">monstershuffler.com</a>
          introduced a revolutionary way to dynamically adjust a monster's
          Challenge Rating (CR), enabling users to use any monster in almost any
          adventure while still ensuring balanced encounters. However, it
          required users to write mathematical expressions to calculate stats,
          which could be challenging and time-consuming.
          <h3 class="static mt-4">New Version</h3>
          The new stat block editor retains the dynamic CR concept but
          introduces a simpler and more intuitive method. Instead of requiring
          mathematical expressions, users now input the value they feel is
          appropriate for the base CR. The editor then uses an average value
          table for D&D monsters to calculate proportional estimates for that
          stat at different CRs, doing the math for you behind the scenes. This
          makes creating dynamic stat blocks faster and more accessible.
          <h3 class="static mt-4">New Features:</h3>
          <ul class="static">
            <li>
              A streamlined user experience (automatic saves, simplified UI, and
              more). Creating a monster will be much
              <em class="static">faster</em> and <em class="static">easier</em>.
            </li>
            <li>
              <em>Action Variants</em>: Create actions that automatically adjust
              at different CRs. For example, you can design a weaker version of
              an action for lower CRs and a more powerful one for higher CRs.
            </li>
            <li>
              <em>Spell Templates and Spell Slots</em>: Spells are now easier to
              manage. Instead of manually creating and assigning spell groups
              for each level, you can use premade spell group templates,
              simplifying the process significantly.
            </li>
            <li>
              <em>Expanded Capabilities</em>: The editor now supports creating
              not only monsters, species (races), classes, templates, and
              backgrounds, but also <em>items, traps and lair actions</em>.
            </li>
          </ul>
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.statblocks {
  display: grid;
  grid-template-columns: min-content 1fr;
  @apply gap-6;
}
.statblock {
  width: 500px;
}
@media (min-width: theme("screens.md")) {
  .statblock {
    width: 500px;
  }
}
</style>
