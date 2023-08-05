import { components } from "@/types/backend";

type createRandomNpcResponseSchema =
  components["schemas"]["npcSchemas"]["createRandomNpcResponseSchema"];
export type Character = createRandomNpcResponseSchema["npc"];
export type Variables = NonNullable<Character["variables"]>;
export type Statistics = NonNullable<Character["statistics"]>;
export type alignmentModifiers = Character["character"]["alignmentModifiers"];

type Race = NonNullable<Character["character"]["race"]> ;
type Bonuses = NonNullable<Race["bonuses"]>;
export type Bonus = NonNullable<Bonuses["HPBonus"]>;
