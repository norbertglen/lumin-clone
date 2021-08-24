import * as React from "react"
import {
  ChakraProvider,
} from "@chakra-ui/react"
import ProductList from "./components/ProductList"
import FilterBox from "./components/FilterBox"
import Layout from "./components/Layout"
import customTheme from "./utils/theme";

export const App = () => (
  <ChakraProvider theme={customTheme}>
    <Layout>
        <FilterBox />
        <ProductList />
    </Layout>
  </ChakraProvider>
)
