import React from "react";
import { Card, Button } from "react-bootstrap";
import { ProductProps } from "../../models/product.model";

const CartProduct = (props: { product: ProductProps, removeProduct: (id: string) => void }) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{props.product.name}</Card.Title>
                <Card.Text>{props.product.description}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CartProduct;