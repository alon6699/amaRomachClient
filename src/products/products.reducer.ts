import { ProductProp } from "../models/product.model";

const handler: any = {
    productChange: (products: ProductProp[], action: { payload: ProductProp }) =>
        products.map((product: ProductProp) =>
            product._id === action.payload._id ? action.payload : product),
    products: (products: ProductProp[], action: { payload: ProductProp[] }) => action.payload
}

export const reducer = (state: ProductProp[], action: { type: string, payload: ProductProp[] | ProductProp }) =>
    handler[action.type](state, action);

