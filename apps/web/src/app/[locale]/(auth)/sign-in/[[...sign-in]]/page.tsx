import { SignIn } from "@clerk/nextjs";

interface SignInPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SignInPage({ params }: SignInPageProps) {
  const { locale } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        path={`/${locale}/sign-in`}
        routing="path"
        signUpUrl={`/${locale}/sign-up`}
        fallbackRedirectUrl={`/${locale}/dashboard`}
      />
    </div>
  );
}
