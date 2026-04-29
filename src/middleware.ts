import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  const path = url.pathname;
  const normalizedPath = path.toLowerCase();

  // Словарь редиректов: старый путь -> новый путь
  const redirects: Record<string, string> = {
    "/bicycle": "/departments/bicycle",
    "/gymnastics": "/departments/gymnastics",
    "/kickboxing": "/departments/kickboxing",
    "/judo": "/departments/judo",
    "/shooting": "/departments/shooting",
    "/karate": "/departments/karate",
    "/athletics": "/departments/athletics",
    "/vietvodao": "/departments/vietvodao",
    "/fireman": "/departments/fireman",
    "/freestyle": "/departments/freestyle",
    "/departments": "/departments",
    "/sections": "/sports",
    "/gymnasticssection": "/sports/gymnastics-section",
    "/kickboxingsection": "/sports/kickboxing-section",
    "/vajrayogasection": "/sports/vajra-yoga-section",
    "/judosection": "/sports/judo-section",
    "/vietvodaosection": "/sports/viet-vo-dao-section",
    "/shootingsection": "/sports/shooting-section",
    "/choreography": "/sports/choreography-section",
    "/developinggymnastics": "/sports/developing-gymnastics-section",
    "/acrobatics": "/sports/acrobatics-section",
    "/firemansection": "/sports/fireman-section",
    "/freestylesection": "/sports/freestyle-section",
    "/prices": "/enrollment",
    "/services": "/rental",
    "/store": "/rental",
    "/bicycleservice": "/rental",
    "/aboutschool": "/history",
    "/administration": "/administration",
    "/alltrainers": "/trainers",
    "/contacts": "/administration",
    "/home/blog": "/blog",
    "/privacy": "/privacy",
    "/sposob_oplaty": "/enrollment",
    "/public_contract": "/privacy",
    "/visiting_rules": "/privacy",
    "/home/purchase_returns": "/privacy",
    "/identity/account/login": "/login",
  };

  // Динамические legacy URL с query-параметрами
  // Ведем на актуальные страницы без query, чтобы не плодить дубли.
  if (
    normalizedPath === "/pricesforsection" ||
    normalizedPath === "/pricesforsectionbyname" ||
    normalizedPath === "/checkout"
  ) {
    url.pathname = "/enrollment";
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  // Legacy-URL старой статьи блога без актуального slug на новом сайте.
  // Ведем в ленту блога вместо 404.
  if (normalizedPath === "/blog/opicanie-bloga-dlia-poicka-1") {
    url.pathname = "/blog";
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  // Проверяем, есть ли путь в словаре
  if (redirects[normalizedPath] && path !== redirects[normalizedPath]) {
    url.pathname = redirects[normalizedPath];
    return NextResponse.redirect(url, 301);
  }

  // Канонизация URL: любой путь с заглавными буквами -> lowercase.
  // Нужна для SEO, чтобы исключить дубли страниц по регистру.
  if (path !== normalizedPath) {
    url.pathname = normalizedPath;
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
