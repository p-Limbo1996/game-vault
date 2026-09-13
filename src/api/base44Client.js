import { createClient } from "@base44/sdk";
import { appParams } from "@/lib/app-params";

const { appId, token, functionsVersion, appBaseUrl } = appParams;

//Create a client with authentication required
export const base44 = createClient({
  appId,
  token,
  headers: {
    api_key: import.meta.env.VITE_BASE44_API_KEY,
  },
  functionsVersion,
  serverUrl: "",
  requiresAuth: false,
  appBaseUrl: "https://flawless-vault-core-play.base44.app",
});
