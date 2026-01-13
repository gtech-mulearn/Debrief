import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/utils/admin';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = await createServerClient();
    await requireAdmin();

    const body = await request.json();
    const { type } = body; // 'users', 'ideas', 'games'

    let data;
    if (type === 'users') {
      const { data: res } = await supabase.from('profiles').select('id, email, full_name, created_at, updated_at');
      data = res;
    } else if (type === 'ideas') {
      const { data: res } = await supabase.from('ideas').select('*, idea_levels(level_number, status)');
      data = res;
    } else if (type === 'games') {
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
