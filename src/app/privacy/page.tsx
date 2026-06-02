import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Web Design Pros 365",
  description: "How we handle cookies, analytics, and the personal information you share with us.",
};

export default function PrivacyPage() {
  return (
    <article className="pt-32 pb-20 max-w-3xl mx-auto px-6 text-gray-800">
      <header className="mb-12">
        <p className="text-xs uppercase tracking-wider text-[#8734E1] mb-3">Legal</p>
        <h1 className="heading-xl mb-4">Privacy Policy</h1>
        <p className="text-sm text-gray-500">Last updated: June 2, 2026</p>
      </header>

      <section className="space-y-8 leading-relaxed">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">The short version</h2>
          <p>
            We collect the minimum information we need to run the website and respond to people who
            reach out. We do not sell your data. We do not run ad pixels. We use cookies for essential
            site function and (with your consent) for first-party analytics so we can see what content
            is useful. You can reject non-essential cookies and the site still works fine.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Cookies we use</h2>
          <ul className="space-y-3">
            <li>
              <strong className="text-gray-900">Essential</strong>: session management, anti-spam,
              your cookie-consent choice itself. These load whether or not you accept the banner.
            </li>
            <li>
              <strong className="text-gray-900">Analytics</strong> (only with your consent): Google
              Analytics 4 and Vercel Analytics. We use these to understand which pages people read
              and where they get stuck. No cross-site tracking, no advertising IDs.
            </li>
          </ul>
          <p className="mt-3">
            Pressing <em>Reject All</em> on the banner blocks the analytics cookies. You can change
            your mind any time by clearing your browser&apos;s local storage for this site and
            reloading.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Information you send us</h2>
          <p>
            When you fill out a contact form, schedule a call, or email us, we keep the information
            you provide (name, email, phone, message, project details) so we can respond. We store
            it in Supabase (Postgres) with row-level security, and we forward a notification to our
            team email. We keep contact submissions for up to 24 months and then delete them, unless
            we have an active or recent engagement with you.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">AI assistant on this site</h2>
          <p>
            If you use the AI assistant on our site, your messages are sent to our ACI platform
            (which routes to Anthropic Claude) so it can answer in real time. We log the conversation
            so we can improve the assistant and respond if you ask us to follow up. We do not train
            third-party models on your messages. We do not share them with anyone outside our team.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Your rights</h2>
          <p>
            Email us at <a className="text-[#8734E1] hover:underline" href="mailto:info@webdesignpros365.com">info@webdesignpros365.com</a> if
            you want to see, correct, or delete the information we have about you. We respond within
            7 business days.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Contact</h2>
          <p>
            Web Design Pros 365<br />
            Denver, Colorado, USA<br />
            <a className="text-[#8734E1] hover:underline" href="mailto:info@webdesignpros365.com">info@webdesignpros365.com</a><br />
            +1 (720) 276-0797
          </p>
        </div>

        <div className="pt-6 border-t border-gray-200">
          <Link href="/" className="text-[#8734E1] hover:underline text-sm">
            ← Back to home
          </Link>
        </div>
      </section>
    </article>
  );
}
