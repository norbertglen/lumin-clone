import React, { useContext, useEffect, useCallback } from 'react';
import { SimpleGrid, Skeleton, Alert, AlertIcon, Stack } from "@chakra-ui/react"
import { useQuery } from '@apollo/client';

import { Product as ProductModel } from '../types/product';
import Product from './Product'
import { CartContext } from '../contexts'
import { PRODUCTS_QUERY } from '../graphql/queries/products';
import storage from '../utils/storage';
import { Cart, CartContextType } from '../types/cart';

const ProductList: React.FC = () => {
  const { currency, reloadCart } = useContext(CartContext) as CartContextType

  const { data = {}, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables: { currency },
  })

  const { products = [] } = data

  const refreshCart = useCallback(() => {
    const cartItems = storage.get('user-cart')
    const cartItemIds = cartItems.map((c: Cart) => c.id)
    if (products.length && cartItemIds.length) {
      storage.set('user-cart', cartItems.map((item: Cart) => {
        return {
          ...item,
          price: products.find((i: ProductModel) => i.id === item.id)?.price
        }
      }))
      reloadCart()
    }
  }, [products, reloadCart])

  useEffect(() => {
    if (currency) {
      refreshCart()
    }
  }, [currency, refreshCart])


  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        Products could not be loaded...
      </Alert>)
  }

  return (
    <>
      {data && <SimpleGrid bg="brand.100" columns={[2, null, 3]} m="auto" mt={6} pt={15} spacing={15}>

        {loading && [...Array(3)].map((x, i) =>
          <Stack key={i}>
            <Skeleton height="100px" />
            <Skeleton height="50px" />
            <Skeleton height="30px" />
          </Stack>
        )}
        {(data.products || []).map((product: ProductModel, index: number) => <Product key={index} product={product} />)}
      </SimpleGrid>}
    </>
  );
};

export default ProductList;