import {Box, useTheme, useColorMode} from "@chakra-ui/react";

export const Container = ({children, ...props}) => {
  const theme = useTheme();
  const {colorMode} = useColorMode();

  const bgColor = {light: "gray.50", dark: "gray.900"};
  const color = {light: "black", dark: "white"};

  return (
    <Box
      mx="auto"
      width={["full", ...theme.__breakpoints.asArray.slice(1)]}
      // bg={bgColor[colorMode]}
      // color={color[colorMode]}
      {...props}
    >
      {children}
    </Box>
  );
};
