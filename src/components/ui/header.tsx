"use client";

import { Button } from "./button";
import { MenuIcon } from "./icons";
import Link from "next/link";
import Image from "next/image";
import menuStore from "@/store/menu";
import authStore from "@/store/auth";

export function Header() {
  const { toggle } = menuStore();
  const { user } = authStore();

  return (
    <header className="flex items-center justify-between container py-4 ">
      <Link href="/" aria-label="home">
        <Image src="/logo.png" alt="Rick and Morty" width={130} height={130} />
      </Link>

      <Button className={user ? "" : "hidden"} onClick={toggle}>
        <MenuIcon />
      </Button>
    </header>
  );
}
