import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    news: defineCollection({
      type: "page",
      source: "news/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        author: z.string(),
        date: z.string(),
        slug: z.string(),
        tags: z.array(
          z.enum(["news", "feature", "update", "announcement", "blog"]),
        ),
        image: z.string(),
      }),
    }),
  },
});
