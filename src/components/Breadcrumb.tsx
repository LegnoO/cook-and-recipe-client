// ** React Imports
import { Fragment } from "react";

// ** Next Imports
import Link from "next/link";

// ** Components
import {
  Breadcrumb as BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// ** Types
type Props = {
  items: { title: string; href?: string }[];
};

const Breadcrumb = ({ items }: Props) => {
  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        {items.map((item, index) =>
          items.length !== index + 1 ? (
            <Fragment key={index}>
              <BreadcrumbItem>
                <Link href={item.href || "#"}>{item.title}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ) : (
            <BreadcrumbItem key={index}>
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            </BreadcrumbItem>
          ),
        )}
      </BreadcrumbList>
    </BreadcrumbComponent>
  );
};

export default Breadcrumb;
