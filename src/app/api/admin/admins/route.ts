import { createServerClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/utils/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        await requireAdmin();
        const supabase = await createServerClient();

        // Fetch all admins
        const { data: admins, error } = await supabase
            .from('app_admins')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(admins);
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 403 });
    }
}

export async function POST(request: Request) {
    try {
        const creator = await requireAdmin();
        const { email } = await request.json();

        if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

        const supabase = await createServerClient();
        const { error } = await supabase.from('app_admins').insert({
            email,
            created_by: creator.id
        });

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 403 });
    }
}

export async function DELETE(request: Request) {
    try {
        await requireAdmin();
        const { email } = await request.json();

        if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 });

        const supabase = await createServerClient();
        const { error } = await supabase.from('app_admins').delete().eq('email', email);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 403 });
    }
}
