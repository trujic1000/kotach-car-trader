import {Box, useTheme} from "@chakra-ui/react";

export const Container = ({children, ...props}) => {
  const theme = useTheme();
  return (
    <Box
      mx="auto"
      p={4}
      width={["full", ...theme.__breakpoints.asArray.slice(1)]}
      {...props}
    >
      {children}
    </Box>
  );
};
