import { Box, Container } from "@chakra-ui/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Box
        bgColor="#000"
        bgImage="linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)"
        bgSize="1rem 1rem"
        position="fixed"
        inset={0}
        overflow="auto"
      ></Box>

      <Container maxW="xl">{children}</Container>
    </main>
  );
}
