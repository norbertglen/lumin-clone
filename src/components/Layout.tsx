import React, { ReactNode, useState } from 'react';
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { AiOutlineCloseCircle as CloseIcon } from 'react-icons/ai';
import { GiHamburgerMenu as HamburgerIcon } from 'react-icons/gi';

import CartDrawer from './CartDrawer';
import { CartContext } from '../contexts';
import updateCart from '../utils/updateCart'
import { Cart, CartAction } from "../types/cart";
import storage from "../utils/storage";
import useStorage from '../hooks/useStorage';

const Links = ['Shop', 'Learn'];

const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);

const Layout = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cartItems, setCartItems] = useState(storage.get('user-cart') || [])
  const [cartOpen, setOpenCart] = useState(false)
  const [currency, setCurrency] = useStorage('cartCurrency', 'USD')
  const [defaultCurrency, setDefaultCurrency] = useState(currency)
  
  const reloadCart = () => {
    const items = storage.get('user-cart')
    setCartItems(items)
  }

  const handleUpdateCart = (item: Cart, action: CartAction) => {
    updateCart(item, action)
    setOpenCart(true)
    reloadCart()
  }


  const handleCurrencyUpdate = (value: string) => {
    setCurrency(value)
    setDefaultCurrency(value)
  }

  return (
    <CartContext.Provider value={{ currency: defaultCurrency, handleCurrencyUpdate, handleUpdateCart, reloadCart }}>
      <Box borderBottom="1px" borderColor="brand.100" bg={useColorModeValue('brand.50', 'brand.100')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box>Lumin Logo</Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'flex', md: 'flex' }}>
                <Link
                  px={2}
                  py={1}
                  rounded={'md'}
                  _hover={{
                    textDecoration: 'none',
                    bg: useColorModeValue('gray.200', 'gray.700'),
                  }}
                  href={'#'}>
                  Account
                </Link>
                <CartDrawer open={cartOpen} items={cartItems} onUpdate={handleUpdateCart} />
            </HStack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box fontSize="sm">{children}</Box>
    </CartContext.Provider>
  );
}

export default Layout