import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/breadcrumbs";

interface BreadcrumbsProps {
  categorie: string;
}

export default function BreadcrumbsShop({ categorie }: BreadcrumbsProps) {
  return (
    <Breadcrumbs
      maxItems={2}
      itemsBeforeCollapse={1}
      itemsAfterCollapse={1}
      className="mb-7 tabletgrande:hidden"
    >
      <BreadcrumbItem href="#home">Home</BreadcrumbItem>
      <BreadcrumbItem href="#home">Shop</BreadcrumbItem>
      {categorie === "iphone" && <BreadcrumbItem>iPhones</BreadcrumbItem>}
      {categorie === "android" && <BreadcrumbItem>Androids</BreadcrumbItem>}
      {categorie === "smartwatch" && (
        <BreadcrumbItem>Smartwatchs</BreadcrumbItem>
      )}
      {categorie === "fone" && <BreadcrumbItem>Fone Bluetooth</BreadcrumbItem>}
      {categorie === "blackfriday" && (
        <BreadcrumbItem>Black Friday</BreadcrumbItem>
      )}
    </Breadcrumbs>
  );
}
