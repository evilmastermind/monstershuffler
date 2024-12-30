<template>
  <div class="lg-max">
    <div class="mx-4">
      <form class="editor-form">
        <fieldset class="fields">
          <select class="ms-input-style ms-select">
            <option value="campaign_1">My Campaign</option>
            <option value="campaign_2">Another Campaign</option>
            <option value="campaign_3">5.5e Rules</option>
          </select>
          <div class="search-container">
            <input
              class="ms-input-style ms-input pl-2 pr-6"
              :placeholder="$t('search.placeholder')"
            />
            <MSIconButton
              class="search-button"
              :label="$t('search.placeholder')"
              icon="fa6-solid:magnifying-glass"
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
</style>
