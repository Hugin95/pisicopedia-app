#!/usr/bin/env tsx

/**
 * Simple wrapper to run auto-post using the same logic as the API
 * This ensures consistency between manual and automatic generation
 */

import * as dotenv from 'dotenv';
import { runAutoPostOnce } from '../lib/auto-post';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function main() {
  console.log('🤖 Running auto-post generator...\n');

  const result = await runAutoPostOnce();

  if (result.status === 'created') {
    console.log('\n✅ SUCCESS!');
    console.log(`📝 Article: ${result.title}`);
    console.log(`🔗 Slug: ${result.slug}`);
    console.log(`📁 Category: ${result.category}`);
  } else if (result.status === 'empty') {
    console.log('\n⚠️  No pending topics in queue');
  } else if (result.status === 'limit-reached') {
    console.log(`\n⚠️  Daily limit reached: ${result.current}/${result.limit}`);
  } else {
    console.log('\n❌ ERROR:', result.error);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});

