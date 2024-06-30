const config = useRuntimeConfig();
const api = config.public.apiUrl;

class RetriableError extends Error {}
class FatalError extends Error {}

/// /////////////////////////////////////

export const useSorceryStore = defineStore("sorcery", () => {});
