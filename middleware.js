import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("revoshop_token")?.value;
  const role = request.cookies.get("revoshop_role")?.value;
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/checkout", "/admin"];
  const isProtected = protectedPaths.some(
    (path) => pathname === path || pathname.startsWith(path + "/")
  );

  // Redirect unauthenticated users to login
  if (isProtected && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect non-admin users away from admin routes
  if (pathname.startsWith("/admin") && token && role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect already-logged-in users away from login page
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout", "/admin/:path*", "/login"],
};
