import { UserData } from "@/context/userContext";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Skeleton } from "./skeleton";

export default function UserCard({ userData }: { userData: UserData | null }) {
  return (
    <div className="bg-muted-foreground/40 min-h-120 w-full max-w-sm rounded-3xl p-4 shadow-2xl backdrop-blur-2xl">
      <div className="flex w-full flex-col items-center justify-center text-center">
        {userData ? (
          <>
            <Avatar className="size-14 drop-shadow-2xl">
              <AvatarImage />
              <AvatarFallback>
                {userData?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h2 className="text-background mt-2 text-2xl font-semibold">
              {userData?.name ? userData?.name : userData?.username}
            </h2>

            <p className="text-muted text-sm font-medium drop-shadow-2xl">
              @{userData?.username}
            </p>
          </>
        ) : (
          <>
            <Skeleton className="size-14 rounded-full" />
            <Skeleton className="mt-4 h-6 w-28" />
            <Skeleton className="mt-2 h-4 w-24" />
          </>
        )}
      </div>

      <div className="mt-8 space-y-2">
        {userData
          ? userData?.links?.map((link) => (
              <div key={link.id}>
                <a href={link.href} target="_blank" rel="noreferrer noopener">
                  <Button className="w-full shadow-xl backdrop-blur-lg bg-white/40 text-background hover:bg-white" variant={"secondary"}>
                    {link.title}
                  </Button>
                </a>
              </div>
            ))
          : Array.from({ length: 4 }, (_, index) => (
              <Skeleton className="h-10 w-full" key={index} />
            ))}
      </div>
    </div>
  );
}
