import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
    query GetProducts($currency: Currency) {
        products {
            id
            title
            price(currency: $currency)
            image_url
        }
    }
`;