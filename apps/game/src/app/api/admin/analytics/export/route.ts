import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/utils/admin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();
    await requireAdmin();

    const body = await request.json();
    const { type } = body; // 'games'

    let data;
    if (type === 'games') {
      // Export sim_games with team details
      const { data: res } = await supabase
        .from('sim_games')
        .select('*, sim_teams(*)')
        .order('created_at', { ascending: false });
      data = res;
    } else {
      return NextResponse.json({ error: 'Invalid export type' }, { status: 400 });
    }

    return NextResponse.json({ data });

  } catch (error) {
    console.error('Export Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
