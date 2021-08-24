import React, { useContext } from "react";
import {
  Box,
  Image,
  Flex,
  Text,
  VStack,
  HStack,
  Spacer,
  Square,
} from "@chakra-ui/react";
import { Cart, CartAction, CartContextType } from "../../types/cart";
import { AiOutlineClose as CloseIcon } from 'react-icons/ai';
import { CartContext } from '../../contexts'
import { formatCurrency } from '../../utils/cart'

interface CartItemProps {
  item: Cart;
  onUpdate(arg1: Cart, arg2: CartAction): void;
}

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

export default CartItem;
