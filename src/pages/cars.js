import React from "react";
import useSWR from "swr";
import PropTypes from "prop-types";
import {usePagination} from "@ajna/pagination";
import deepEqual from "fast-deep-equal";
import {useRouter} from "next/router";
import {stringify} from "querystring";
import {NextSeo} from "next-seo";
import {Grid, GridItem} from "@chakra-ui/react";

import Search from ".";
import CarPagination from "../components/CarPagination";
import {CarCard} from "../components/CarCard";
import CarCardSkeleton from "../components/CarCardSkeleton";
import {getAsString} from "../utils";
import {getMakes, getModels, getCars} from "../lib/api";

export default function CarsList({makes, models, cars, totalPages}) {
  const router = useRouter();
  const [serverQuery] = React.useState(router.query);

  const {data} = useSWR("/api/cars?" + stringify(router.query), {
    dedupingInterval: 60000,
    initialData: deepEqual(router.query, serverQuery)
      ? {cars, totalPages}
      : undefined,
  });

  const {currentPage, setCurrentPage, pagesCount, pages} = usePagination({
    pagesCount: data?.totalPages || totalPages,
    initialState: {
      currentPage: parseInt(router.query.page || "1"),
    },
  });

  const onPageChange = (nextPage) => {
    setCurrentPage(nextPage);
    router.push(
      {
        pathname: "/cars",
        query: {...router.query, page: nextPage},
      },
      undefined,
      {shallow: true},
    );
  };

  return (
    <>
      <NextSeo
        title="Used vehicles for sale"
        description={`Shop used vehicles for sale at cartrader.com.`}
      />
      <Grid gridTemplateColumns="repeat(12, 1fr)" gap={6}>
        <GridItem colSpan={[12, 5, 3, 2]}>
          <Search singleColumn makes={makes} initialModels={models} />
        </GridItem>
        <GridItem colSpan={[12, 7, 9, 10]}>
          <CarPagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            pagesCount={data?.totalPages || pagesCount}
            pages={pages}
          />
          <Grid
            gridTemplateColumns={{base: "1fr", lg: "1fr 1fr"}}
            gap={6}
            my={6}
          >
            {!data && <CarCardSkeleton />}
            {data &&
              (data.cars || []).map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
          </Grid>
          <CarPagination
            currentPage={currentPage}
            onPageChange={onPageChange}
            pagesCount={data?.totalPages || pagesCount}
            pages={pages}
          />
        </GridItem>
      </Grid>
    </>
  );
}

export async function getServerSideProps({query}) {
  const make = getAsString(query.make);
  const [makes, models, pagination] = await Promise.all([
    getMakes(),
    getModels(make),
    getCars(query),
  ]);
  return {
    props: {
      makes,
      models,
      cars: pagination.cars,
      totalPages: pagination.totalPages,
    },
  };
}

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

export const makeType = PropTypes.shape({
  make: PropTypes.string,
  count: PropTypes.number,
});

export const modelType = PropTypes.shape({
  model: PropTypes.string,
  count: PropTypes.number,
});

CarsList.propTypes = {
  makes: PropTypes.arrayOf(makeType).isRequired,
  models: PropTypes.arrayOf(modelType).isRequired,
  cars: PropTypes.arrayOf(carType).isRequired,
  totalPages: PropTypes.number.isRequired,
};
