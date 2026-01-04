/**
 * Auth Callback Route
 * 
 * Handles OAuth callback from Supabase Auth
 * Note: The actual redirect destination is stored in localStorage by the client
 * and handled client-side after this server redirect
 */

import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      // Redirect to a client page that will handle the localStorage redirect
      return NextResponse.redirect(`${origin}/auth/redirect`);
    }
  }

  // Return to login page with error
  return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
}
