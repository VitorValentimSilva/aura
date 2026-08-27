import { LandingAiSection } from "@/components/landing/landing-ai-section";
import { LandingCtaSection } from "@/components/landing/landing-cta-section";
import { LandingDashboardSection } from "@/components/landing/landing-dashboard-section";
import { LandingFaqSection } from "@/components/landing/landing-faq-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";
import { LandingHeroSection } from "@/components/landing/landing-hero-section";
import { LandingIntegrationsSection } from "@/components/landing/landing-integrations-section";
import { LandingModulesSection } from "@/components/landing/landing-modules-section";
import { LandingPricingSection } from "@/components/landing/landing-pricing-section";

export default function LandingPage() {
  return (
    <>
      <LandingHeader />

      <main className="container mx-auto flex max-w-7xl flex-col items-center justify-between px-5">
        <LandingHeroSection />

        <LandingModulesSection />

        <LandingAiSection />

        <LandingDashboardSection />

        <LandingIntegrationsSection />

        <LandingPricingSection />

        <LandingFaqSection />

        <LandingCtaSection />
      </main>

      <LandingFooter />
    </>
  );
}
