import { tv } from "tailwind-variants";

const navbarItemStyles = tv({
  base: "text-medium whitespace-nowrap box-border list-none",
});

export default function NavbarItem({
  children,
  as,
  className,
}: Readonly<{
  children?: React.ReactNode;
  as?: React.ElementType;
  className?: string;
}>) {
  const Component = as || "li";
  return <Component className={navbarItemStyles({className})}>{children}</Component>;
}
