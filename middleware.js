import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get('token')


    const protectPaths = ['/employees','/add-employee','/edit-employee']

    const isProtected = protectPaths.some((path) =>
    request.nextUrl.pathname.startsWith(path)
)

if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
}
return NextResponse.next()
}

export const config = {
    matcher: [
        '/employees',
        '/add-employee',
        '/edit-employee/:path*'
    ]
}