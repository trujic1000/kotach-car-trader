import React from "react";
import PropTypes from "prop-types";
import {Box, Flex, Heading, Image, useColorModeValue} from "@chakra-ui/react";
import {NextSeo} from "next-seo";

import {toPrice} from "../../../../utils";
import {carType} from "../../../cars";
import {getCarById} from "../../../../lib/api";
import {imageBuilder} from "../../../../lib/sanity";

export default function CarDetails({car}) {
  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("black", "white");

  if (!car) {
    return (
      <>
        <NextSeo
          title="Car not found"
          description="Car you are looking for cannot be found"
        />
        <Heading as="h1" size="xl" isTruncated>
          Sorry, car not found!
        </Heading>
      </>
    );
  }
  return (
    <>
      <NextSeo
        title={`${car.year} ${car.make} ${car.model}`}
        description={`Used ${car.year} ${car.make}  
        ${car.model} for sale for ${toPrice(car.price)}`}
      />
      <Box boxShadow="md" margin="auto" padding={4} bg={bg} color={color}>
        <Flex borderRadius="lg" direction={{base: "column", md: "row"}}>
          <Image
            src={imageBuilder(car.image).url()}
            alt={`${car.year} ${car.make} ${car.model}`}
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
              {`${car.year} ${car.make} ${car.model}`}
            </Box>
            <Box fontSize="xl">{toPrice(car.price)}</Box>
            <CarInfo title="Year" data={car.year} />
            <CarInfo title="Miles" data={car.miles.toLocaleString("en-US")} />
            <CarInfo title="Fuel Type" data={car.fuelType} />
            <CarInfo title="Details" data={car.details} />
          </Box>
        </Flex>
      </Box>
    </>
  );
}

export async function getServerSideProps({params}) {
  const {id} = params;
  const car = await getCarById(id);
  return {
    props: {car: car || null},
  };
}

CarDetails.propTypes = {
  car: carType,
};

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

CarInfo.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.any.isRequired,
};
