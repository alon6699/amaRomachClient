import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductProps } from '../models/product.model';
import Product from './product/product';

const Products = ({ products }: { products: ProductProps[] }) => {
    const [cart, setCart]: [Record<string, number>, (cart: Record<string, number>) => void] = useState({});

    const onCartAction = (id: string) => {
        return () => {
            if (cart[id]) {
                const newCart = { ...cart };
                delete newCart[id];
                setCart(newCart);
            } else {
                setCart({ ...cart, [id]: 1 });
            }
        };
    }

    const listItems = products.map(product =>
        <Col>
            <Product key={product.name.toString()}
                product={product}
                isInCart={!!cart[product.name]}
                onCartAction={onCartAction(product.name)}
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