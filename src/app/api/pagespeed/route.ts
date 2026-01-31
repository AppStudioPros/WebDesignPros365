import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const requestSchema = z.object({
  url: z.string().url(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url } = requestSchema.parse(body);

    const apiKey = process.env.PAGESPEED_API_KEY;

    if (!apiKey) {
      // Return mock data if no API key is configured
      console.log('⚠️ PAGESPEED_API_KEY not configured, returning mock data');
      return NextResponse.json({
        url,
        performance: {
          score: 85,
          metrics: {
            fcp: 1.2,
            lcp: 2.1,
            cls: 0.05,
            tbt: 150,
            si: 2.5,
          },
        },
        accessibility: {
          score: 92,
          issues: 3,
        },
        seo: {
          score: 88,
          issues: [
            'Missing meta description on some pages',
            'Some images missing alt text',
            'Consider using HTTPS for all resources',
          ],
        },
        bestPractices: {
          score: 90,
        },
        mobile: {
          score: 83,
        },
        timestamp: new Date().toISOString(),
        mock: true,
      });
    }

    // Call Google PageSpeed Insights API
    const strategies = ['mobile', 'desktop'];
    const results = await Promise.all(
      strategies.map(async (strategy) => {
        const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
          url
        )}&strategy=${strategy}&key=${apiKey}`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`PageSpeed API error: ${response.statusText}`);
        }

        return response.json();
      })
    );

    const [mobileData, desktopData] = results;

    // Extract scores and metrics from desktop data
    const lighthouseResult = desktopData.lighthouseResult;
    const categories = lighthouseResult.categories;
    const audits = lighthouseResult.audits;

    const performanceScore = Math.round((categories.performance?.score || 0) * 100);
    const accessibilityScore = Math.round((categories.accessibility?.score || 0) * 100);
    const bestPracticesScore = Math.round((categories['best-practices']?.score || 0) * 100);
    const seoScore = Math.round((categories.seo?.score || 0) * 100);
    const mobileScore = Math.round((mobileData.lighthouseResult.categories.performance?.score || 0) * 100);

    // Extract key metrics
    const metrics = {
      fcp: parseFloat((audits['first-contentful-paint']?.numericValue / 1000 || 0).toFixed(2)),
      lcp: parseFloat((audits['largest-contentful-paint']?.numericValue / 1000 || 0).toFixed(2)),
      cls: parseFloat((audits['cumulative-layout-shift']?.numericValue || 0).toFixed(3)),
      tbt: Math.round(audits['total-blocking-time']?.numericValue || 0),
      si: parseFloat((audits['speed-index']?.numericValue / 1000 || 0).toFixed(2)),
    };

    // Extract SEO issues
    const seoIssues: string[] = [];
    if (audits['meta-description']?.score === 0) {
      seoIssues.push('Missing or inadequate meta description');
    }
    if (audits['image-alt']?.score === 0) {
      seoIssues.push('Images missing alt text');
    }
    if (audits['link-text']?.score === 0) {
      seoIssues.push('Links with generic or unclear text');
    }

    // Count accessibility issues
    const accessibilityIssues = Object.values(audits)
      .filter(
        (audit: any) =>
          audit.scoreDisplayMode === 'binary' &&
          audit.score === 0 &&
          audit.id.includes('aria-') || audit.id.includes('color-contrast')
      ).length;

    return NextResponse.json({
      url,
      performance: {
        score: performanceScore,
        metrics,
      },
      accessibility: {
        score: accessibilityScore,
        issues: accessibilityIssues,
      },
      seo: {
        score: seoScore,
        issues: seoIssues,
      },
      bestPractices: {
        score: bestPracticesScore,
      },
      mobile: {
        score: mobileScore,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('PageSpeed API error:', error);

    // Return mock data if API fails or no API key
    console.log('⚠️ Returning mock data due to API failure or missing key');
    const mockScore = 75 + Math.floor(Math.random() * 15);
    
    return NextResponse.json({
      url,
      performance: {
        score: mockScore,
        metrics: {
          fcp: 1.2 + Math.random() * 0.5,
          lcp: 2.1 + Math.random() * 0.8,
          cls: 0.05 + Math.random() * 0.1,
          tbt: 150 + Math.floor(Math.random() * 100),
          si: 2.5 + Math.random() * 0.7,
        },
      },
      accessibility: {
        score: 88 + Math.floor(Math.random() * 10),
        issues: Math.floor(Math.random() * 5) + 1,
      },
      seo: {
        score: 82 + Math.floor(Math.random() * 12),
        issues: [
          'Missing meta description on some pages',
          'Some images missing alt text',
        ],
      },
      bestPractices: {
        score: 85 + Math.floor(Math.random() * 10),
      },
      mobile: {
        score: 80 + Math.floor(Math.random() * 12),
      },
      timestamp: new Date().toISOString(),
      mock: true,
    });
  }
}
