/**
 * Supabase Auth Middleware
 *
 * Refreshes the user's session on every request and enforces route access.
 * This runs on the Edge runtime.
 *
 * Two rules keep the session alive, and breaking either one logs users out:
 *
 * 1. ONE client, ONE getUser() per request. Supabase rotates refresh tokens,
 *    so a second refresh in the same request invalidates the token the first
 *    one just issued.
 * 2. EVERY response returned from here — redirects included — must carry the
 *    cookies the client set. A bare NextResponse.redirect() drops them, the
 *    browser keeps sending the consumed refresh token, and the session becomes
 *    unrecoverable rather than merely stale.
 */

import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Read env vars directly - middleware runs in Edge runtime
function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.warn("Supabase env vars not configured, skipping auth middleware");
    return null;
  }

  return { url, key };
}

// Routes that require authentication
const protectedRoutes = ["/ideas/new", "/profile", "/admin", "/game/admin"];

// Routes that additionally require membership in app_admins
const adminRoutes = ["/admin", "/game/admin"];

// Auth routes that should redirect to home if already logged in
const authRoutes = ["/login"];

export async function authMiddleware(request: NextRequest) {
  const config = getSupabaseConfig();

  // If no config, just pass through
  if (!config) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(config.url, config.key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  /**
   * Redirect while preserving any refreshed auth cookies.
   *
   * NextResponse.redirect() starts with empty headers, so the Set-Cookie
   * headers written onto supabaseResponse have to be copied across by hand.
   * Returning a redirect without this is what silently signs users out.
   */
  const redirectTo = (pathname: string, searchParams?: Record<string, string>) => {
    const url = request.nextUrl.clone();
    url.pathname = pathname;
    url.search = "";
    if (searchParams) {
      for (const [key, value] of Object.entries(searchParams)) {
        url.searchParams.set(key, value);
      }
    }

    const response = NextResponse.redirect(url);
    supabaseResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie);
    });
    return response;
  };

  // Single session refresh for this request. Do not add a second getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdminRoute = adminRoutes.some((route) => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Unauthenticated users cannot reach protected routes
  if (isProtectedRoute && !user) {
    return redirectTo("/login", { redirectTo: pathname });
  }

  // Role-based protection: admin routes require an app_admins record
  if (isAdminRoute && user) {
    if (!user.email) {
      return redirectTo("/");
    }

    const { data } = await supabase
      .from("app_admins")
      .select("email")
      .eq("email", user.email)
      .maybeSingle();

    if (!data) {
      return redirectTo("/");
    }
  }

  // Authenticated users have no business on the login page
  if (isAuthRoute && user) {
    return redirectTo("/");
  }

  return supabaseResponse;
}
