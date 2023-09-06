"use client";
import LinkCard from "@/components/ui/link-card";
import authStore from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user } = authStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [router, user]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-evenly">
        <LinkCard title="Characters" url="/characters" img="/characters.jpg" />
        <LinkCard title="Episodes" url="/episodes" img="/episodes.jpg" />
      </div>
    </div>
  );
}
