<template>
  <div class="lg-max">
    <div class="mx-4">
      <form class="editor-form">
        <fieldset class="fields">
          <div class="adventurers-button">
            <Icon
              class="text-text-icon text-xl"
              name="heroicons:user-group-solid"
            />
          </div>
          <!-- <select class="ms-input-style ms-select">
            <option value="campaign_1">My Campaign</option>
            <option value="campaign_2">Another Campaign</option>
            <option value="campaign_3">5.5e Rules</option>
          </select> -->
          <div class="search-container">
            <input
              class="ms-input-style ms-input w-[400px] h-full pl-2 pr-6"
              :placeholder="$t('search.placeholder')"
            />
            <MSIconButton
              class="search-button"
              :label="$t('search.placeholder')"
              icon="fa6-solid:magnifying-glass"
            />
          </div>
          <div class="tools py-2 px-3">
            <MSIconButton
              :label="$t('placeholder')"
              icon="fa6-solid:arrow-rotate-left"
            />
            <MSIconButton
              :label="$t('placeholder')"
              icon="fa6-solid:arrow-rotate-right"
            />
            <MSIconButton
              :label="$t('placeholder')"
              size="18"
              container-size="16"
              icon="material-symbols:list-alt-add-rounded"
            />
          </div>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.fields {
  display: flex;
  justify-content: space-between;
  align-items: center;
  @apply gap-2;
}
.search-container {
  position: relative;
}
.search-button {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 1;
  @apply text-primary-700 pr-2;
}
/* ADVENTURERS */
.adventurers-button {
  display: grid;
  place-items: center;
  background-color: theme("colors.inset.200");
  border: 1px solid theme("colors.inset.400");
  min-width: 50px;
  @apply rounded;
}
.adventurers {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @apply gap-2;
}
.adventurer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 50px;
  border: 1px solid theme("colors.inset.400");
  overflow: hidden;
  gap: 2px;
  padding-bottom: 2px;
  @apply rounded bg-text;
}
.adventurer-image {
  width: 50px;
  aspect-ratio: 1 / 1;
  background-color: theme("colors.inset.200");
  overflow: hidden;
}
.adventurer-name {
  max-width: 100%;
  text-align: center;
  font-size: 0.75rem;
  line-height: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 2px;
  @apply text-text-inverse;
}
/* CONTENT */
.content {
  display: flex;
  @apply gap-2;
}
.tools {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 1rem;
  line-height: 1rem;
  @apply bg-background-300 text-text-icon  gap-4;
}
</style>
