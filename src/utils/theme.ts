import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#f5f5f4",
      100: "#e2e6e3",
      500: "#4b5548",
    }
  },
  styles: {
    global: {
      body: {
        bg: "brand.50",
        color: "grey.900",
        fontFamily: "FF Bau Regular",
      },
      a: {
        color: "brand.100",
        _hover: {
          textDecoration: "underline",
        },
      },
    },
  },
});
export default theme;
