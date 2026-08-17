import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
    // Mongo only supports transactions on a replica set, and the adapter
    // defaults to `false` anyway — left explicit so it isn't turned on by
    // accident against a standalone instance.
    transaction: false,
  }),

  advanced: {
    database: {
      // Required by the schema: our ids are `@default(auto()) @db.ObjectId`,
      // and better-auth's own generateId() returns a 32-char base62 string
      // that Prisma rejects as an ObjectId. `false` makes it omit the id so
      // Mongo assigns one.
      generateId: false,
    },
  },

  emailAndPassword: {
    enabled: true,
  },
});
