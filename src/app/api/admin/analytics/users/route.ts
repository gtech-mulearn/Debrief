import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/utils/admin';

// Force dynamic to ensure we get fresh data
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const supabase = await createServerClient();

    // 1. Auth Check
    await requireAdmin();
    // 1. Auth Check is done by requireAdmin

    // 2. Fetch Data in Parallel
    const [
      { count: totalUsers },
      { data: dailyGrowth },
      { data: activeStats }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('analytics_users_daily').select('*').limit(30), // Last 30 days
      supabase.from('analytics_active_users').select('*').single()
    ]);

    return NextResponse.json({
      totalUsers,
      dailyGrowth: dailyGrowth || [],
      activeStats: activeStats || { active_7d: 0, active_30d: 0 }
    });

  } catch (error) {
    console.error('User Analytics Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
