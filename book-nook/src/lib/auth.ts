import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

export const client = new MongoClient(`${process.env.MONGODB_URI as string}`);
export const db = client.db("booknook-db1");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,

    },
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,

    account: {
        accountLinking: {
            enabled: true,
            trustedProviders: ["google", "github"], // Add providers you trust
        },
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
    },

    database: mongodbAdapter(db, {
        client,
    }),
});
