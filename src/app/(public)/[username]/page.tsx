import UserCard from "@/components/ui/user-card";
import { UserData } from "@/context/userContext";
import { notFound } from "next/navigation";

export default async function User({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/users/${username}`,
    { next: { revalidate: 10 } },
  );

  if (!res.ok) {
    return notFound();
  }

  const userData: UserData = await res.json();

  return (
    <main className="grid min-h-dvh grid-cols-1">
      <div className="relative flex w-full bg-gradient-to-b from-sky-500 to-rose-500">
        <div className="absolute top-1/2 w-full place-content-center justify-items-center">
          <UserCard userData={userData} />
        </div>
      </div>

      <div className="w-full" />
    </main>
  );
}
