import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  const isAuthPage =
    request.nextUrl.pathname === "/signin" ||
    request.nextUrl.pathname === "/signup";

  const isDashboard =
    request.nextUrl.pathname === "/dashboard";

  if (!token && isDashboard) {
    return NextResponse.redirect(
      new URL("/signin", request.url)
    );
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/dashboard"],
};

