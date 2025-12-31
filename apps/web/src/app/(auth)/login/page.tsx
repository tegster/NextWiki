import { Suspense } from "react";
import { getSettingValue } from "~/lib/utils/settings";
import { LoginPageClient } from "./login-page-client";

export default async function LoginPage() {
  const allowRegistration = await getSettingValue("auth.allowRegistration");

  return (
    <Suspense fallback={<div className="bg-background-paper flex min-h-screen items-center justify-center">Loading...</div>}>
      <LoginPageClient allowRegistration={allowRegistration === true} />
    </Suspense>
  );
}
