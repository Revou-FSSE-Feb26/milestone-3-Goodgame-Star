import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("revoshop_token")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedPaths = ["/checkout", "/admin"];
  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If logged in user tries to access login page, redirect to home
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/admin/:path*", "/login"],
};
