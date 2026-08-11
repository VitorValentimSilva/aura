import { LandingTheme } from "@components/landing/landing-theme";
import { ReactNode } from "react";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <LandingTheme>{children}</LandingTheme>;
}
