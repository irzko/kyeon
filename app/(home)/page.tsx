import XmasTheme from "@/components/xmas-theme";
import { Box } from "@chakra-ui/react";

// import CountDaysPage from "@/components/count-days";

export default function Page() {
  return (
    <>
      <Box
      display="flex"
      position="fixed"
      overflow="hidden"
      placeItems="center"
      inset="0"
      justifyContent="center"
      alignItems='center'
      flexDirection="column">
        <XmasTheme />
        {/* <CountDaysPage /> 
        <Background /> */}
      </Box>
    </>
  );
}
