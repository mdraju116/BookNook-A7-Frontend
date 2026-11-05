import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";

// Forward Better Auth requests through the App Router catch-all endpoint.
export const { POST, GET } = toNextJsHandler(auth);
