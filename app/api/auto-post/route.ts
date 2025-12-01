/**
 * Auto-Post API Route for Pisicopedia.ro
 *
 * This endpoint is called by Vercel Cron to automatically generate articles.
 * It can also be triggered manually with the correct secret.
 *
 * Usage:
 *   POST /api/auto-post?secret=YOUR_CRON_SECRET
 *
 * Environment variables required:
 *   - CRON_SECRET: Secret for authentication
 *   - OPENAI_API_KEY: OpenAI API key
 *   - LEONARDO_API_KEY: Leonardo.ai API key (optional)
 *   - MAX_AUTO_POSTS_PER_DAY: Maximum articles per day (default: 5)
 */

import { NextRequest, NextResponse } from 'next/server';
import { runAutoPostOnce } from '@/lib/auto-post';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300; // 5 minutes max for Vercel

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  // Log request
  console.log('[Auto-Post API] Request received at:', new Date().toISOString());

  try {
    // 1. Verify secret
    const cronSecret = process.env.CRON_SECRET;
    if (!cronSecret) {
      console.error('[Auto-Post API] CRON_SECRET not configured');
      return NextResponse.json(
        {
          status: 'error',
          error: 'CRON_SECRET not configured on server',
        },
        { status: 500 }
      );
    }

    const requestSecret = request.nextUrl.searchParams.get('secret');
    const headerSecret = request.headers.get('x-cron-secret');

    const providedSecret = requestSecret || headerSecret;

    if (!providedSecret || providedSecret !== cronSecret) {
      console.error('[Auto-Post API] Unauthorized access attempt');
      return NextResponse.json(
        {
          status: 'error',
          error: 'Unauthorized. Invalid or missing secret.',
        },
        { status: 401 }
      );
    }

    // 2. Run auto-post
    console.log('[Auto-Post API] Running auto-post...');
    const result = await runAutoPostOnce();

    // 3. Calculate duration
    const duration = Date.now() - startTime;

    // 4. Log result
    console.log('[Auto-Post API] Result:', result.status);
    if (result.status === 'created') {
      console.log(`[Auto-Post API] Created: ${result.slug} (${duration}ms)`);
    }

    // 5. Return response
    return NextResponse.json(
      {
        ...result,
        duration,
        timestamp: new Date().toISOString(),
      },
      { status: result.status === 'error' ? 500 : 200 }
    );
  } catch (error: any) {
    console.error('[Auto-Post API] Unexpected error:', error);

    return NextResponse.json(
      {
        status: 'error',
        error: error.message || 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

// GET method returns status and info (without generating)
export async function GET(request: NextRequest) {
  try {
    // Verify secret for GET too
    const cronSecret = process.env.CRON_SECRET;
    const providedSecret =
      request.nextUrl.searchParams.get('secret') ||
      request.headers.get('x-cron-secret');

    if (!cronSecret || !providedSecret || providedSecret !== cronSecret) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Import lazily to avoid bundling issues
    const { loadQueue } = await import('@/lib/auto-post');
    const queue = loadQueue();

    const pending = queue.filter(t => t.status === 'pending').length;
    const done = queue.filter(t => t.status === 'done').length;

    return NextResponse.json({
      status: 'ready',
      queue: {
        pending,
        done,
        total: queue.length,
      },
      config: {
        maxPerDay: parseInt(process.env.MAX_AUTO_POSTS_PER_DAY || '5', 10),
        openaiConfigured: !!process.env.OPENAI_API_KEY,
        leonardoConfigured: !!process.env.LEONARDO_API_KEY,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
