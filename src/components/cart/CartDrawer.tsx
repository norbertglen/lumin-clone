import React, { useMemo, useContext, useState, useEffect } from "react";
import {
  Drawer,
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
  Spacer,
  Select,
} from "@chakra-ui/react";
import { GrCart as CartIcon } from "react-icons/gr";
import { Cart, CartAction, CartContextType } from "../../types/cart";
import { CartContext } from '../../contexts'
import CartItem from "./CartItem";
import { CURRENCIES } from "../../utils/constants";
import { calculateTotalItems, calculateTotalPrice, formatCurrency } from '../../utils/cart'

interface ComponentProps {
  items: [Cart];
  onUpdate(arg1: Cart, arg2: CartAction): void;
  open: boolean;
}

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
      <Drawer isOpen={isOpen} onClose={handleClose} size="md" closeOnOverlayClick={false}>
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

export default CartDrawer;
