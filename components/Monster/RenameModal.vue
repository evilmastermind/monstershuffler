<template>
  <MSModal @close="e('close')">
    <template #title>
      {{ $t(`monsterSheet.renameCharacter`) }}
    </template>
    <template #default>
      <form @submit.prevent="rename">
        <fieldset class="ms-fieldset mt-2">
          <span class="form-line">
            <label class="ms-label" for="monster-prename">
              {{ $t("monsterSheet.prename") }}:
            </label>
            <input
              id="monster-prename"
              v-model="prename"
              type="text"
              minlength="2"
              :required="false"
              class="ms-input"
            />
          </span>
          <span class="form-line">
            <label class="ms-label" for="monster-name">
              {{ $t("monsterSheet.name") }}:
            </label>
            <input
              id="monster-name"
              v-model="name"
              type="text"
              minlength="2"
              class="ms-input"
            />
          </span>
          <span class="form-line">
            <label class="ms-label" for="monster-surname">
              {{ $t("monsterSheet.surname") }}:
            </label>
            <input
              id="monster-surname"
              v-model="surname"
              minlength="2"
              :required="false"
              type="text"
              class="ms-input"
            />
          </span>
          <div>
            <MSButton
              block
              color="primary"
              :text="$t('rename')"
              :loading="isLoading"
            />
            <MSButton
              block
              class="mt-2"
              color="dark"
              type="button"
              :text="$t('cancel')"
              @click="e('close')"
            />
          </div>
        </fieldset>
      </form>
    </template>
  </MSModal>
</template>

<script setup lang="ts">
import { createStats } from "monstershuffler-shared";
import type { Character } from "@/types";

const e = defineEmits(["close"]);
const character = defineModel({
  type: Object as PropType<Character>,
  required: true,
});

const name = ref(character.value.character.name || "");
const surname = ref(character.value.character.surname || "");
const prename = ref(character.value.character.prename || "");
const isLoading = ref(false);

function rename() {
  // isLoading.value = true;
  // const nameWithoutAccents = removeAccents(name.value);
  // const prenameWithoutAccents = removeAccents(prename.value);
  // const surnameWithoutAccents = removeAccents(surname.value);
  // if (character.value.character.user?.backstory?.string) {
  //   character.value.character.user.backstory.string =
  //     character.value.character.user?.backstory?.string?.replaceAll(
  //       character.value.character.name,
  //       name.value
  //     );
  //   if (character.value.character.prename) {
  //     character.value.character.user.backstory.string =
  //       character.value.character.user?.backstory?.string?.replaceAll(
  //         character.value.character.prename,
  //         prename.value
  //       );
  //   }
  //   if (character.value.character.surname) {
  //     character.value.character.user.backstory.string =
  //       character.value.character.user?.backstory?.string?.replaceAll(
  //         character.value.character.surname,
  //         surname.value
  //       );
  //   }
  // }
  /**
   * THIS WON'T WORK WHEN YOU DO IT BEFORE THE ADVENTURE GENERATION:
   * the backend generates the adventure based on the object saved in the database,
   * so that the user can't tamper with it.
   * Make the AI add tags to the adventure.

    character.value.character.name = capitalizeFirst(name.value);
  character.value.character.surname = capitalizeFirst(surname.value);
  character.value.character.prename = capitalizeFirst(prename.value);
  createStats(character.value);

  isLoading.value = false;
  e("close");
  **/
}

function removeAccents(str: string) {
  return str.normalize("NFD").replace(/[\u0300-\u036F]/g, "");
}
</script>

<style scoped></style>
