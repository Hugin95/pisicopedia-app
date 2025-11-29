#!/usr/bin/env tsx

/**
 * Health Check Script for All Pages
 * Tests all routes to detect 404 errors
 */

import * as dotenv from 'dotenv';
import { allBreeds } from '../lib/content-lists';
import { sampleArticles } from '../lib/data';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

interface CheckResult {
  url: string;
  status: number;
  ok: boolean;
  error?: string;
}

// Get base URL from environment or use localhost
const BASE_URL = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

// Define all routes to check
function getAllRoutes(): string[] {
  const routes: string[] = [];

  // Static pages
  const staticPages = [
    '/',
    '/rase',
    '/sanatate',
    '/ghiduri',
    '/nume-pisici',
    '/despre',
    '/contact',
    '/politica-confidentialitate',
    '/termeni-si-conditii',
    '/disclaimer',
  ];
  routes.push(...staticPages);

  // Dynamic breed pages (only first 10 to avoid overwhelming)
  const breedSlugs = allBreeds.slice(0, 10).map(breed => `/rase/${breed.slug}`);
  routes.push(...breedSlugs);

  // Dynamic article pages (only existing ones)
  const articleSlugs = sampleArticles.slice(0, 10).map(article => `/sanatate/${article.slug}`);
  routes.push(...articleSlugs);

  // Sitemap and robots
  routes.push('/sitemap.xml');
  routes.push('/robots.txt');

  return routes;
}

// Check if a URL returns 404
async function checkUrl(url: string): Promise<CheckResult> {
  const fullUrl = `${BASE_URL}${url}`;

  try {
    const response = await fetch(fullUrl, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': 'Pisicopedia Health Check Bot',
      },
    });

    return {
      url,
      status: response.status,
      ok: response.ok,
    };
  } catch (error: any) {
    return {
      url,
      status: 0,
      ok: false,
      error: error.message || 'Network error',
    };
  }
}

// Check multiple URLs with rate limiting
async function checkUrls(urls: string[], concurrent = 3): Promise<CheckResult[]> {
  const results: CheckResult[] = [];

  for (let i = 0; i < urls.length; i += concurrent) {
    const batch = urls.slice(i, i + concurrent);
    const batchResults = await Promise.all(batch.map(checkUrl));
    results.push(...batchResults);

    // Small delay between batches to avoid overwhelming the server
    if (i + concurrent < urls.length) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return results;
}

async function healthCheck() {
  console.log(`\n${colors.bright}${colors.cyan}🏥 HEALTH CHECK - PAGE STATUS${colors.reset}`);
  console.log('='.repeat(80));
  console.log(`Base URL: ${colors.blue}${BASE_URL}${colors.reset}`);

  // Check if server is running (for localhost)
  if (BASE_URL.includes('localhost')) {
    console.log(`\n${colors.yellow}⚠️  Testing localhost - make sure 'npm run dev' is running${colors.reset}`);

    // Quick check if server responds
    try {
      const testResponse = await fetch(BASE_URL);
      if (!testResponse.ok && testResponse.status !== 404) {
        console.error(`${colors.red}❌ Server not responding at ${BASE_URL}${colors.reset}`);
        console.log('Please run: npm run dev');
        process.exit(1);
      }
    } catch (error) {
      console.error(`${colors.red}❌ Cannot connect to ${BASE_URL}${colors.reset}`);
      console.log('Please run: npm run dev');
      process.exit(1);
    }
  }

  const routes = getAllRoutes();
  console.log(`\nChecking ${routes.length} routes...`);
  console.log('-'.repeat(80));

  const results = await checkUrls(routes);

  // Group results by status
  const okResults = results.filter(r => r.ok && r.status === 200);
  const redirectResults = results.filter(r => r.status >= 300 && r.status < 400);
  const notFoundResults = results.filter(r => r.status === 404);
  const errorResults = results.filter(r => !r.ok && r.status !== 404);

  // Display results
  console.log('\nStatus | Route');
  console.log('-'.repeat(80));

  // Show all results with appropriate coloring
  for (const result of results) {
    let statusIcon = '';
    let statusColor = '';

    if (result.status === 200) {
      statusIcon = '✅';
      statusColor = colors.green;
    } else if (result.status === 404) {
      statusIcon = '❌';
      statusColor = colors.red;
    } else if (result.status >= 300 && result.status < 400) {
      statusIcon = '⚠️';
      statusColor = colors.yellow;
    } else if (result.error) {
      statusIcon = '💥';
      statusColor = colors.red;
    } else {
      statusIcon = '❓';
      statusColor = colors.gray;
    }

    const statusText = result.error
      ? 'ERR'
      : result.status.toString().padStart(3);

    console.log(`${statusIcon} [${statusColor}${statusText}${colors.reset}] ${result.url}`);

    if (result.error) {
      console.log(`        ${colors.gray}Error: ${result.error}${colors.reset}`);
    }
  }

  console.log('-'.repeat(80));

  // Summary
  console.log(`\n${colors.bright}📊 SUMMARY:${colors.reset}`);
  console.log(`Total routes checked: ${results.length}`);
  console.log(`${colors.green}✅ OK (200): ${okResults.length}${colors.reset}`);

  if (redirectResults.length > 0) {
    console.log(`${colors.yellow}⚠️  Redirects (3xx): ${redirectResults.length}${colors.reset}`);
  }

  if (notFoundResults.length > 0) {
    console.log(`${colors.red}❌ Not Found (404): ${notFoundResults.length}${colors.reset}`);
  }

  if (errorResults.length > 0) {
    console.log(`${colors.red}💥 Errors: ${errorResults.length}${colors.reset}`);
  }

  // List 404 pages
  if (notFoundResults.length > 0) {
    console.log(`\n${colors.red}❌ PAGES WITH 404 ERRORS:${colors.reset}`);
    notFoundResults.forEach(r => {
      console.log(`   - ${r.url}`);
    });
  }

  // List error pages
  if (errorResults.length > 0) {
    console.log(`\n${colors.red}💥 PAGES WITH ERRORS:${colors.reset}`);
    errorResults.forEach(r => {
      console.log(`   - ${r.url} (${r.error || `Status: ${r.status}`})`);
    });
  }

  // Recommendations
  if (notFoundResults.length > 0) {
    console.log(`\n${colors.cyan}💡 To fix 404 errors:${colors.reset}`);
    console.log('   1. Check if the pages exist in app/ directory');
    console.log('   2. Verify dynamic routes have proper data');
    console.log('   3. Run: npm run build');
  }

  // Success rate
  const successRate = Math.round((okResults.length / results.length) * 100);
  console.log(`\n${colors.bright}Success Rate: ${successRate}%${colors.reset}`);

  // Progress bar
  const progressBar = '█'.repeat(Math.floor(successRate / 5)) + '░'.repeat(20 - Math.floor(successRate / 5));
  console.log(`[${progressBar}] ${successRate}%`);

  // Exit code
  if (notFoundResults.length > 0 || errorResults.length > 0) {
    console.log(`\n${colors.red}❌ Health check found issues${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✅ All pages are healthy!${colors.reset}`);
    process.exit(0);
  }
}

// Run the health check
healthCheck().catch(error => {
  console.error('Error running health check:', error);
  process.exit(1);
});