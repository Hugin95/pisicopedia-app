/**
 * Delete Article API Route
 * 
 * Șterge un articol din Supabase DB
 */

import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, secret } = body;

    // 1. Verify secret
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret || !secret || secret !== cronSecret) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Validate ID
    if (!id || typeof id !== 'number') {
      return NextResponse.json(
        { error: 'Invalid article ID' },
        { status: 400 }
      );
    }

    // 3. Delete from Supabase
    const { error } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('id', id);

    if (error) {
      throw new Error(`Failed to delete article: ${error.message}`);
    }

    return NextResponse.json({
      status: 'success',
      message: 'Article deleted successfully',
    });
  } catch (error: any) {
    console.error('[Delete Article] Error:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}

