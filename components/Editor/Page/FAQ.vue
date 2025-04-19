<template>
  <div>
    <h2 class="static text-left">Frequently Asked Questions</h2>
    <div class="more-stuff">
      <div class="notes">
        <div class="notes-description">
          <h4 id="faq-ai" class="static">
            What's your take on Artificial Intelligence?
          </h4>
          <p class="static">
            I believe in supporting human creators: storytellers, illustrators,
            game designers, and more. All content shared by the community is
            expected to involve meaningful human input, whether it's fully
            original or created with the help of AI.
          </p>
          <p class="static mt-2">
            That said, AI is an extremely useful tool for generating random
            content or single-use content for game sessions. Many of our tools
            include options to generate such content:
            <b class="static"
              >to inspire, support, but never replace human creators</b
            >.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.notes {
  display: flex;
  flex-direction: column;
  align-items: center;
  @apply gap-2;
}
.note {
  width: 100%;
  max-width: 500px;
  @apply mx-auto rounded border border-inset-300;
}
.notes-description {
  max-width: 500px;
}
.example {
  display: none;
  place-items: center;
  width: 3rem;
  aspect-ratio: 1;
  @apply rounded-xl border-2 border-text-icon text-text bg-inset-500 shadow;
}
.example-icon {
  font-size: 2rem;
}
.more-stuff {
  display: flex;
  flex-direction: column;
  align-items: center;
  @apply gap-6 mt-6;
}
@media (min-width: theme("screens.md")) {
  .notes {
    flex-direction: row;
    @apply gap-8;
  }
  .note {
    max-width: 370px;
    min-width: 370px;
  }
  .notes-description {
    max-width: 600px;
    @apply mt-0;
  }
  .more-stuff {
    @apply gap-6 mt-2;
  }
}
.icon-notebook {
  font-size: 50px;
}
.item-music::before {
  content: "🎶";
}
.item-dice::before {
  content: "🎲";
}
.item-players::before {
  content: "👥";
}
.item-owl::before {
  content: "🦉";
}
.item-floppy::before {
  content: "💾";
}
.item-open::before {
  content: "💚";
}
</style>
