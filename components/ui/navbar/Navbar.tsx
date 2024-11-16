import { tv } from "tailwind-variants";

const navbar = tv({
  base: "flex z-40 w-full h-auto items-center justify-center inset-x-0 backdrop-blur-lg backdrop-saturate-150 bg-gray-900/70",
  variants: {
    position: {
      top: "top-0 sticky border-b border-b-gray-600",
      bottom: "fixed bottom-0 border-t border-t-gray-600",
    }
  }
});

export default function Navbar({
  children,
  position = "top",
}: Readonly<{
  children?: React.ReactNode;
  position?: "top" | "bottom";
}>) {
  return (
    <nav className={navbar({
position
    })}>
      <header className="z-40 flex px-6 gap-4 w-full flex-row relative flex-nowrap items-center justify-between h-16 max-w-screen-lg">
        {children}
      </header>
    </nav>
  );
}
