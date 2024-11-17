import { NextResponse } from 'next/server'

const publicRoutes = ['/login', '/register']

export function middleware(request) {
  const token = request.cookies.get('token')
  const path = request.nextUrl.pathname

  if (path === '/' && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (publicRoutes.includes(path)) {
    if (token) {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return NextResponse.next()
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/login',
    '/register',
    '/contacto',
  ]
}