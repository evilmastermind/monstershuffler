<template>
  <div
    class="relative flex flex-nowrap overflow-x-auto noscrollbar border-r-3 border-r-accented py-6"
    ref="scroller"
    @mousedown="startDrag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
    @mousemove="onDrag"
    @touchstart.prevent="startDrag"
    @touchend="endDrag"
    @touchmove.prevent="onDrag"
  >
    <div class="absolute top-[-40px] to-[5px] z-10" />
    <div
      v-for="post in posts"
      :key="post.id"
      class="noselect min-w-[200px] md:min-w-[250px] cursor-pointer rounded overflow-hidden border border-accented shadow-md hover:shadow-lg hover:border-primary/30 mr-4"
      @click="() => navigateTo(`/news/${post.slug}`)"
    >
      <div
        class="relative aspect-square"
        :style="{
          backgroundImage: `url(${post.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }"
      >
        <div class="absolute bottom-0 left-0 p-4">
          <UBadge
            size="sm"
            variant="solid"
            color="neutral"
            v-for="tag in post.tags"
            :key="tag"
            class="mr-2"
          >
            {{ tag }}
          </UBadge>
        </div>
      </div>
      <div class="w-full px-4 pt-2 pb-4">
        <TH4 class="mt-2">
          {{ post.title }}
        </TH4>
        <p class="text-xs text-muted w-full truncate mt-1">
          {{ post.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { data: posts } = await useAsyncData(`content`, () => {
  return queryCollection("news").order("date", "DESC").limit(15).all();
});

const scroller = ref<HTMLElement | null>(null);
const isDown = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);

function startDrag(e: MouseEvent | TouchEvent) {
  isDown.value = true;
  scroller.value!.classList.add("cursor-grabbing");
  const pageX = "touches" in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
  startX.value = pageX - scroller.value!.offsetLeft;
  scrollLeft.value = scroller.value!.scrollLeft;
}

function endDrag() {
  isDown.value = false;
  scroller.value!.classList.remove("cursor-grabbing");
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDown.value) return;
  const pageX = "touches" in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
  const x = pageX - scroller.value!.offsetLeft;
  const walk = (x - startX.value) * 1; // scroll-fast factor
  scroller.value!.scrollLeft = scrollLeft.value - walk;
}

function scrollBy(direction: -1 | 1) {
  scroller.value!.scrollBy({
    left: direction * scroller.value!.clientWidth * 0.8,
    behavior: "smooth",
  });
}

function goTo(url: string) {
  window.location.href = url;
}
</script>

<style scoped></style>
