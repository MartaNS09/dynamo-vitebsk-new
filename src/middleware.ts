import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Словарь редиректов: старый путь -> новый путь
  const redirects: Record<string, string> = {
    "/Bicycle": "/departments/Bicycle",
    "/Gymnastics": "/departments/Gymnastics",
    "/Kickboxing": "/departments/Kickboxing",
    "/Judo": "/departments/Judo",
    "/Shooting": "/departments/Shooting",
    "/Karate": "/departments/Karate",
    "/Athletics": "/departments/Athletics",
    "/VietVoDao": "/departments/VietVoDao",
    "/Fireman": "/departments/Fireman",
    "/Freestyle": "/departments/Freestyle",
    "/Departments": "/departments",
    "/Sections": "/sports",
    "/Aboutschool": "/history",
    "/Administration": "/administration",
    "/AllTrainers": "/trainers",
  };

  // Проверяем, есть ли путь в словаре
  if (redirects[path]) {
    url.pathname = redirects[path];
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public directory)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
