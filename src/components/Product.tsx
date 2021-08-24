import React, { useContext } from 'react';
import { Box, Image, Button, Text, VStack } from "@chakra-ui/react";
import { Product as ProductModel } from '../types/product';
import { CartContext } from '../contexts'
import { formatCurrency } from '../utils/cart';
import { CartContextType } from '../types/cart';

type ComponentProps = {
    product: ProductModel
}

const Product: React.FC<ComponentProps> = ({ product }) => {
  const { handleUpdateCart, currency } = useContext(CartContext) as CartContextType

  return (
    <Box p="5">
        <VStack spacing={5}>
            <Image src={product.image_url} maxH="170" w={170} />
            <Text>{product.title}</Text>
            <Text>From {`${formatCurrency(product.price, currency)}`}</Text>
            <Button colorScheme="brand" onClick={() => handleUpdateCart(product, { type: 'ADD' })}>Add to Cart</Button>
        </VStack>
    </Box>
  );
};

export default Product;