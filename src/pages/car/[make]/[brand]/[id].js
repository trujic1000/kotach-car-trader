import React from "react";
import PropTypes from "prop-types";
import {Box, Flex, Image, useColorModeValue} from "@chakra-ui/react";

import {openDB} from "../../../../openDB";
import {toPrice} from "../../../../lib/toPrice";

export default function CarDetails({car}) {
  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("black", "white");

  if (!car) {
    return (
      <Heading as="h1" size="xl" isTruncated>
        Sorry, car not found!
      </Heading>
    );
  }
  return (
    <Box boxShadow="md" margin="auto" padding={4} bg={bg} color={color}>
      <Flex borderRadius="lg" direction={{base: "column", md: "row"}}>
        <Image
          src={car.photoUrl}
          alt={car.make + " " + car.model}
          maxWidth={{md: "50%", lg: "100%"}}
        />
        <Box px={{base: 0, md: 4}}>
          <Box
            fontWeight="semibold"
            as="h1"
            fontSize="2xl"
            lineHeight="tight"
            pt={{base: 2, md: 0}}
            isTruncated
          >
            {car.make + " " + car.model}
          </Box>
          <Box fontSize="xl">{toPrice(car.price)}</Box>
          <CarInfo title="Year" data={car.year} />
          <CarInfo title="KMs" data={car.kilometers} />
          <CarInfo title="Fuel Type" data={car.fuelType} />
          <CarInfo title="Details" data={car.details} />
        </Box>
      </Flex>
    </Box>
  );
}

const CarInfo = ({title, data}) => {
  const color = useColorModeValue("gray.600", "gray.400");
  return (
    <Box color={color} fontSize="sm" mt={2}>
      <Box as="span" fontWeight="semibold">
        {`${title}: `}
      </Box>
      {data}
    </Box>
  );
};

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
