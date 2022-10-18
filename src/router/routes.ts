// homepage
import Home from "@/views/HomePage.vue";
// TODO: consider lazy-loading these
// const NPCGenerator = () => import('@/views/monsters/NPCGenerator.vue')
import NPCGenerator from "@/views/monsters/NPCGenerator.vue";
import Editor from "@/views/monsters/MonsterEditor.vue";
import YourCreations from "@/views/monsters/YourCreations.vue";
import CommunityCreations from "@/views/monsters/CommunityCreations.vue";

export default [
  {
    path: "/",
    component: Home,
    name: "Home"
  },
  {
    path: "/monsters/generator",
    component: NPCGenerator,
    name: "NPC Generator"
  },
  {
    path: "/monsters/editor",
    component: Editor,
    name: "Monster Editor"
  },
  {
    path: "/monsters/your-creations",
    component: YourCreations,
    name: "Your Creations"
  },
  {
    path: "/monsters/community-creations",
    component: CommunityCreations,
    name: "Community Creations"
  },
];