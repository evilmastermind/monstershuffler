import { components } from "@/types/backend";


type createRandomNpcResponseSchema = components["schemas"]["npcSchemas"]["createRandomNpcResponseSchema"];
export type Character = createRandomNpcResponseSchema["npc"];
export type alignmentModifiers = Character["character"]["alignmentModifiers"];
