import {ChakraProvider} from "@chakra-ui/react";
import {DefaultSeo} from "next-seo";
import {SWRConfig} from "swr";
import axios from "axios";

import theme from "../theme";
import Nav from "../components/Nav";
import {Container} from "../components/Container";

function MyApp({Component, pageProps}) {
  return (
    <>
      <DefaultSeo defaultTitle="Car Trader" titleTemplate="Car Trader | %s" />
      <ChakraProvider resetCSS theme={theme}>
        <Nav />
        <SWRConfig value={{fetcher: (url) => axios(url).then((r) => r.data)}}>
          <Container>
            <Component {...pageProps} />
          </Container>
        </SWRConfig>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
