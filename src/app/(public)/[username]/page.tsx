"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";

interface UserData {
  name: string;
  username: string;
  links: [];
}

export default function page() {
  const { username } = useParams();

  const [user, setUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    async function handleUserSearch() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/${username}`,
          {
            next: {
              revalidate: 10,
            },
            method: "GET",
          },
        ).then((res) => res.json());

        console.log(response);
        setUser(response);
      } catch (err) {
        console.log("erro");
      }
    }

    handleUserSearch();
  }, [username]);

  return (
    <div>
      {user?.name},{user?.links.map((link) => <div>{link}</div>)}
    </div>
  );
}
