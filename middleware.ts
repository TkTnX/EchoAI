import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get("next-auth.session-token") ||
    request.cookies.get(" __Secure-next-auth.session-token");
  const isLoginPage = request.nextUrl.pathname.startsWith("/login");
  const isRegisterPage = request.nextUrl.pathname.startsWith("/register");
  if (!token && !isLoginPage && !isRegisterPage) {
    // Redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if ((token && isLoginPage) || (token && isRegisterPage)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: [
    "/c/:path*",
    "/account",
    "/account/:path*",
    "/",
    "/login",
    "/register",
  ],
};
