import React from "react";
import {useRouter} from "next/router";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import {
  Box,
  Grid,
  GridItem,
  Select,
  FormLabel,
  FormControl,
  useColorModeValue,
} from "@chakra-ui/react";

import {getMakes} from "../database/getMakes";
import {toPrice} from "../lib/toPrice";

const prices = [500, 100, 5000, 15000, 25000, 50000, 250000];

export default function Home({makes}) {
  const {query} = useRouter();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const bg = useColorModeValue("gray.50", "gray.900");
  const color = useColorModeValue("black", "white");
  return (
    <Box
      bg={bg}
      color={color}
      margin="auto"
      padding={4}
      maxWidth="600"
      boxShadow="lg"
    >
      <form>
        <Grid
          gridTemplateColumns={{base: "1fr", md: "1fr 1fr"}}
          columnGap={6}
          rowGap={4}
        >
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="make">Make</FormLabel>
              <Select
                id="make"
                variant="outline"
                defaultValue={query.make || "all"}
                {...register("make")}
              >
                <option value="all">All Makes</option>
                {makes.map((make) => (
                  <option
                    key={make.make}
                    value={make.make}
                  >{`${make.make} (${make.count})`}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="model">Model</FormLabel>
              <Select
                id="model"
                variant="outline"
                defaultValue={query.model || "all"}
                {...register("model")}
              >
                <option value="all">All Models</option>
                {makes.map((make) => (
                  <option
                    key={make.make}
                    value={make.make}
                  >{`${make.make} (${make.count})`}</option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="minPrice">Min Price</FormLabel>
              <Select
                id="minPrice"
                variant="outline"
                defaultValue={query.minPrice || "all"}
                {...register("minPrice")}
              >
                <option value="all">No Min</option>
                {prices.map((price) => (
                  <option key={price} value={price}>
                    {toPrice(price)}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="maxPrice">Max Price</FormLabel>
              <Select
                id="maxPrice"
                variant="outline"
                defaultValue={query.maxPrice || "all"}
                {...register("maxPrice")}
              >
                <option value="all">No Max</option>
                {prices.map((price) => (
                  <option key={price} value={price}>
                    {toPrice(price)}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
}

export async function getServerSideProps() {
  const makes = await getMakes();
  return {props: {makes}};
}

export const makeType = PropTypes.shape({
  make: PropTypes.string,
  count: PropTypes.number,
});

Home.propTypes = {
  makes: PropTypes.arrayOf(makeType),
};
