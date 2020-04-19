import { ProductProp } from "../models/product.model";

const handler: any = {
    productChange: (products: ProductProp[], { payload }: { payload: ProductProp }) => {
        if (payload.deleted) {
            return products.filter((product: ProductProp) => product._id !== payload._id);
        }
        if (!products.some((product: ProductProp) => product._id === payload._id)) {
            console.log([...products, payload]);
            return [...products, payload];
        }
        return products.map((product: ProductProp) =>
            product._id === payload._id ? payload : product);
    },
    products: (products: ProductProp[], { payload }: { payload: ProductProp[] }) => payload
}

export const reducer = (state: ProductProp[], action: { type: string, payload: ProductProp[] | ProductProp }) =>
    handler[action.type](state, action);

