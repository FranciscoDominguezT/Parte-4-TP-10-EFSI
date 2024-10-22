import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const publicRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/api/user/login',
  '/api/user/register'
];

const authOnlyRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  console.log('Token en middleware:', token);
  const isAuthenticated = !!token;
  const { pathname } = request.nextUrl;

  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route) || pathname === route
  );

  const isAuthOnlyRoute = authOnlyRoutes.some(route => 
    pathname.startsWith(route) || pathname === route
  );

  if (isAuthenticated && isAuthOnlyRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (!isAuthenticated && !isPublicRoute) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}