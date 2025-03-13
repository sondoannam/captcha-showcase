import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  BreadcrumbLinkItem,
  useBreadcrumbStore,
} from "@/stores/useBreadcrumbStore";
import { useRouter } from "next/navigation";

interface HeaderBreadCrumbsProps {
  links: BreadcrumbLinkItem[];
}

const HeaderBreadCrumbs = ({ links }: HeaderBreadCrumbsProps) => {
  const { onNavigate } = useBreadcrumbStore((state) => state);
  const { push } = useRouter();

  return (
    <Breadcrumb>
      <BreadcrumbList className="body2 text-gray-400">
        {links.map((link, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {index !== links.length - 1 && links.length > 1 ? (
                <button onClick={() => onNavigate(link.to, index, push)}>
                  <BreadcrumbLink>{link.label}</BreadcrumbLink>
                </button>
              ) : (
                <BreadcrumbLink className="cursor-text">
                  {link.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index !== links.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default HeaderBreadCrumbs;
