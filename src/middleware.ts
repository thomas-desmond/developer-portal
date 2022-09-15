// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const val = request.cookies.get("visitedHeadless");
  console.log("VBEEP BOOP", val);
  if(val && !request.url.includes('headlessHomepage')) {
    console.log("redirect");
    return NextResponse.redirect(new URL('/personalized/headlessHomepage', 'http://localhost:3000/'))
  }
  return;

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}