export type Product = {
    id: number
    title: string
    image_url: string
    price: number
    product_options: [ProductOption]
}

export type ProductOption = {
    title: string
    prefix: string
    suffix: string
    options: [ProductOptionValue]
}

export type ProductOptionValue = {
    id: number
    value: string
}