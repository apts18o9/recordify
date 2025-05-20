import { toNextJsHandler } from "better-auth/next-js";
import {auth} from "@/lib/auth"

export const {GET, POST} = toNextJsHandler(auth.handler)

//authentication api, allow users to authenticate