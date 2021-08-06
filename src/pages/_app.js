import {ChakraProvider, ColorModeProvider} from "@chakra-ui/react";
import axios from "axios";
import {SWRConfig} from "swr";

import theme from "../theme";
import Nav from "../components/Nav";

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
          <Component {...pageProps} />
        </SWRConfig>
      </ColorModeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
