import React from "react";
import NextLink from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";
import {
  Link,
  Box,
  GridItem,
  Text,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import {toPrice} from "../utils";
import {imageBuilder} from "../lib/sanity";

export const CarCard = ({car}) => (
  <GridItem>
    <NextLink
      href="/car/[make]/[model]/[id]"
      as={`/car/${car.make}/${car.model}/${car.id}`}
      passHref
    >
      <Link style={{textDecoration: "none"}}>
        <Box
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"lg"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
          w={"full"}
        >
          <Stack mb={6} direction={"column"} spacing={0}>
            <Text fontSize={"xl"} fontWeight={600}>
              {car.make + " " + car.model}
            </Text>
            <Text fontSize={"md"} color={"gray.500"}>
              {toPrice(car.price)}
            </Text>
          </Stack>
          <Box
            bg={"gray.100"}
            mx={-6}
            pos={"relative"}
            h={{base: "250px", xl: "350px"}}
          >
            <Image src={imageBuilder(car.image).url()} layout={"fill"} />
          </Box>
          <Text mt={6} color={"gray.500"}>
            {car.details}
          </Text>
        </Box>
      </Link>
    </NextLink>
  </GridItem>
);

export const carType = PropTypes.shape({
  id: PropTypes.number,
  make: PropTypes.string,
  model: PropTypes.string,
  year: PropTypes.number,
  fuelType: PropTypes.string,
  kilometers: PropTypes.number,
  details: PropTypes.string,
  price: PropTypes.number,
  photoUrl: PropTypes.string,
});

CarCard.propTypes = {
  cars: carType,
};
