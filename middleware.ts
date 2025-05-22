//to allow only authenticate users to see home page, other go to sign-in

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";
import aj from "./lib/arcjet";
import { createMiddleware, detectBot, shield } from "@arcjet/next";


export async function middleware(request: NextRequest, response: NextResponse){
    const session = await auth.api.getSession({
        headers: await headers()
    })

    //checking if user is sign-in and if not send to sign-in

    if(!session){
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }

    return NextResponse.next()
}

//middlware to check for bots and implement shield

const validate = aj
    .withRule(shield({mode: 'LIVE'}))
    .withRule(detectBot({mode: 'LIVE', allow: ['CATEGORY:SEARCH_ENGINE', 'GOOGLE_CRAWLER']}))

export default createMiddleware(validate)


//stop middleware to run on these(static files)
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|sign-in|assets).*)"]
}