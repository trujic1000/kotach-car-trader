import React from "react";
import PropTypes from "prop-types";
import {useColorModeValue} from "@chakra-ui/react";
import {
  Pagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
} from "@ajna/pagination";

export default function CarPagination({
  currentPage,
  onPageChange,
  pagesCount,
  pages,
}) {
  const bg = useColorModeValue("gray.100", "gray.900");
  const bgHover = useColorModeValue("gray.200", "#121212");
  const color = useColorModeValue("black", "white");
  return (
    <Pagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      onPageChange={onPageChange}
    >
      <PaginationContainer justify="space-between">
        <PaginationPrevious color={color} bg={bg} _hover={{bg: bgHover}}>
          Previous
        </PaginationPrevious>
        <PaginationPageGroup spacing={2}>
          {pages.map((page) => (
            <PaginationPage
              key={`pagination_page_${page}`}
              page={page}
              w={8}
              color={color}
              bg={bg}
              _hover={{bg: bgHover}}
              _current={{
                bg: "green.300",
                _hover: {bg: "green.400"},
              }}
            />
          ))}
        </PaginationPageGroup>
        <PaginationNext color={color} bg={bg} _hover={{bg: bgHover}}>
          Next
        </PaginationNext>
      </PaginationContainer>
    </Pagination>
  );
}

CarPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  pagesCount: PropTypes.number.isRequired,
  pages: PropTypes.arrayOf(PropTypes.number).isRequired,
};
