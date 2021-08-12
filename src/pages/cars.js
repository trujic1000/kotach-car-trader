import React from "react";
import router, {useRouter} from "next/router";
import PropTypes from "prop-types";
import {Grid, GridItem, useColorModeValue} from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";

import Search from ".";
import {getMakes} from "../database/getMakes";
import {getModels} from "../database/getModels";
import {getAsString} from "../lib/getAsString";
import {getPaginatedCars} from "../database/getPaginatedCars";

export default function CarsList({makes, models, cars, totalPages}) {
  const {query} = useRouter();
  const {currentPage, setCurrentPage, pagesCount, pages} = usePagination({
    pagesCount: totalPages,
    initialState: {
      currentPage: parseInt(query.page || "1"),
    },
  });

  const onPageChange = (nextPage) => {
    setCurrentPage(nextPage);
    router.push({
      pathname: "/cars",
      query: {...query, page: nextPage},
    });
  };

  const bg = useColorModeValue("gray.100", "gray.900");
  const bgHover = useColorModeValue("gray.200", "#121212");
  const color = useColorModeValue("black", "white");

  return (
    <Grid gridTemplateColumns="repeat(12, 1fr)" gap={6}>
      <GridItem colSpan={[12, 5, 3, 2]}>
        <Search singleColumn makes={makes} initialModels={models} />
      </GridItem>
      <GridItem colSpan={[12, 7, 9, 10]}>
        <Pagination
          pagesCount={pagesCount}
          currentPage={currentPage}
          onPageChange={onPageChange}
        >
          <PaginationContainer justify="space-between">
            <PaginationPrevious color={color} bg={bg} _hover={{bg: bgHover}}>
              Previous
            </PaginationPrevious>
            <PaginationPageGroup>
              {pages.map((page) => (
                <PaginationPage
                  key={`pagination_page_${page}`}
                  page={page}
                  w={8}
                  color={color}
                  bg={bg}
                  _hover={{bg: bgHover}}
                  _current={{bg: "green.300"}}
                />
              ))}
            </PaginationPageGroup>
            <PaginationNext color={color} bg={bg} _hover={{bg: bgHover}}>
              Next
            </PaginationNext>
          </PaginationContainer>
        </Pagination>
        {/* <pre>{JSON.stringify({totalPages, cars}, null, 4)}</pre> */}
      </GridItem>
    </Grid>
  );
}

export async function getServerSideProps({query}) {
  const make = getAsString(query.make);
  const [makes, models, pagination] = await Promise.all([
    getMakes(),
    getModels(make),
    getPaginatedCars(query),
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
