import { components } from "@/types/backend";


export interface Credentials {
  email: string;
  password: string;
}



export type LoginResponseSchema =
  components["schemas"]["userSchemas"]["loginResponseSchema"];
