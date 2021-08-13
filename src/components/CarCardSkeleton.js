import React from "react";
import {
  Box,
  useColorModeValue,
  Skeleton,
  SkeletonText,
  GridItem,
} from "@chakra-ui/react";

export default function CarCardSkeleton() {
  return (
    <GridItem>
      <Box
        w={"full"}
        height={"668px"}
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"lg"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <SkeletonText noOfLines={2} mt={4} mb={2} spacing={4} height={"54px"} />
        <Skeleton h={"350px"} bg={"gray.100"} mx={-6} mb={6} pos={"relative"} />
        <SkeletonText noOfLines={7} spacing={4} height={"168px"} />
      </Box>
    </GridItem>
  );
}
