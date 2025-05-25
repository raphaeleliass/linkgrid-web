import { UserData } from "@/context/userContext";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Button } from "./button";
import { Skeleton } from "./skeleton";

export default function UserCard({ userData }: { userData: UserData | null }) {
  return (
    <div className="bg-primary-foreground min-h-120 w-full max-w-sm rounded-lg border p-4">
      <div className="flex w-full flex-col items-center justify-center text-center">
        {userData ? (
          <>
            <Avatar className="size-14">
              <AvatarImage />
              <AvatarFallback>
                {userData?.name?.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <h2 className="mt-2 text-lg font-semibold">
              {userData?.name ? userData?.name : userData?.username}
            </h2>

            <p className="text-muted-foreground text-sm font-light">
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
          ? userData?.links.map((link) => (
              <div key={link.id}>
                <Button className="w-full" variant={"secondary"}>
                  {link.title}
                </Button>
              </div>
            ))
          : Array.from({ length: 4 }, (_, index) => (
              <Skeleton className="h-10 w-full" key={index} />
            ))}
      </div>
    </div>
  );
}
