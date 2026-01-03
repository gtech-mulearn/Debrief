/**
 * Auth Hook
 * 
 * Client-side hook for managing authentication state and actions.
 * Uses Supabase Auth and subscribes to auth state changes.
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAuthenticated: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
    isAuthenticated: false,
  });

  useEffect(() => {
    const supabase = createClient();

    // Get initial session
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setState({
          user: session?.user ?? null,
          session,
          loading: false,
          isAuthenticated: !!session?.user,
        });
      } catch (error) {
        console.error("Error getting auth session:", error);
        setState({
          user: null,
          session: null,
          loading: false,
          isAuthenticated: false,
        });
      }
    };

    initAuth();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setState({
          user: session?.user ?? null,
          session,
          loading: false,
          isAuthenticated: !!session?.user,
        });
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const supabase = createClient();
    const redirectTo = typeof window !== "undefined" 
      ? `${window.location.origin}/auth/callback`
      : `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    const supabase = createClient();
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error("Sign out error:", error);
      throw error;
    }

    // Clear state immediately
    setState({
      user: null,
      session: null,
      loading: false,
      isAuthenticated: false,
    });
  }, []);

  return {
    ...state,
    signInWithGoogle,
    signOut,
  };
}
