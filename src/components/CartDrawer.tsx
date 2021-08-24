import React, { useMemo, useContext, useState, useEffect } from "react";
import {
  Box,
  Drawer,
  Image,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  List,
  ListItem,
  Text,
  useDisclosure,
  VStack,
  HStack,
  Spacer,
  Square,
  Select,
} from "@chakra-ui/react";
import { GrCart as CartIcon } from "react-icons/gr";
import { Cart, CartAction, CartContextType } from "../types/cart";
import { AiOutlineClose as CloseIcon } from 'react-icons/ai';
import { CartContext } from '../contexts'
import { calculateTotalItems, calculateTotalPrice, formatCurrency } from '../utils/cart'

interface ComponentProps {
  items: [Cart];
  onUpdate(arg1: Cart, arg2: CartAction): void;
  open: boolean;
}

interface CartItemProps {
  item: Cart;
  onUpdate(arg1: Cart, arg2: CartAction): void;
}

const CURRENCIES = ["USD", "EUR", "CAD", "AUD", "GBP", "JPY", "---", "AED", "AFN", "ALL", "AMD", "ANG", "AOA", "ARS", "AUD", "AWG", "AZN", "BAM", "BBD", "BDT", "BGN", "BIF", "BMD", "BND", "BOB", "BRL", "BSD", "BWP", "BZD", "CAD", "CDF", "CHF", "CLP", "CNY", "COP", "CRC", "CVE", "CZK", "DJF", "DKK", "DOP", "DZD", "EGP", "ETB", "EUR", "FJD", "FKP", "GBP", "GEL", "GIP", "GMD", "GNF", "GTQ", "GYD", "HKD", "HNL", "HRK", "HTG", "HUF", "IDR", "ILS", "INR", "ISK", "JMD", "JPY", "KES", "KGS", "KHR", "KMF", "KRW", "KYD", "KZT", "LAK", "LBP", "LKR", "LRD", "LSL", "MAD", "MDL", "MGA", "MKD", "MMK", "MNT", "MOP", "MRO", "MUR", "MVR", "MWK", "MXN", "MYR", "MZN", "NAD", "NGN", "NIO", "NOK", "NPR", "NZD", "PAB", "PEN", "PGK", "PHP", "PKR", "PLN", "PYG", "QAR", "RON", "RSD", "RUB", "RWF", "SAR", "SBD", "SCR", "SEK", "SGD", "SHP", "SLL", "SOS", "SRD", "STD", "SZL", "THB", "TJS", "TOP", "TRY", "TTD", "TWD", "TZS", "UAH", "UGX", "UYU", "UZS", "VND", "VUV", "WST", "XAF", "XCD", "XOF", "XPF", "YER", "ZAR", "ZMW"]

const CartDrawer: React.FC<ComponentProps> = ({ items, onUpdate, open = false }) => {
  const { onOpen, onClose } = useDisclosure();
  const [isOpen, setIsOpen] = useState(open)
  const { handleCurrencyUpdate, currency } = useContext(CartContext) as CartContextType
  const handleOpen = () => {
    setIsOpen(true)
    onOpen()
  }

  const handleClose = () => {
    setIsOpen(false)
    onClose()
  }

  const totalQuantity = useMemo(() => calculateTotalItems(items), [items]);
  const cartSubTotal = useMemo(() => calculateTotalPrice(items), [items]);

  useEffect(() => {
    if (open && totalQuantity) {
      setIsOpen(true)
    }
  }, [totalQuantity, open])

  const handleCurrencySelect = (event: { target: { value: any; }; }) => {
    handleCurrencyUpdate(event.target.value)
  }

  return (
    <>
      <Flex>
        <IconButton
          onClick={handleOpen}
          aria-label="Cart"
          fontSize="20px"
          icon={<CartIcon />}
        />
        <Text>{totalQuantity}</Text>
      </Flex>
      <Drawer isOpen={isOpen} onClose={handleClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg="brand.50" borderBottomWidth="1px">Your Cart</DrawerHeader>
          <DrawerBody bg="brand.50">
            <Select value={currency} bg="brand.100" mb={2} size="sm" w="fit-content" onChange={handleCurrencySelect}>
              {CURRENCIES.map((curr, idx) => <option key={idx} disabled={curr === "---"} value={curr}>{curr}</option>)}
            </Select>
            {items.length ? (
              <List spacing={3}>
                {items.map((item: Cart) => (
                  <ListItem key={item?.id} bgColor="white" p={2}>
                    <CartItem item={item} onUpdate={onUpdate} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Text>There are no items in your cart</Text>
            )}
          </DrawerBody>

          <DrawerFooter bg="brand.50" boxShadow="inner">
            <Flex w="full" justifyContent="space-evenly">
              <Text>Subtotal</Text>
              <Spacer />
              <Text>{`${formatCurrency(cartSubTotal, currency)}`}</Text>
            </Flex>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

const CartItem: React.FC<CartItemProps> = ({ item, onUpdate }) => {
  const { currency } = useContext(CartContext) as CartContextType
  return (
    <Box>
      <Flex mb={2}>
        <Spacer />
        <CloseIcon onClick={() => onUpdate(item, { type: "REMOVE" })} />
      </Flex>
      <Flex justifyContent="space-evenly" alignItems="flex-end">
        <VStack alignItems="flex-start">
          <Text>{item?.title}</Text>
          <Flex justifyContent="space-evenly" w="100%">
            <HStack border="1px" justifyContent="space-evenly" align="left" w={100}>
              <Text
                onClick={() => onUpdate(item, { type: "SUBTRACT" })}
                _hover={{ cursor: "pointer" }}
              >
                -
              </Text>
              <Text>{item.quantity}</Text>
              <Text
                onClick={() => onUpdate(item, { type: "ADD" })}
                _hover={{ cursor: "pointer" }}
              >
                +
              </Text>
            </HStack>
            <Spacer />
          </Flex>
        </VStack>
        <Spacer />
        <Square alignItems="flex-end">
          <Text>{`${formatCurrency(item.quantity * item.price, currency)}`}</Text>
        </Square>
        <Spacer />
        <Image src={item?.image_url} maxH="70" maxW="320px" />
      </Flex>
    </Box>
  )
}

export default CartDrawer;
