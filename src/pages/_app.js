import {ChakraProvider, ColorModeProvider, Box} from "@chakra-ui/react";
import axios from "axios";
import {SWRConfig} from "swr";

import theme from "../theme";
import Nav from "../components/Nav";
import {Container} from "../components/Container";

function MyApp({Component, pageProps}) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Nav />
        <SWRConfig value={{fetcher: (url) => axios(url).then((r) => r.data)}}>
          <Container>
            <Box marginTop={4}>
              <Component {...pageProps} />
            </Box>
          </Container>
        </SWRConfig>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
