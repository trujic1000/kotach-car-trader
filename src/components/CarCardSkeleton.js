import React from "react";
import uuid from "react-uuid";
import {
  Box,
  useColorModeValue,
  Skeleton,
  SkeletonText,
  GridItem,
  useMediaQuery,
} from "@chakra-ui/react";
import theme from "../theme";

export default function CarCardSkeleton() {
  const [isLargerThanLg] = useMediaQuery(
    `(min-width: ${theme.breakpoints.lg})`,
  );
  const numberOfSkeletons = isLargerThanLg ? 4 : 2;

  return [...Array(numberOfSkeletons)].map(() => (
    <GridItem key={uuid()}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"lg"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <SkeletonText
          width={"50%"}
          noOfLines={2}
          mt={4}
          mb={2}
          spacing={4}
          h={"54px"}
        />
        <Skeleton
          bg={"gray.100"}
          mx={-6}
          pos={"relative"}
          h={{base: "250px", xl: "350px"}}
        />
        <SkeletonText
          mt={6}
          noOfLines={6}
          spacing={4}
          h={{base: "240px", xl: "168px", "2xl": "144px"}}
        />
      </Box>
    </GridItem>
  ));
}
