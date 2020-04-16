import React from "react";
import { Card, Button } from "react-bootstrap";
import { ProductProps } from "../../models/product.model";

const Product = (props: { product: ProductProps, isInCart: boolean, onCartAction: () => void }) => {
    const actionButton = !props.isInCart ?
        <Button variant="primary" onClick={props.onCartAction}>add</Button> :
        <Button variant="secondary" onClick={props.onCartAction}>remove</Button>
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{props.product.name}</Card.Title>
                <Card.Text>{props.product.description}</Card.Text>
                {actionButton}
            </Card.Body>
        </Card>
    );
}

export default Product;