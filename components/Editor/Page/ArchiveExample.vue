<template>
  <div class="archive">
    <div class="archive-list">
      <div class="notes">
        <div class="notes-icons py-2">
          <Icon class="text-text-icon" name="majesticons:note-text-plus" />
          <Icon class="text-text-icon" name="mdi:folder-plus" />
          <Icon class="text-text-icon" name="flowbite:sort-outline" />
        </div>
        <select class="archives ms-input-style ms-select mb-4">
          <option value="campaign_1">Kingdom of Loa</option>
          <option value="campaign_2">Another Campaign</option>
          <option value="campaign_3">5.5e Rules</option>
        </select>
        <p class="note">
          <Icon
            class="note-icon text-neutral-400"
            name="majesticons:note-text"
          />
          <span class="note-title">Customs and Traditions</span>
        </p>
        <p class="note note-selected">
          <Icon class="note-icon text-orange-500" name="bi:file-text-fill" />
          <span class="note-title">God-King Athan Vandran</span>
        </p>
        <p class="note">
          <Icon
            class="note-icon text-neutral-400"
            name="majesticons:note-text"
          />
          <span class="note-title">Heroes of Loa</span>
        </p>
        <p class="note">
          <Icon
            class="note-icon text-neutral-400"
            name="majesticons:note-text"
          />
          <span class="note-title">House Vandran</span>
        </p>
        <p class="note">
          <Icon
            class="note-icon text-slate-500"
            name="game-icons:treasure-map"
          />
          <span class="note-title">Loannesburg</span>
        </p>
        <p class="note">
          <Icon
            class="note-icon text-neutral-400"
            name="majesticons:note-text"
          />
          <span class="note-title">The Founding of Loa</span>
        </p>
        <p class="note">
          <Icon
            class="note-icon text-neutral-400"
            name="majesticons:note-text"
          />
          <span class="note-title">Whispering Isles</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.archives {
  width: 100%;
}
.notes {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 220px;
  @apply gap-0;
}
.notes-icons {
  width: 100%;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  @apply gap-1;
}
.note {
  display: flex;
  align-items: center;
  width: 100%;
  @apply gap-1 p-1;
}
.note-title {
  letter-spacing: 0.5px;
  @apply text-sm;
}
.note-selected {
  @apply bg-evil-100 rounded-sm;
}
</style>
