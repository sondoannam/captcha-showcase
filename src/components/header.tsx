"use client";

import { SidebarTrigger } from "./ui/sidebar";
import { Separator } from "./ui/separator";
import HeaderBreadCrumbs from "./header-breadcrumbs";

import { useBreadcrumbStore } from "@/stores/useBreadcrumbStore";

const Header = () => {
  const { breadcrumbs } = useBreadcrumbStore();

  return (
    <header className="w-full max-w-[1240px] mx-auto flex h-16 shrink-0 items-center gap-2 border-b xl:px-4 3xl:px-6">
      <SidebarTrigger className="-ml-1 h-8 w-8" />
      <Separator orientation="vertical" className="mr-2 !h-8" />
      {/* <ModeToggle /> */}
      {/* <Separator orientation="vertical" className="mr-2 h-4" /> */}
      <HeaderBreadCrumbs
        links={[
          //   ...(currentRoute
          //     ? [{ to: currentRoute.to, label: currentRoute.label }]
          //     : []),
          ...breadcrumbs,
        ]}
      />
    </header>
  );
};

export default Header;
