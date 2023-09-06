"use client";

import { SidebarNav } from "@/components/ui/sidebar";
import menuStore from "@/store/menu";

export default function Template({ children }: { children: React.ReactNode }) {
  const { show } = menuStore();
  const NAV_ITEMS = [
    { href: "/episodes", title: "Episodes" },
    { href: "/characters", title: "Characters" },
  ];

  return (
    <>
      <SidebarNav
        className={`bg-[var(--dark-electric-blue)] fixed h-screen top-0 left-0 z-40 ease-in-out duration-300 origin-left ${
          show ? "scale-x-100" : "scale-x-0"
        }`}
        items={NAV_ITEMS}
      />
      {children}
    </>
  );
}
