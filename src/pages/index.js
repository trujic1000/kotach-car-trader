import React from "react";
import {useRouter} from "next/router";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import useSWR from "swr";
import {
  Box,
  Grid,
  GridItem,
  Select,
  FormLabel,
  FormControl,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

import {getMakes} from "../database/getMakes";
import {getModels} from "../database/getModels";
import {toPrice} from "../lib/toPrice";
import {getAsString} from "../lib/getAsString";

const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

export default function Home({makes, models}) {
  const router = useRouter();
  const {register, watch, handleSubmit} = useForm({
    defaultValues: {
      make: getAsString(router.query.make) || "all",
      model: getAsString(router.query.model) || "all",
      minPrice: getAsString(router.query.minPrice) || "all",
      maxPrice: getAsString(router.query.maxPrice) || "all",
    },
  });
  const watchMake = watch("make");

  const onSubmit = (data) => {
    router.push(
      {
        pathname: "/",
        query: {...data, page: 1},
      },
      undefined,
      {shallow: true},
    );
  };

  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("black", "white")}
      margin="auto"
      padding={4}
      maxWidth="600"
      boxShadow="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          gridTemplateColumns={{base: "1fr", md: "1fr 1fr"}}
          columnGap={6}
          rowGap={4}
        >
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="make">Make</FormLabel>
              <Select id="make" variant="outline" {...register("make")}>
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
            <ModelSelect make={watchMake} models={models} register={register} />
          </GridItem>
          <GridItem>
            <FormControl>
              <FormLabel htmlFor="minPrice">Min Price</FormLabel>
              <Select id="minPrice" variant="outline" {...register("minPrice")}>
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
              <Select id="maxPrice" variant="outline" {...register("maxPrice")}>
                <option value="all">No Max</option>
                {prices.map((price) => (
                  <option key={price} value={price}>
                    {toPrice(price)}
                  </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
          <GridItem colSpan={{base: 1, md: 2}}>
            <Button type="submit" isFullWidth>
              Search
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
}

export function ModelSelect({make, models, register, ...props}) {
  const {query} = useRouter();

  const {data} = useSWR("/api/models?make=" + make);
  const newModels = data || models;

  return (
    <FormControl>
      <FormLabel htmlFor="model">Model</FormLabel>
      <Select
        id="model"
        variant="outline"
        defaultValue={getAsString(query.model) || "all"}
        {...register("model")}
        {...props}
      >
        <option value="all">All Models</option>
        {newModels.map((model) => (
          <option
            key={model.model}
            value={model.model}
          >{`${model.model} (${model.count})`}</option>
        ))}
      </Select>
    </FormControl>
  );
}

export async function getServerSideProps({query}) {
  const make = getAsString(query.make);
  const [makes, models] = await Promise.all([getMakes(), getModels(make)]);
  return {props: {makes, models}};
}

export const makeType = PropTypes.shape({
  make: PropTypes.string,
  count: PropTypes.number,
});

export const modelType = PropTypes.shape({
  model: PropTypes.string,
  count: PropTypes.number,
});

Home.propTypes = {
  makes: PropTypes.arrayOf(makeType),
  models: PropTypes.arrayOf(modelType),
};
