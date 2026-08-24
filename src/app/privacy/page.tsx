import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig, fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} collects, uses and protects the personal information you share with us.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      crumb="Privacy"
      title="Privacy policy"
      description="What we collect, why we collect it, and what we will never do with it."
      updated="1 July 2026"
    >
      <section>
        <h2>What we collect</h2>
        <p>
          When you request a quote, subscribe to our newsletter or call our
          office, we collect the details you give us — typically your name,
          email address, phone number, service address and a description of the
          work you need. If you engage us, we also hold project documentation
          such as site photographs, load calculations and inspection records.
        </p>
        <p>
          Our website records standard, anonymous usage data (pages viewed,
          approximate region, device type) so we can keep the site fast and
          find broken pages. We do not run advertising trackers.
        </p>
      </section>

      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To prepare, deliver and support the work you asked us to quote.</li>
          <li>To meet permitting, inspection and warranty obligations.</li>
          <li>To send the newsletter, if and only if you asked for it.</li>
          <li>To improve the website and our service.</li>
        </ul>
      </section>

      <section>
        <h2>What we never do</h2>
        <p>
          We do not sell, rent or trade your personal information. We do not
          pass your details to lead-generation networks. The only third parties
          who see your data are the suppliers, lenders and authorities directly
          required to deliver your project — and only the fields they need.
        </p>
      </section>

      <section>
        <h2>How long we keep it</h2>
        <p>
          Enquiry records are kept for two years. Project and warranty records
          are retained for the life of the workmanship warranty (25 years) so
          that we can honour claims, plus any period required by Texas
          licensing and tax law.
        </p>
      </section>

      <section>
        <h2>Your choices</h2>
        <p>
          You can ask us for a copy of the information we hold about you, ask us
          to correct it, or ask us to delete anything we are not legally
          required to keep. Newsletter emails include a one-click unsubscribe
          link that works immediately.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Privacy questions go to{" "}
          <a
            href={siteConfig.emailHref}
            className="font-semibold text-brand-700 underline decoration-brand-300 decoration-2 underline-offset-4"
          >
            {siteConfig.email}
          </a>{" "}
          or by post to {siteConfig.legalName}, {fullAddress}. We respond within
          five business days.
        </p>
      </section>
    </LegalPage>
  );
}
