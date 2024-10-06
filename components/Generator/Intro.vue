<template>
  <div>
    <ul class="card-list">
      <li class="card">
        <Icon aria-hidden class="card-icon" name="streamline:input-box-solid" />
        <p class="card-text">
          Select the right options for your adventure, and click
          <b>Generate</b>
        </p>
      </li>
      <li class="card">
        <Icon
          aria-hidden
          class="card-icon rotate-45"
          name="icon-park-solid:more-four"
        />
        <p class="card-text">Pick one of the four NPCs generated</p>
      </li>
      <li class="card">
        <Icon
          aria-hidden
          class="card-icon -rotate-45"
          name="line-md:arrows-horizontal"
        />
        <p class="card-text">
          Increase or decrease the CR of the NPC, or edit its backstory
        </p>
      </li>
      <li class="card">
        <Icon aria-hidden class="card-icon" name="mdi:recycle" />
        <p class="card-text">Don't like it? Trash it and generate a new one!</p>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const boolean = ref(false);
</script>

<style scoped>
.card-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: theme("screens.md")) {
  .card-list {
    grid-template-columns: 1fr 1fr;
  }
}
.card {
  min-height: 100%;
  border-radius: theme("spacing.1");
  background-color: theme("colors.background-inset.400");
  border-top: 1px solid theme("colors.background-inset.700");
  border-left: 1px solid theme("colors.background-inset.700");
  border-right: 1px solid theme("colors.background-inset.700");
  border-bottom: 1px solid theme("colors.background-inset.600");
  box-shadow: inset 0px 6px 5px theme("colors.background-inset.500");
  color: theme("colors.text");
  transition: outline 0.2s ease, border-color 0.2s ease;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20%;
  @apply bg-background-card p-6 rounded-xl outline-transparent;
}
.card:hover {
  outline-style: auto;
  outline-width: 1px;
  @apply outline-evil-600 border-evil-600;
}
.card-icon {
  min-width: 2.5rem;
  max-width: 2.5rem;
  font-size: 2.5rem;
  transition: transform 0.2s ease, color 0.2s ease;
  @apply text-evil-700;
}
.card:hover .card-icon {
  transform: scale(1.1);
  @apply text-evil-500;
}
.card-text {
  letter-spacing: 0.05em;
  @apply text-sm;
}
</style>
