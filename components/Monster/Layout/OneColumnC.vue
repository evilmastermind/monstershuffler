<template>
  <div class="layout-container">
    <div class="layout padding-bottom">
      <div>
        <MonsterImages class="image" />
        <MonsterBackstory
          class="story padding-right padding-left"
          :style="{
            paddingTop: '500px',
          }"
        />
      </div>
      <div class="stats">
        <MonsterStatBlock />
        <div class="card my-4">
          <MonsterSheetCard>
            <MonsterRoleplayStats />
          </MonsterSheetCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}
.stats {
  @apply px-4 pt-4;
}
.padding-right {
  @apply pr-4;
}
.padding-left {
  @apply pl-4;
}
.padding-top {
  @apply pt-4;
}
.padding-bottom {
  @apply pb-4;
}
@media (min-width: 750px) {
  .layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

@media (min-width: theme("screens.sm")) {
  .padding-right {
    padding-right: 12%;
  }
  .padding-left {
    padding-left: 12%;
  }
  .padding-bottom {
    padding-bottom: 6%;
  }
  .padding-top {
    padding-top: 12%;
  }
  .stats {
    padding-top: 6%;
    padding-right: 6%;
    padding-left: 6%;
  }
}

.card {
  display: grid;
  place-items: center;
  break-inside: avoid;
}

.image {
  position: absolute;
  top: 0px;
  left: 0px;
}
</style>
