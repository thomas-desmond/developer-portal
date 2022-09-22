// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const val = request.cookies.get("RecentlyVisited");
  if(val == 'Headless Services' && !request.url.includes('headlessHomepage')) {
    return NextResponse.rewrite(new URL('/personalized/headlessHomepage', request.url))
  }
  else if(val == 'Moosend' && !request.url.includes('moosendHomepage')) {
    return NextResponse.rewrite(new URL('/personalized/moosendHomepage', request.url))
  }
  else if(val == 'Sitecore CDP' && !request.url.includes('cdpHomepage')) {
    return NextResponse.rewrite(new URL('/personalized/cdpHomepage', request.url))
  }
  return;

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/',
}