import Link from "next/link";
import { ReactNode } from "react";
import { tv } from "tailwind-variants";

const buttonStyles = tv({
  base: "flex justify-center items-center font-medium tap-highlight-transparent no-underline",
  variants: {
    color: {
      default:
        "text-white focus:ring-4 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-blue-800",
      light:
        "focus:outline-none focus:ring-4 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700",
      danger:
        "focus:outline-none focus:ring-4 bg-red-600 text-white hover:bg-red-700 focus:ring-red-900",
      dark:
        "text-white focus:outline-none focus:ring-4 bg-gray-800 hover:bg-gray-700 focus:ring-gray-700 border-gray-700"
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      full: "rounded-full",
    },
    size: {
      sm: "text-xs px-3 min-w-16 h-8",
      md: "text-sm px-4 min-w-20 h-10",
      lg: "text-md px-6 min-w-24 h-12",
    },

    isIconOnly: {
      true: "px-0",
    },
  },
  compoundVariants: [
    {
      size: "sm",
      isIconOnly: true,
      className: "min-w-8 w-8 h-8",
    },
    {
      size: "md",
      isIconOnly: true,
      className: "min-w-10 w-10 h-10",
    },
    {
      size: "lg",
      isIconOnly: true,
      className: "min-w-12 w-12 h-12",
    },
  ],
});

export default function ButtonLink({
  children,
  className,
  radius = "md",
  size = "md",
  color = "default",
  href,
  isIconOnly,
}: Readonly<{
  children: ReactNode;
  className?: string;
  radius?: "none" | "sm" | "md" | "lg" | "full";
  size?: "sm" | "md" | "lg";
  href: string;
  color?: "default" | "light" | "dark" | "danger";
  isIconOnly?: boolean;
}>): JSX.Element {
  return (
    <Link
      href={href}
      className={buttonStyles({
        className,
        radius,
        color,
        size,
        isIconOnly,
      })}
    >
      {children}
    </Link>
  );
}
