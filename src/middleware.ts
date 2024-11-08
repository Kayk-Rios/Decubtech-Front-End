import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookie = cookies();
  const userId = cookie.get("userId");
  const username = cookie.get("username");
  const selectedSetor = cookie.get("selectedSetor");
  const selectedSetorName = cookie.get("selectedSetorName");
  
  const protectedRoutes = ["/layout/setor", "/layout/paciente", "/layout/posicoes"];

  const isProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname);
  if (isProtectedRoute && (!userId || !username)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/layout/setor/:path*", "/layout/paciente/:path*", "/layout/posicoes/:path*"],
};
