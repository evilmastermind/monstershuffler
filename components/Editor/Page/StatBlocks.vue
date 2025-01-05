<template>
  <div>
    <h2 class="static">Stat Blocks</h2>
    <div class="statblocks">
      <div class="statblocks-description">
        <h3 class="static">Old Version</h3>
        The original stat block editor on
        <a href="monstershuffler.com" class="static">monstershuffler.com</a>
        introduced a revolutionary way to dynamically adjust a monster's
        Challenge Rating (CR), letting you create balanced encounters with any
        creature. However, it required users to write mathematical expressions
        to calculate stats, which could be challenging and time-consuming.
        <h3 class="static mt-4">New Version</h3>
        The new stat block editor retains the dynamic CR concept but introduces
        a simpler and more intuitive method. Instead of requiring mathematical
        expressions, users now input the base value they feel is appropriate for
        a monster of a given CR. The editor then uses an average value table for
        D&D monsters to calculate proportional estimates for that stat at other
        CRs. This makes creating balanced stat blocks faster and more
        accessible.
        <h4 class="static">New Features</h4>
        <ul class="static">
          <li>
            Action Variants: Create actions that automatically adjust at
            different CRs. For example, you can design a weaker version of an
            action for lower CRs and a more powerful one for higher CRs.
          </li>
          <li>
            Spell Templates: Spells are now easier to manage. Instead of
            manually creating and assigning spell groups for each level, you can
            use premade spell group templates, simplifying the process
            significantly.
          </li>
          <li>
            Expanded Capabilities: The editor now supports creating not only
            monsters but also races (species), classes, templates, items, and
            legendary actions.
          </li>
        </ul>
        <p class="static">
          This redesigned Stat Block Creator empowers users to build dynamic,
          balanced, and feature-rich creatures and characters for their
          adventures while minimizing the time and effort involved.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
