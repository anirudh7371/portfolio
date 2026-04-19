import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const proxy = auth((request) => {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/admin/login");

  if (!isAdminRoute || isLoginRoute) {
    return NextResponse.next();
  }

  if (!request.auth?.user) {
    const loginUrl = new URL("/admin/login", request.nextUrl.origin);
    return NextResponse.redirect(loginUrl);
  }

  if (request.auth.user.role !== "ADMIN") {
    const homeUrl = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};
