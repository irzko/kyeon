import { Flex } from "@chakra-ui/react";

import CountDaysPage from "@/components/count-days";
import Background from "@/components/background";

export default function Page() {
  return (
    <>
      <Flex
        position="fixed"
        overflow="hidden"
        placeItems="center"
        inset="0"
        justify="center"
        align="center"
        direction="column"
      >
        {/* <XmasTheme /> */}
        <CountDaysPage />
        <Background />
      </Flex>
    </>
  );
}
