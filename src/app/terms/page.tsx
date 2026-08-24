import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply to using the ${siteConfig.name} website and to the quotes and estimates published on it.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      crumb="Terms"
      title="Terms of service"
      description="The terms that apply to this website, our quotes and the estimates published here."
      updated="1 July 2026"
    >
      <section>
        <h2>About these terms</h2>
        <p>
          These terms govern your use of the {siteConfig.name} website. Work we
          carry out for you is governed separately by the written contract and
          scope attached to your accepted quote, which prevails over anything on
          this site if the two ever conflict.
        </p>
      </section>

      <section>
        <h2>Estimates and calculators</h2>
        <p>
          The savings calculator and any figures shown on this site are
          indicative models based on published utility rates and typical system
          performance. They are not quotes, guarantees or financial advice.
          Actual production, savings and payback depend on your roof, your
          consumption, your utility tariff and your tax position.
        </p>
        <p>
          A binding figure only exists once we have issued you a written,
          signed fixed-price quote following a site survey.
        </p>
      </section>

      <section>
        <h2>Quotes</h2>
        <ul>
          <li>Quotes are valid for 30 days from the date of issue.</li>
          <li>
            Prices include permits, inspections, materials and labour for the
            stated scope unless expressly excluded.
          </li>
          <li>
            Variations are priced and approved in writing before any additional
            work proceeds.
          </li>
        </ul>
      </section>

      <section>
        <h2>Warranty</h2>
        <p>
          Our 25-year workmanship warranty covers defects arising from how we
          installed the equipment. Equipment itself is covered by the
          manufacturer&apos;s warranty; we administer those claims on your
          behalf. The warranty does not cover damage caused by third-party
          alteration, misuse, storm damage or normal consumable wear.
        </p>
      </section>

      <section>
        <h2>Licensing</h2>
        <p>
          All electrical work is performed under Texas Electrical Contractor
          licence TECL #31102 and supervised by a licensed master electrician.
          Current certificates of insurance and licence are available on
          request.
        </p>
      </section>

      <section>
        <h2>Website content</h2>
        <p>
          Text, artwork and photography on this site belong to{" "}
          {siteConfig.legalName}. Project figures are drawn from real jobs and
          are published with the client&apos;s permission. We keep this site
          accurate but do not warrant that every specification remains current,
          as manufacturers revise products without notice.
        </p>
      </section>
    </LegalPage>
  );
}
