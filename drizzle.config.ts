import {config} from 'dotenv'
import {defineConfig} from 'drizzle-kit'

config({path: './.env' });


//connecting pg with xata to use db
export default defineConfig({
    schema: './drizzle/schema.ts',
    out: './drizzle/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL_POSTGRES!,
    }
})