import { components } from "@/types/backend";

type createRandomNpcResponseSchema =
  components["schemas"]["npcSchemas"]["createRandomNpcResponseSchema"];
export type Character = createRandomNpcResponseSchema["npc"];
export type Variables = NonNullable<Character["variables"]>;
export type Statistics = NonNullable<Character["statistics"]>;
export type Tags = NonNullable<Character["tags"]>;
export type Variations = NonNullable<Character["variations"]>;
export type alignmentModifiers = Character["character"]["alignmentModifiers"];

type Race = NonNullable<Character["character"]["race"]> ;
export type Actions = NonNullable<Race["actions"]>;
type Bonuses = NonNullable<Race["bonuses"]>;
export type Bonus = NonNullable<Bonuses["HPBonus"]>;

export type DescriptionPart = {
  string: string;
  type?: "background" | "spell" | "trait" | "race" | "class" | "template";
  id?: number;
};
