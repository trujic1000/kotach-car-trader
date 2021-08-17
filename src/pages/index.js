import React from "react";
import useSWR from "swr";
import PropTypes from "prop-types";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {NextSeo} from "next-seo";
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

// import {getMakes} from "../database/getMakes";
import {getModels} from "../database/getModels";
import {toPrice} from "../lib/toPrice";
import {getAsString} from "../lib/getAsString";
import {getMakes} from "../lib/api";

const prices = [500, 1000, 5000, 15000, 25000, 50000, 250000];

export default function Search({makes, initialModels, singleColumn}) {
  const router = useRouter();
  const {register, watch, handleSubmit} = useForm({
    defaultValues: {
      make: getAsString(router.query.make) || "all",
      model: getAsString(router.query.model) || "all",
      minPrice: getAsString(router.query.minPrice) || "all",
      maxPrice: getAsString(router.query.maxPrice) || "all",
    },
  });

  const make = watch("make");
  const {data} = useSWR("/api/models?make=" + make, {
    dedupingInterval: 60000,
  });
  const models = data || initialModels;

  const onSubmit = (data) => {
    router.push(
      {
        pathname: "/cars",
        query: {...data, page: 1},
      },
      undefined,
      {shallow: true},
    );
  };

  return (
    <>
      <NextSeo
        title="New cars, used cars, prices"
        description="Shop new &amp; used cars, research &amp; compare models, find local dealers/sellers, calculate payments..."
      />
      <Box
        bg={useColorModeValue("gray.100", "gray.900")}
        color={useColorModeValue("black", "white")}
        margin="auto"
        padding={4}
        maxWidth="600"
        boxShadow="lg"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: singleColumn ? "1fr" : "1fr 1fr",
            }}
            columnGap={6}
            rowGap={4}
          >
            <GridItem>
              <FormControl>
                <FormLabel htmlFor="make">Make</FormLabel>
                <Select id="make" variant="outline" {...register("make")}>
                  <option value="all">All Makes</option>
                  {makes.map(([make, count]) => (
                    <option
                      key={make}
                      value={make}
                    >{`${make} (${count})`}</option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>
            <GridItem>
              <FormControl>
                <FormLabel htmlFor="model">Model</FormLabel>
                <Select id="model" variant="outline" {...register("model")}>
                  <option value="all">All Models</option>
                  {models.map((model) => (
                    <option
                      key={model.model}
                      value={model.model}
                    >{`${model.model} (${model.count})`}</option>
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
            <GridItem colSpan={{base: 1, md: singleColumn ? 1 : 2}}>
              <Button type="submit" isFullWidth colorScheme="green">
                Search
              </Button>
            </GridItem>
          </Grid>
        </form>
      </Box>
    </>
  );
}

export async function getServerSideProps({query}) {
  const make = getAsString(query.make);
  const [makes, models] = await Promise.all([getMakes(), getModels(make)]);
  return {props: {makes, initialModels: models}};
}

export const makeType = PropTypes.shape({
  make: PropTypes.string,
  count: PropTypes.number,
});

export const modelType = PropTypes.shape({
  model: PropTypes.string,
  count: PropTypes.number,
});

Search.propTypes = {
  makes: PropTypes.array.isRequired,
  initialModels: PropTypes.arrayOf(modelType).isRequired,
  singleColumn: PropTypes.bool,
};
