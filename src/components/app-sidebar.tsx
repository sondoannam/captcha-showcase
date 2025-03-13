"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useBreadcrumbStore } from "@/stores/useBreadcrumbStore";

import { AudioLines, Bot, Cloud, Image, SquareSigma } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Menu items.
const items = [
  {
    title: "Google reCaptcha",
    url: "/",
    icon: Cloud,
  },
  {
    title: "Others",
    url: "/others",
    icon: Bot,
    subItems: [
      {
        title: "Text-Image",
        url: "/others/text-image",
        icon: Image,
      },
      {
        title: "Voice",
        url: "/others/voice",
        icon: AudioLines,
      },
      {
        title: "Logical",
        url: "/others/logical",
        icon: SquareSigma,
      },
    ],
  },
];

export function AppSidebar() {
  const { setBreadcrumbs } = useBreadcrumbStore();
  const { push } = useRouter();
  const pathname = usePathname();

  // Function to handle navigation and set breadcrumbs
  const handleNavigation = (
    itemUrl: string,
    itemTitle: string,
    parentTitle?: string
  ) => {
    const breadcrumbs = [];

    // For sub-items, add parent item first
    if (parentTitle) {
      // Find parent URL
      const parentItem = items.find((item) => item.title === parentTitle);
      if (parentItem) {
        breadcrumbs.push({ label: parentTitle, to: parentItem.url });
      }
    }

    // Add current item to breadcrumbs
    breadcrumbs.push({ label: itemTitle, to: itemUrl });

    // Set breadcrumbs and navigate
    setBreadcrumbs(breadcrumbs);
    push(itemUrl);
  };

  // Set initial breadcrumbs based on current URL
  useEffect(() => {
    if (pathname) {
      // Find matching item
      const breadcrumbs = [];

      for (const item of items) {
        if (pathname === item.url) {
          breadcrumbs.push({ label: item.title, to: item.url });
          break;
        } else if (pathname.startsWith(item.url + "/") && item.subItems) {
          breadcrumbs.push({ label: item.title, to: item.url });

          // Find matching sub-item
          const subItem = item.subItems.find((sub) => pathname === sub.url);
          if (subItem) {
            breadcrumbs.push({ label: subItem.title, to: subItem.url });
          }
          break;
        }
      }

      if (breadcrumbs.length > 0) {
        setBreadcrumbs(breadcrumbs);
      }
    }
  }, [pathname, setBreadcrumbs]);

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Captcha Demo</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    className={cn(
                      "p-3 flex items-center gap-3 text-base",
                      pathname === item.url && "bg-sidebar-accent"
                    )}
                    onClick={() => handleNavigation(item.url, item.title)}
                    tooltip={item.title}
                  >
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>

                  {item.subItems && pathname.startsWith(item.url) && (
                    <div className="pl-6 group-data-[collapsible=icon]:pl-0">
                      {item.subItems.map((subItem) => (
                        <SidebarMenuButton
                          key={subItem.url}
                          className={cn(
                            "p-3 flex items-center gap-3 text-sm",
                            pathname === subItem.url && "bg-sidebar-accent"
                          )}
                          onClick={() =>
                            handleNavigation(
                              subItem.url,
                              subItem.title,
                              item.title
                            )
                          }
                          tooltip={subItem.title}
                        >
                          <subItem.icon className="h-4 w-4" />
                          <span>{subItem.title}</span>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
