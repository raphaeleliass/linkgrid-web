"use client";
import UserCard from "@/components/ui/user-card";
import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function page() {
  const [userData, setUserData] = useState();
  const { username } = useParams();
  useEffect(() => {
    async function fetchUser() {
      try {
        const user = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/${username}`,
        ).then((res) => res.json);

        console.log(user);
      } catch {
        notFound();
      }
    }
  }, []);

  return (
    <div>
      <UserCard userData={userData} />
    </div>
  );
}
