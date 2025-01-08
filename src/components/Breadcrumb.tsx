// ** React Imports
import { Fragment } from "react";

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
  items: { title: string; href: string }[];
};

const Breadcrumb = ({ items }: Props) => {
  return (
    <BreadcrumbComponent>
      <BreadcrumbList>
        {items.map((item, index) =>
          items.length !== index + 1 ? (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink href={item.href}>{item.title}</BreadcrumbLink>
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
