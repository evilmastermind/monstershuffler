<template>
  <div
    class="relative flex flex-nowrap overflow-x-auto noscrollbar border-r-3 border-r-accented py-6"
    ref="scroller"
    @mousedown="startDrag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
    @mousemove="onDrag"
    @touchstart="startDrag"
    @touchend="endDrag"
    @touchmove.prevent="onDrag"
  >
    <div class="absolute top-[-40px] to-[5px] z-10" />
    <div
      v-for="post in posts"
      :key="post.id"
      class="noselect min-w-[200px] md:min-w-[250px] cursor-pointer rounded overflow-hidden border border-accented shadow-md hover:shadow-lg hover:border-primary/30 mr-4"
      @click="goTo(post.slug)"
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
const isDragging = ref(false);
const dragThreshold = 5;
let dragStartY = 0;

function startDrag(e: MouseEvent | TouchEvent) {
  isDown.value = true;
  isDragging.value = false;

  const pageX = "touches" in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
  const pageY = "touches" in e ? e.touches[0].pageY : (e as MouseEvent).pageY;

  dragStartY = pageY;
  startX.value = pageX - scroller.value!.offsetLeft;
  scrollLeft.value = scroller.value!.scrollLeft;
  scroller.value!.classList.add("cursor-grabbing");
}

function endDrag() {
  isDown.value = false;
  setTimeout(() => {
    isDragging.value = false;
  }, 50); // let click happen if it was a tap
  scroller.value!.classList.remove("cursor-grabbing");
}

function onDrag(e: MouseEvent | TouchEvent) {
  if (!isDown.value) return;

  const pageX = "touches" in e ? e.touches[0].pageX : (e as MouseEvent).pageX;
  const pageY = "touches" in e ? e.touches[0].pageY : (e as MouseEvent).pageY;

  const deltaY = Math.abs(pageY - dragStartY);
  const deltaX = Math.abs(pageX - startX.value - scroller.value!.offsetLeft);

  if (deltaX > dragThreshold || deltaY > dragThreshold) {
    isDragging.value = true;
  }

  const x = pageX - scroller.value!.offsetLeft;
  const walk = (x - startX.value) * 1;
  scroller.value!.scrollLeft = scrollLeft.value - walk;
}
function scrollBy(direction: -1 | 1) {
  scroller.value!.scrollBy({
    left: direction * scroller.value!.clientWidth * 0.8,
    behavior: "smooth",
  });
}

function goTo(url: string) {
  if (!isDragging.value) {
    navigateTo(`/news/${url}`);
  }
}
</script>

<style scoped></style>
