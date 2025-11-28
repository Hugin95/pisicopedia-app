/**
 * Analytics Wrapper for Pisicopedia.ro
 * Supports: Google Analytics 4, Plausible, Facebook Pixel
 *
 * Usage:
 * 1. Add NEXT_PUBLIC_GA_MEASUREMENT_ID to .env.local
 * 2. Add tracking scripts to app/layout.tsx
 * 3. Import and use: import { analytics } from '@/lib/analytics'
 */

type EventParams = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    plausible?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

class Analytics {
  private isProduction = process.env.NODE_ENV === 'production';
  private debug = process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === 'true';

  constructor() {
    if (this.debug) {
      console.log('🔍 Analytics initialized in', this.isProduction ? 'PRODUCTION' : 'DEVELOPMENT', 'mode');
    }
  }

  /**
   * Track page view
   */
  pageview(url: string, title?: string) {
    if (!this.isProduction || this.debug) {
      console.log('📊 [Analytics] Pageview:', { url, title });
    }

    if (!this.isProduction) return;

    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID!, {
        page_path: url,
        page_title: title,
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'PageView');
    }

    // Plausible auto-tracks pageviews
  }

  /**
   * Track custom event
   */
  event({ action, category = 'general', label, value, ...customParams }: EventParams) {
    if (!this.isProduction || this.debug) {
      console.log('📊 [Analytics] Event:', { action, category, label, value, ...customParams });
    }

    if (!this.isProduction) return;

    // Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
        ...customParams,
      });
    }

    // Plausible Analytics
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(action, {
        props: { category, label, value, ...customParams }
      });
    }

    // Facebook Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      // Map common events to Facebook standard events
      const fbEventMap: { [key: string]: string } = {
        'view_breed': 'ViewContent',
        'read_article': 'ViewContent',
        'search': 'Search',
        'contact': 'Contact',
        'newsletter_signup': 'Lead',
      };

      const fbEvent = fbEventMap[action] || action;
      window.fbq('track', fbEvent, {
        content_category: category,
        content_name: label,
        value: value,
        ...customParams,
      });
    }
  }

  // === Specific Event Methods ===

  /**
   * Track breed page view
   */
  viewBreed(breedName: string, breedSlug: string) {
    this.event({
      action: 'view_breed',
      category: 'engagement',
      label: breedName,
      breed_slug: breedSlug,
      content_type: 'breed',
    });
  }

  /**
   * Track article read
   */
  readArticle(title: string, category: string, readTime?: number) {
    this.event({
      action: 'read_article',
      category: 'content',
      label: title,
      value: readTime,
      article_category: category,
      content_type: 'article',
    });
  }

  /**
   * Track CTA button clicks
   */
  clickCTA(ctaText: string, location: string, destination?: string) {
    this.event({
      action: 'cta_click',
      category: 'engagement',
      label: ctaText,
      cta_location: location,
      cta_destination: destination,
    });
  }

  /**
   * Track internal navigation
   */
  navigate(from: string, to: string, method: 'menu' | 'link' | 'button' | 'breadcrumb') {
    this.event({
      action: 'internal_navigation',
      category: 'navigation',
      label: `${from} → ${to}`,
      navigation_method: method,
    });
  }

  /**
   * Track search queries
   */
  search(query: string, resultsCount: number, searchLocation: string = 'header') {
    this.event({
      action: 'search',
      category: 'engagement',
      label: query,
      value: resultsCount,
      search_location: searchLocation,
    });
  }

  /**
   * Track scroll depth milestones
   */
  scrollDepth(percent: 25 | 50 | 75 | 90 | 100, pageType: string) {
    this.event({
      action: 'scroll_depth',
      category: 'engagement',
      label: `${percent}%`,
      value: percent,
      page_type: pageType,
    });
  }

  /**
   * Track external link clicks
   */
  externalLink(url: string, linkText?: string) {
    this.event({
      action: 'external_link',
      category: 'outbound',
      label: url,
      link_text: linkText,
    });
  }

  /**
   * Track form interactions
   */
  formInteraction(formName: string, action: 'start' | 'submit' | 'error', fieldName?: string) {
    this.event({
      action: `form_${action}`,
      category: 'forms',
      label: formName,
      field_name: fieldName,
    });
  }

  /**
   * Track contact form submission
   */
  contactSubmit(method: 'email' | 'form', subject?: string) {
    this.event({
      action: 'contact',
      category: 'conversion',
      label: method,
      contact_subject: subject,
    });
  }

  /**
   * Track social media shares
   */
  share(platform: string, contentType: string, contentTitle: string) {
    this.event({
      action: 'share',
      category: 'social',
      label: platform,
      content_type: contentType,
      content_title: contentTitle,
    });
  }

  /**
   * Track time on page
   */
  timeOnPage(seconds: number, pageType: string, pageTitle: string) {
    // Only track significant time spent (>10 seconds)
    if (seconds < 10) return;

    this.event({
      action: 'time_on_page',
      category: 'engagement',
      label: pageTitle,
      value: seconds,
      page_type: pageType,
    });
  }

  /**
   * Track 404 errors
   */
  error404(attemptedUrl: string, referrer?: string) {
    this.event({
      action: 'error_404',
      category: 'errors',
      label: attemptedUrl,
      referrer: referrer,
    });
  }

  /**
   * Track newsletter signup
   */
  newsletterSignup(location: string) {
    this.event({
      action: 'newsletter_signup',
      category: 'conversion',
      label: location,
    });
  }

  /**
   * Track print action
   */
  print(contentType: string, contentTitle: string) {
    this.event({
      action: 'print',
      category: 'engagement',
      label: contentTitle,
      content_type: contentType,
    });
  }

  /**
   * Track copy action (e.g., copying contact info)
   */
  copy(contentType: string, content: string) {
    this.event({
      action: 'copy',
      category: 'engagement',
      label: contentType,
      copied_content: content.substring(0, 50), // Limit for privacy
    });
  }

  /**
   * Track related content clicks
   */
  relatedContentClick(fromContent: string, toContent: string, contentType: 'breed' | 'article') {
    this.event({
      action: 'related_content_click',
      category: 'engagement',
      label: `${fromContent} → ${toContent}`,
      content_type: contentType,
    });
  }

  /**
   * Track mobile menu interactions
   */
  mobileMenu(action: 'open' | 'close' | 'navigate') {
    this.event({
      action: `mobile_menu_${action}`,
      category: 'navigation',
      label: action,
    });
  }

  /**
   * Track FAQ interactions
   */
  faqInteraction(question: string, action: 'open' | 'close') {
    this.event({
      action: `faq_${action}`,
      category: 'engagement',
      label: question.substring(0, 100),
    });
  }

  /**
   * Track filter usage
   */
  filter(filterType: string, filterValue: string, resultsCount: number) {
    this.event({
      action: 'filter',
      category: 'engagement',
      label: `${filterType}: ${filterValue}`,
      value: resultsCount,
    });
  }

  /**
   * Track image interactions
   */
  imageInteraction(imageName: string, action: 'view' | 'zoom' | 'download') {
    this.event({
      action: `image_${action}`,
      category: 'media',
      label: imageName,
    });
  }
}

// Singleton instance
export const analytics = new Analytics();

// Export types for use in components
export type { EventParams };

/**
 * Hook pentru tracking automat al timpului pe pagină
 *
 * Usage:
 * import { useTimeTracking } from '@/lib/analytics';
 *
 * function MyPage() {
 *   useTimeTracking('article', 'Titlu Articol');
 *   return <div>...</div>;
 * }
 */
export function useTimeTracking(pageType: string, pageTitle: string) {
  if (typeof window === 'undefined') return;

  let startTime = Date.now();

  const trackTime = () => {
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    analytics.timeOnPage(timeSpent, pageType, pageTitle);
  };

  // Track on page leave
  window.addEventListener('beforeunload', trackTime);

  // Also track on route change (for SPAs)
  return () => {
    trackTime();
    window.removeEventListener('beforeunload', trackTime);
  };
}

/**
 * Hook pentru tracking scroll depth
 */
export function useScrollTracking(pageType: string) {
  if (typeof window === 'undefined') return;

  const tracked = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.floor((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);

    [25, 50, 75, 90, 100].forEach(milestone => {
      if (scrollPercent >= milestone && !tracked.has(milestone)) {
        analytics.scrollDepth(milestone as any, pageType);
        tracked.add(milestone);
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
}