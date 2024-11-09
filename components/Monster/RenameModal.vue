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
              class="ms-input-style ms-input"
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
              class="ms-input-style ms-input"
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
              class="ms-input-style ms-input"
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
import type { Character, TemporaryRenameManagement } from "@/types";

const e = defineEmits(["close"]);
const character = defineModel({
  type: Object as PropType<Character>,
  required: true,
});

const generator = useGeneratorStore();
const { currentCharacterIndex, characters } = storeToRefs(generator);

const name = ref(character.value.character.name || "");
const surname = ref(character.value.character.surname || "");
const prename = ref(character.value.character.prename || "");
const isLoading = ref(false);

// TODO: fix this after rewriting Polygen
/**
 *
 * The AI should generate the adventure with [Tags] instead of the actual name, and be parsed by our parser.
 * Since:
 * - Polygen is super bugged and I need to remove accents from names to make it work
 * - I'm generating the adventure not from the object sent to the user, which could be tampered with, but from the object saved in the database
 *
 * ... I need to do this both here and when I retrieve the adventure chunks from the database, hoping that the chunks don't contain partial names.
 * It's a terrible workaround, but it's the only way to make it work for now.
 *
 * UPDATE 2024/10/27: This just can't work since the chunks arriving from the AI have partial words, and it's not possible to parse them in real-time.
 */
function rename() {
  isLoading.value = true;

  const c = character.value.character;

  const oldPrenameWithoutAccents = replaceAccentCharacters(c.prename || "");
  const oldNameWithoutAccents = replaceAccentCharacters(c.name);
  const oldSurnameWithoutAccents = replaceAccentCharacters(c.surname || "");

  prename.value = capitalizeFirst(prename.value);
  name.value = capitalizeFirst(name.value);
  surname.value = capitalizeFirst(surname.value);

  if (c.user?.backstory?.string) {
    if (c.prename) {
      c.user.backstory.string =
        // @ts-expect-error - backstory is still not typed
        c.user?.backstory?.string?.replaceAll(
          oldPrenameWithoutAccents,
          prename.value
        );
    }
    c.user.backstory.string =
      // @ts-expect-error - backstory is still not typed
      c.user?.backstory?.string?.replaceAll(oldNameWithoutAccents, name.value);
    if (c.surname) {
      c.user.backstory.string =
        // @ts-expect-error - backstory is still not typed
        c.user?.backstory?.string?.replaceAll(
          oldSurnameWithoutAccents,
          surname.value
        );
    }
  }

  if (c.user?.physicalAppearance) {
    if (c.prename) {
      c.user.physicalAppearance = c.user?.physicalAppearance?.replaceAll(
        oldPrenameWithoutAccents,
        prename.value
      );
    }
    c.user.physicalAppearance = c.user?.physicalAppearance?.replaceAll(
      oldNameWithoutAccents,
      name.value
    );
    if (c.surname) {
      c.user.physicalAppearance = c.user?.physicalAppearance?.replaceAll(
        oldSurnameWithoutAccents,
        surname.value
      );
    }
  }

  c.name = name.value;
  c.surname = surname.value;
  c.prename = prename.value;

  if (!c.user) {
    c.user = {};
  }
  if (!c.user.backstory) {
    c.user.backstory = {};
  }
  c.user.backstory.temporaryRenameManagement = {
    oldPrename: oldNameWithoutAccents,
    oldName: oldNameWithoutAccents,
    oldSurname: oldSurnameWithoutAccents,
    newPrename: prename.value,
    newName: name.value,
    newSurname: surname.value,
  } as TemporaryRenameManagement;

  createStats(character.value);

  isLoading.value = false;
  e("close");
}

// TODO: you wrote the same function in the backend, it should be moved in monstershuffler-shared
function replaceAccentCharacters(input: string) {
  return input.normalize("NFD").replace(/[\u0300-\u036F]/g, "");
}
</script>

<style scoped></style>
