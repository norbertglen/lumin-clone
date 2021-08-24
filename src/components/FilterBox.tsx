import React from 'react'
import { Text,  Box, Flex, Select } from '@chakra-ui/react'

function FilterBox() {
  return (
    <Flex justify="space-around">
        <Box p="20">
          <Text fontSize="4xl">All Products</Text>
          <Text as="p" fontSize="md">A 360<sup>0</sup> look at Lumin</Text>
        </Box>
        <Box p="20"  w="md">
            <Select placeholder="Filter by" bg="white">
                <option value="option1">All Products</option>
                <option value="option2">New Products</option>
                <option value="option3">Sets</option>
            </Select>
        </Box>
    </Flex>
  )
}

export default FilterBox