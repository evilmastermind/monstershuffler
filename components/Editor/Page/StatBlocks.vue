<template>
  <div>
    <h2 class="static">Stat Blocks</h2>
    <div class="flex justify-center items-center mt-4">
      <MSSwitchWords v-model="is55e" checked="5.5e" unchecked="5e" />
    </div>
    <div class="statblocks mt-6">
      <div class="statblock">
        <ClientOnly fallback-tag="span" :fallback="$t('loading')">
          <StatBlock :columns="1" />
        </ClientOnly>
      </div>
      <div class="statblocks-description">
        <h3 class="static">Old Version</h3>
        The original stat block editor on
        <a
          href="https://www.monstershuffler.com/monsters/editor.php"
          class="static"
          >monstershuffler.com</a
        >
        introduced a revolutionary way to lower or increase a monster's
        Challenge Rating (CR)... with a tiny minor inconvenience: it required
        users to write mathematical expressions to calculate the stats
        dynamically!
        <h3 class="static mt-5">New Version</h3>
        The new version retains the dynamic CR concept but does all the math for
        you behind the scenes: input the stat you feel is appropriate for the
        base CR of the monster, and let the editor do the rest.
        <h3 class="static mt-5">New Features:</h3>
        <ul class="static">
          <li class="item-speed">
            <em>Improved user experience</em>: Automatic saves, simplified UI,
            automatic conversion of text into variables, and more. Creating a
            monster will be much <em class="static">faster</em> and
            <em class="static">easier</em>.
          </li>
          <li class="item-variants">
            <em>Action Variants</em>: Create actions that automatically adjust
            at different CRs. For example, you can design a weaker version of an
            action for lower CRs and a more powerful one for higher CRs.
          </li>
          <li class="item-spells">
            <em>Spell Templates and Spell Slots</em>: use premade spell group
            templates to create spellcasting monsters faster. The editor will
            now also support spell slots, one of the most requested features by
            users.
          </li>
          <li class="item-muscle">
            <em>Expanded Capabilities</em>: The editor now supports creating not
            only monsters, species (races), classes, templates, and backgrounds,
            but also <em>spells, items, traps and lair actions</em>!
          </li>
        </ul>
        <p class="static mt-6">
          <EditorPageAction>
            You can try the old version of the stat block editor on
            <a
              class="static"
              href="https://www.monstershuffler.com/monsters/editor.php"
            >
              Monstershuffler.com</a
            >. Consider it a clunky prototype of the new version.
          </EditorPageAction>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const user = useUserStore();
const is55e = ref(user.settings.statBlocks === "5.5e");

watch(is55e, (newValue) => {
  user.settings.statBlocks = newValue ? "5.5e" : "5e";
});
</script>

<style scoped>
.statblock {
  max-width: 500px;
  width: 100%;
  @apply mx-auto;
}
.statblocks-description {
  max-width: 500px;
  @apply mt-6;
}
@media (min-width: theme("screens.md")) {
  .statblocks {
    display: grid;
    grid-template-columns: min-content 1fr;
    align-items: flex-start;
    @apply gap-8;
  }
  .statblock {
    width: 500px;
  }
  .statblocks-description {
    @apply mt-0;
  }
}
.item-speed::before {
  content: "🚀";
}
.item-variants::before {
  content: "📈";
}
.item-spells::before {
  content: "🧙";
}
.item-muscle::before {
  content: "💪";
}
</style>
