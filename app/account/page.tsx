import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const {
    email,
    id,
    user_metadata: { avatar_url, full_name },
    app_metadata: { provider },
  } = user;

  const displayData = {
    "User ID": id,
    Email: email,
    "Full Name": full_name,
    "Avatar URL": avatar_url,
    Provider: provider,
  };

  return (
    <main className="pt-24 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold">Account Information</h1>
        <p className="mt-4 text-neutral-600 dark:text-neutral-400">
          Welcome back, {full_name || email}!
        </p>
        <div className="mt-6 p-4 bg-neutral-100 dark:bg-neutral-800 rounded-md">
          <h2 className="text-lg font-semibold">Your Details</h2>
          <div className="mt-4 space-y-2">
            {Object.entries(displayData).map(([key, value]) => (
              <div key={key} className="flex">
                <span className="w-32 font-medium text-neutral-700 dark:text-neutral-300">
                  {key}:
                </span>
                <span className="text-neutral-900 dark:text-neutral-100 break-all">
                  {String(value || "Not provided")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
