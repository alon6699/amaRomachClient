export interface ProductProp {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    limit?: number;
    deleted? :boolean;
}