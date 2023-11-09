import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { defaultLocale, languages, cookieName } from "@evmosapps/i18n";
import { readLocale } from "@evmosapps/i18n/server";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|manifest.json|sw.js|.*png|.*svg|.*sjpg).*)",
  ],
};

export function middleware(request: NextRequest) {
  let [routeLocale]: string[] = request.nextUrl.pathname
    .split("/")
    .filter(Boolean);
  /**
   * if path locale is defaultLocale, remove it from path and redirect
   */
  if (routeLocale === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = url.pathname.replace(`/${defaultLocale}`, "");
    return NextResponse.redirect(url);
  }

  /**
   * If path has no locale, serve defaultLocale
   */

  if (!routeLocale || !languages.includes(routeLocale)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}${request.nextUrl.pathname}`;
    return NextResponse.rewrite(url);
  }

  const response = NextResponse.next();

  response.cookies.set(cookieName, routeLocale);

  /**
   * If referer has a locale in path, set language cookie
   */
  if (request.headers.has("referer")) {
    const referer = request.headers.get("referer");
    const [refererLocale] = referer
      ? new URL(referer).pathname.split("/").filter(Boolean)
      : [];

    if (refererLocale && languages.includes(refererLocale)) {
      response.cookies.set(cookieName, refererLocale);
    }
  }

  return response;
}
