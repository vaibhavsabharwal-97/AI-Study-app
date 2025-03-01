import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    url:'postgresql://neondb_owner:npg_pfR7Ie8NSyaj@ep-spring-feather-a8ye8gve-pooler.eastus2.azure.neon.tech/neondb?sslmode=require'
  }
});
