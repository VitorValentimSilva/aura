import { SignUp } from "@clerk/nextjs";

interface SignUpPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SignUpPage({ params }: SignUpPageProps) {
  const { locale } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        path={`/${locale}/sign-up`}
        routing="path"
        signInUrl={`/${locale}/sign-in`}
        fallbackRedirectUrl={`/${locale}/dashboard`}
      />
    </div>
  );
}
