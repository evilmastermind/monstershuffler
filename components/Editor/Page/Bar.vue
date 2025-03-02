<template>
  <div>
    <div class="lg-max">
      <div class="mx-4">
        <div class="editor-form">
          <div class="fields">
            <MSTour
              pacement="bottom"
              title="Character Groups"
              description="Great Dungeon Masters always prepare their sessions with their player characters in mind. This feature lets you create character groups and switch between them, giving you quick access to their notes, images, and soundtracks."
            >
              <div class="adventurers-button cursor-pointer h-[28.8px]">
                <Icon
                  class="text-text-icon text-xl"
                  name="heroicons:user-group-solid"
                />
              </div>
            </MSTour>
            <!-- <select class="ms-input-style ms-select">
            <option value="campaign_1">My Campaign</option>
            <option value="campaign_2">Another Campaign</option>
            <option value="campaign_3">5.5e Rules</option>
          </select> -->
            <MSTour
              pacement="bottom"
              title="Search"
              description="Find what you need across your notes, note groups, stat blocks, soundtracks, game rules and official or published content (displayed in this order)."
            >
              <div class="search-container">
                <input
                  class="ms-input-style ms-input w-[220px] h-full pl-2 pr-6"
                  :placeholder="$t('search.placeholder')"
                />
                <MSIconButton
                  class="search-button"
                  :label="$t('search.placeholder')"
                  icon="fa6-solid:magnifying-glass"
                />
              </div>
            </MSTour>
            <MSTour
              pacement="bottom"
              title="Note Group Tools"
              description="Each Note Group comes with its own set of options, like the ability to create lists for Game Sessions."
            >
              <div class="tools mx-2 h-[28.8px]">
                <MSIconButton label="" icon="fa6-solid:arrow-rotate-left" />
                <MSIconButton label="" icon="fa6-solid:arrow-rotate-right" />
                <MSIconButton
                  label=""
                  size="18"
                  container-size="16"
                  icon="material-symbols:list-alt-add-rounded"
                />
              </div>
            </MSTour>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.fields {
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
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
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 50px;
  @apply rounded bg-inset-200 border border-inset-400;
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
  line-height: 1rem;
  @apply gap-4 text-text-icon;
}
</style>
