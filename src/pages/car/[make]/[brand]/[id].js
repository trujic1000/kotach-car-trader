import React from "react";
import PropTypes from "prop-types";
import {Box, Flex, Image} from "@chakra-ui/react";

import {openDB} from "../../../../openDB";

const toPrice = (number) =>
  number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

export default function CarDetails({car}) {
  if (!car) {
    return (
      <Heading as="h1" size="xl" isTruncated>
        Sorry, car not found!
      </Heading>
    );
  }
  return (
    <Box background="white" boxShadow="md" margin="auto" padding={4}>
      <Flex borderRadius="lg" direction={{base: "column", lg: "row"}}>
        <Image
          src={car.photoUrl}
          alt={car.make + " " + car.model}
          maxWidth={{lg: "50%", xl: "100%"}}
        />
        <Box px={{base: 0, lg: 4}} color="gray.900">
          <Box
            fontWeight="semibold"
            as="h1"
            fontSize="2xl"
            lineHeight="tight"
            pt={{base: 2, lg: 0}}
            isTruncated
          >
            {car.make + " " + car.model}
          </Box>
          <Box fontSize="xl">{toPrice(car.price)}</Box>
          <Box color="gray.600" fontSize="sm" mt={2}>
            <Box as="span" fontWeight="semibold">
              {"Year: "}
            </Box>
            {car.year}
          </Box>
          <Box color="gray.600" fontSize="sm" mt={1}>
            <Box as="span" fontWeight="semibold">
              {"KMs: "}
            </Box>
            {car.kilometers}
          </Box>
          <Box color="gray.600" fontSize="sm" mt={1}>
            <Box as="span" fontWeight="semibold">
              {"Fuel Type: "}
            </Box>
            {car.fuelType}
          </Box>
          <Box color="gray.600" fontSize="sm" mt={1}>
            <Box as="span" fontWeight="semibold">
              {"Details: "}
            </Box>
            {car.details}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export async function getServerSideProps(ctx) {
  const {id} = ctx.params;
  const db = await openDB();
  const car = await db.get("SELECT * FROM Car where id = ?", id);
  return {
    props: {car: car || null},
  };
}

CarDetails.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.number,
    make: PropTypes.string,
    model: PropTypes.string,
    year: PropTypes.number,
    fuelType: PropTypes.string,
    kilometers: PropTypes.number,
    details: PropTypes.string,
    price: PropTypes.number,
    photoUrl: PropTypes.string,
  }),
};
