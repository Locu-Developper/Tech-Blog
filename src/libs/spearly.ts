import { SpearlyApiClient } from "@spearly/sdk-js";

// const API_DOMAIN = "https://api.spearly.com"

export const apiClient =
    new SpearlyApiClient(import.meta.env.SPEARLY_API_KEY as string)