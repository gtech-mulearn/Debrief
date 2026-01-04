/**
 * Auth Redirect Page
 * 
 * Client-side page that handles post-OAuth redirect
 * Reads the redirect destination from localStorage
 */

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function AuthRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Get the stored redirect destination
    const redirectTo = localStorage.getItem("auth_redirect") || "/";
    
    // Clear the stored redirect
    localStorage.removeItem("auth_redirect");
    
    // Redirect to the destination
    router.replace(redirectTo);
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        <p className="text-sm text-gray-600">Signing you in...</p>
      </div>
    </div>
  );
}
