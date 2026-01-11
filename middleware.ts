import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  
  // Only redirect www to non-www, nothing else
  if (hostname.startsWith('www.')) {
    const newHostname = hostname.replace('www.', '');
    const newUrl = new URL(request.url);
    newUrl.hostname = newHostname;
    
    // Return permanent redirect (308)
    return NextResponse.redirect(newUrl, 308);
  }
  
  // For all other requests, just continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};

