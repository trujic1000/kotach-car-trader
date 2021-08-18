import NextLink from "next/link";
import {
  Box,
  Flex,
  Text,
  Stack,
  Link,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";

import {DarkModeSwitch} from "../components/DarkModeSwitch";

export default function Nav() {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Box>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{base: 2}}
        px={{base: 4}}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex flex={{base: 1}} justify={{base: "center", md: "start"}}>
          <Link
            as={NextLink}
            href={"/"}
            textAlign={useBreakpointValue({base: "center", md: "left"})}
            fontFamily={"heading"}
            color={useColorModeValue("gray.800", "white")}
          >
            Kotach Car Trader
          </Link>
        </Flex>

        <Stack
          flex={{base: 1, md: 0}}
          justify={"flex-end"}
          direction={"row"}
          spacing={6}
          mr={14}
        >
          <Link
            as={NextLink}
            p={2}
            href={"/"}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            Home
          </Link>
          <Link
            as={NextLink}
            p={2}
            href={"/faq"}
            fontSize={"sm"}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: "none",
              color: linkHoverColor,
            }}
          >
            FAQ
          </Link>
        </Stack>
      </Flex>
      <DarkModeSwitch />
    </Box>
  );
}
