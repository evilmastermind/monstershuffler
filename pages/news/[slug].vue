<template>
  <UContainer>
    <UBreadcrumb :items class="my-4" />
    <div v-if="post" class="max-w-2xl mx-auto mt-12">
      <p
        class="text-sm text-muted tracking-wider text-center w-full uppercase mb-4"
      >
        {{ $t("news.title") }}
      </p>
      <TH1>{{ post.title }}</TH1>
      <p class="text-sm text-muted tracking-wider w-full mb-4 mt-10 md:mt-16">
        {{ post.author }} —
        {{
          new Date(post.date).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        }}
      </p>
      <ContentRenderer v-if="post" :value="post" class="news" />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
import type { BreadcrumbItem } from "@nuxt/ui";
import { useRoute } from "vue-router";

const slug = useRoute().params.slug;

const { data: post } = await useAsyncData(`news-${slug}`, () => {
  return queryCollection("news").path(`/news/${slug}`).first();
});

const items = ref<BreadcrumbItem[]>([
  {
    label: "Home",
    to: "/",
  },
  {
    label: post.value?.title,
  },
]);
</script>

<style>
.news p {
  margin-bottom: calc(var(--spacing) * 5);
}
.news a {
  font-weight: 500;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-decoration-color: var(--ui-text-muted);
}
.news img {
  border-radius: var(--radius-md);
}
</style>
