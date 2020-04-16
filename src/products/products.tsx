import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Product from './product/product';
import { ShopProduct } from '../models/shop-product.model';

interface propsType {
    products: ShopProduct[];
    onCartAction: (id: string) => void
};
const Products: React.FunctionComponent<propsType> = ({ products, onCartAction }) => {
    const listItems = products.map(({ product, isInCart }) =>
        <Col key={product._id}>
            <Product key={product._id}
                product={product}
                isInCart={isInCart}
                onCartAction={() => onCartAction(product._id)}
            ></Product>
        </Col>
    );
    return (
        <Container>
            <Row>
                {listItems}
            </Row>
        </Container>
    );
}

export default Products;