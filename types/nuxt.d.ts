export type NuxtError = {
  statusCode: number;
  message: string;
  statusMessage: string;
  data: NuxtErrorData;
}

export interface NuxtErrorData {
  message: string;
}
