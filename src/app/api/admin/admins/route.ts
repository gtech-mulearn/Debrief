import { createAdminClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/utils/admin';
import { ValidationError, withErrorHandling } from '@/lib/api/errors';

export const dynamic = 'force-dynamic';

/**
 * These handlers previously wrapped every failure in a 403, so a duplicate-key
 * violation on insert was indistinguishable from a real permission failure.
 * withErrorHandling preserves the distinction: requireAdmin throws 401/403,
 * anything else surfaces as a 500 and is logged.
 */

export const GET = withErrorHandling(async () => {
    await requireAdmin(); // Auth check (user context, respects RLS)
    const supabase = createAdminClient(); // Service role (bypasses RLS for listing)

    const { data: admins, error } = await supabase
        .from('app_admins')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(admins);
});

export const POST = withErrorHandling(async (request: Request) => {
    const creator = await requireAdmin();
    const { email } = await request.json();

    if (!email) {
        throw new ValidationError({ email: ['Enter the email address to grant admin access to.'] });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from('app_admins').insert({
        email,
        created_by: creator.id
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
});

export const DELETE = withErrorHandling(async (request: Request) => {
    await requireAdmin();
    const { email } = await request.json();

    if (!email) {
        throw new ValidationError({ email: ['Enter the email address to remove admin access from.'] });
    }

    const supabase = createAdminClient();
    const { error } = await supabase.from('app_admins').delete().eq('email', email);

    if (error) throw error;

    return NextResponse.json({ success: true });
});
