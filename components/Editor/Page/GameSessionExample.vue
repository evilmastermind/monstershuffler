<template>
  <div class="lg-max">
    <div class="mx-4">
      <!--<form class="editor-form">
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
      </form> -->
      <div class="content mt-2">
        <div class="adventurers">
          <!-- <div class="adventurers-button">
            <Icon
              class="text-text-icon text-xl"
              name="heroicons:user-group-solid"
            />
          </div> -->
          <div
            v-for="adventurer in adventurers"
            :key="adventurer.name"
            class="adventurer"
          >
            <img
              class="adventurer-image"
              :src="`images/presentation/${adventurer.image}`"
            />
            <span class="adventurer-name">{{ adventurer.name }}</span>
          </div>
        </div>
        <div>
          <div class="list">
            <div class="list-header px-2">
              <h3 class="list-name">Secrets</h3>
              <div class="list-icons">
                <Icon class="text-text-icon text-lg" name="line-md:plus" />
                <Icon
                  class="text-text-icon text-lg"
                  name="mi:options-vertical"
                />
              </div>
            </div>
            <div class="list-notes">
              <p class="list-note">
                <Icon
                  class="list-checkbox text-text-icon text-lg"
                  name="fluent:checkbox-unchecked-24-regular"
                />
                <span class="list-text"
                  >Kalo's doppleganger is on the move</span
                >
              </p>
              <p class="list-note">
                <Icon
                  class="list-checkbox text-text-icon text-lg"
                  name="fluent:checkbox-checked-24-filled"
                />
                <span class="list-text"
                  >The new cult is already in Ridgewood</span
                >
              </p>
              <p class="list-note">
                <Icon
                  class="list-checkbox text-text-icon text-lg"
                  name="fluent:checkbox-unchecked-24-regular"
                />
                <span class="list-text">Athan Vandran is alive</span>
              </p>
              <p class="list-note">
                <Icon
                  class="list-checkbox text-text-icon text-lg"
                  name="fluent:checkbox-unchecked-24-regular"
                />
                <span class="list-text"
                  >Chrond's mother lives in Ridgewood</span
                >
              </p>
              <p class="list-note">
                <Icon
                  class="list-checkbox text-text-icon text-lg"
                  name="fluent:checkbox-unchecked-24-regular"
                />
                <span class="list-text"
                  >Loretta's familiar is stronger than she is</span
                >
              </p>
            </div>
          </div>
          <div class="list mt-2">
            <div class="list-header">
              <h3 class="list-name">Scenes</h3>
              <div class="list-icons">
                <Icon class="text-text-icon text-lg" name="line-md:plus" />
                <Icon
                  class="text-text-icon text-lg"
                  name="mi:options-vertical"
                />
              </div>
            </div>
            <div class="list-notes">
              <p class="list-note">
                <Icon
                  class="note-icon text-neutral-400"
                  name="majesticons:note-text"
                />
                <span class="list-text">Trouble at the Market</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-neutral-400"
                  name="majesticons:note-text"
                />
                <span class="list-text"
                  >The King's Army arrives in Ridgewood</span
                >
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-neutral-400"
                  name="majesticons:note-text"
                />
                <span class="list-text">The Preacher of Ghaunadaur</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-neutral-400"
                  name="majesticons:note-text"
                />
                <span class="list-text">The Other Adventurers</span>
              </p>
            </div>
          </div>
          <div class="list mt-2">
            <div class="list-header">
              <h3 class="list-name">Locations</h3>
              <div class="list-icons">
                <Icon class="text-text-icon text-lg" name="line-md:plus" />
                <Icon
                  class="text-text-icon text-lg"
                  name="mi:options-vertical"
                />
              </div>
            </div>
            <div class="list-notes">
              <p class="list-note">
                <Icon
                  class="note-icon text-slate-500"
                  name="game-icons:treasure-map"
                />
                <span class="list-text">Loannesburg</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-slate-500"
                  name="game-icons:treasure-map"
                />
                <span class="list-text">Olak's Hideout</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-neutral-400"
                  name="majesticons:note-text"
                />
                <span class="list-text">The Old Shrine</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-neutral-400"
                  name="majesticons:note-text"
                />
                <span class="list-text">Tom's Farm</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-slate-500"
                  name="game-icons:treasure-map"
                />
                <span class="list-text">Ridgewood</span>
              </p>
            </div>
          </div>
        </div>
        <div>
          <MSNote class="note rounded shadow">
            <ClientOnly>
              <EditorText :backstory />
            </ClientOnly>
          </MSNote>
        </div>
        <div>
          <div class="list">
            <div class="list-header">
              <h3 class="list-name">NPCs</h3>
              <div class="list-icons">
                <Icon class="text-text-icon text-lg" name="line-md:plus" />
                <Icon
                  class="text-text-icon text-lg"
                  name="mi:options-vertical"
                />
              </div>
            </div>
            <div class="list-notes">
              <p class="list-note">
                <Icon
                  class="note-icon text-orange-500"
                  name="bi:file-text-fill"
                />
                <span class="list-text">Mizette The Preacher</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-orange-500"
                  name="bi:file-text-fill"
                />
                <span class="list-text">King Athan Vandran</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-neutral-400"
                  name="majesticons:note-text"
                />
                <span class="list-text">Tom the Farmer</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-orange-500"
                  name="bi:file-text-fill"
                />
                <span class="list-text">Rishika Blackfeather</span>
              </p>
            </div>
          </div>
          <div class="list mt-2">
            <div class="list-header">
              <h3 class="list-name">Rewards</h3>
              <div class="list-icons">
                <Icon class="text-text-icon text-lg" name="line-md:plus" />
                <Icon
                  class="text-text-icon text-lg"
                  name="mi:options-vertical"
                />
              </div>
            </div>
            <div class="list-notes">
              <p class="list-note">
                <Icon
                  class="note-icon text-rose-400"
                  name="fa6-solid:sack-dollar"
                />
                <span class="list-text">Staff of the Preacher</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-rose-400"
                  name="fa6-solid:sack-dollar"
                />
                <span class="list-text">Artifact of Ghaunadaur</span>
              </p>
              <p class="list-note">
                <Icon
                  class="note-icon text-rose-400"
                  name="fa6-solid:sack-dollar"
                />
                <span class="list-text">Sword of Loa</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const adventurers = [
  {
    name: "Kalo",
    image: "kalo.webp",
  },
  {
    name: "Nyx",
    image: "nyx.webp",
  },
  {
    name: "Arkantos",
    image: "arkantos.webp",
  },
  {
    name: "Loretta",
    image: "loretta.webp",
  },
  {
    name: "Chrond",
    image: "chrond.webp",
  },
];

provide(
  "moral",
  computed(() => "evil")
);
const backstory = ref(
  `## 2025/06/12 - Heading to Ridgewood \n\n
> The adventurers have been traveling for weeks, following the trail of the mysterious cult that has been terrorizing the countryside. They have finally arrived at the town of Ridgewood, where they hope to find the cult's leader and put an end to their evil deeds. \n\n
### Introduction\n\n
The town of Ridgewood is a small, quiet village nestled in the foothills of the mountains. It is surrounded by dense forests and rolling hills, making it an ideal location for those seeking solitude and peace. The townspeople are friendly and welcoming, always ready to lend a helping hand to those in need. \n\n
- ==here they may encounter the King's Army== \n\n
### The Market\n\n
The adventurers arrive in Ridgewood just as the weekly market is getting underway. The market is a bustling hub of activity, with vendors selling all manner of goods and wares. The adventurers take the opportunity to stock up on supplies and gather information about the cult's activities in the area. \n\n
- ==here they may encounter the Preacher of Ghaunadaur== \n\n
- ==here they may encounter Chrond's mother== \n\n
#### Rumors of the Shrine\n\n
The townspeople whisper of an ancient shrine hidden deep in the forest, said to be the resting place of a powerful artifact. The adventurers are intrigued by the rumors and decide to investigate further. \n\n
### The Old Shrine\n\n
The adventurers make their way through the dense forest, following the directions given to them by the townspeople. After several hours of hiking, they come upon the ancient shrine, its crumbling walls covered in moss and ivy. \n\n
- ==here they may encounter the Other Adventurers== \n\n
#### The Hidden Chamber\n\n
The adventurers explore the shrine, searching for the hidden chamber rumored to contain the artifact. After much searching, they finally discover a hidden door concealed behind a tapestry. With bated breath, they push open the door and step into the darkness beyond. \n\n

  `
);
</script>

<style scoped>
/* LISTS */
.list {
  height: min-content;
  width: 220px;
  border: 1px solid theme("colors.inset.400");
  background-color: theme("colors.inset.200");
  @apply rounded;
}
.list-button {
  width: 100%;
}
.list-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @apply pl-2 pr-1 py-2;
}
.list-icons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
}
.list-name {
  font-family: "MrsEavesSmallCaps", serif;
  font-size: 1.2rem;
  font-weight: bold;
  letter-spacing: 0.05em;
  line-height: 1em;
  @apply text-text-evil;
}
.list-notes {
  display: flex;
  flex-direction: column;
}
.list-note {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  border-top: 1px solid theme("colors.inset.400");
  @apply px-2 py-2 gap-2;
}
.list-checkbox,
.note-icon {
  font-size: 1rem;
  min-width: 1rem;
  max-width: 1rem;
}
.list-text {
  font-size: 0.875rem;
  line-height: 1rem;
  letter-spacing: 0.05em;
}
/* BAR */
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
/* ADVENTURERS */
.adventurers-button {
  display: grid;
  place-items: center;
  background-color: theme("colors.inset.200");
  border: 1px solid theme("colors.inset.400");
  min-width: 50px;
  padding: 7px 0px 7px 0px;
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
/* NOTE */
.note {
  padding: 2rem 4rem;
}
</style>
