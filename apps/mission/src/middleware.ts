import { NextRequest, NextResponse } from "next/server";
import acceptLanguage from "accept-language";
import { defaultLanguage, languages, cookieName } from "@evmosapps/i18n";
import { readLocale } from "@evmosapps/i18n/server";

acceptLanguage.languages(languages);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js|.*png|.*svg|.*sjpg).*)",
  ],
};

export function middleware(request: NextRequest) {
  console.log("request", request.nextUrl);
  let [routeLocale]: string[] = request.nextUrl.pathname
    .split("/")
    .filter(Boolean);

  /**
   * Redirect if there is no locale in path
   */
  if (!routeLocale || !languages.includes(routeLocale)) {
    const locale = readLocale();
    const response = NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}`, request.url)
    );

    return response;
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
