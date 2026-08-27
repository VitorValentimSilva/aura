import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "@i18n/navigation";
import { routing } from "@i18n/routing";
import { clientEnv } from "aura-config/client";
import { createAuraClient } from "aura-sdk";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";

interface SyncedUser {
  id: string;
  clerkId: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string | null;
}

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const { userId, getToken } = await auth();

  if (!userId) {
    redirect({ href: "/sign-in", locale });
  }

  const client = createAuraClient({
    baseUrl: clientEnv.NEXT_PUBLIC_API_URL,
    getAuthToken: async () => (await getToken()) ?? undefined,
  });

  const user = await client.http.request<SyncedUser>("/users/me");

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Bem-vindo, {user.firstName ?? user.email}</h1>
        <UserButton />
      </div>

      {user.imageUrl ? (
        <Image src={user.imageUrl} alt="" width={64} height={64} className="rounded-full" />
      ) : null}

      <p className="text-muted-foreground text-sm">{user.email}</p>
      <p className="text-muted-foreground text-xs">Synced from Clerk (clerkId: {user.clerkId})</p>
    </div>
  );
}
