import { ProductProp } from "./product.model";

export interface ShopProduct {
    product: ProductProp;
    isInCart: boolean;
}