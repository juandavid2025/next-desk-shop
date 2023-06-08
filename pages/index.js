import { useSession } from "next-auth/react";

import Welcome from "@/components/home/welcome/welcome";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { data, status } = useSession();
  const isLoggedIn = data && status === "authenticated";

  if (status === "loading") {
    return <p className="center">Loading...</p>;
  }

  if (isLoggedIn) {
    router.replace("/shop");
  }

  return <div>{!isLoggedIn && <Welcome />}</div>;
}
