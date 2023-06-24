import { components } from "@/types/backend";


export interface Credentials {
  email: string;
  password: string;
}

export interface RegistrationFields {
  email: string;
  username: string;
  password: string;
}


export type LoginResponseSchema =
  components["schemas"]["userSchemas"]["loginResponseSchema"];

export type CreateUserResponseSchema =
  components["schemas"]["userSchemas"]["createUserResponseSchema"];
