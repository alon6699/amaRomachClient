import React from "react";
import { Card, Button } from "react-bootstrap";
import { ProductProp } from "../../models/product.model";

interface propsType {
    product: ProductProp;
    isInCart: boolean;
    onCartAction: () => void
}

const Product: React.FunctionComponent<propsType> = (props) => {
    const actionButton =
        props.isInCart ?
            <Button variant="secondary" onClick={props.onCartAction}>remove</Button> :
            props.product.limit === 0 ?
                <Button variant="danger" disabled>out of stock</Button> :
                <Button variant="primary" onClick={props.onCartAction}>add</Button>
    return (
        <Card style={{ width: '18rem' }} >
            <Card.Body>
                <Card.Title>{props.product.name}</Card.Title>
                <Card.Text>{props.product.description}</Card.Text>
                {actionButton}
            </Card.Body>
        </Card>
    );
}

export default Product;