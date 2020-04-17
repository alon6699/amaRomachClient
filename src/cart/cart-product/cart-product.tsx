import React, { FormEvent } from "react";
import { Card, ListGroupItem, ListGroup, Button, Form, FormControl } from "react-bootstrap";
import { CartProductProp } from "../../models/card-product.model";

interface propsType {
    cartProduct: CartProductProp;
    removeProduct: () => void;
    updateAmount: (amount: number) => void;
}

const CartProduct: React.FunctionComponent<propsType> = ({ cartProduct, removeProduct, updateAmount }) => {
    let input;
    if (cartProduct.product.limit !== undefined && cartProduct.product.limit !== null) {
        const options = Array.from({ length: cartProduct.product.limit + cartProduct.amount }, ((v, index) =>
            <option key={index + 1} value={index + 1} onChange={() => updateAmount(index + 1)}>{index + 1}</option>));
        input = <Form.Control value={cartProduct.amount} as="select"
            onChange={(e: FormEvent<HTMLSelectElement>) => updateAmount(parseInt(e.currentTarget.value))}>
            {options}
        </Form.Control>;
    } else {
        input = <Form.Control type="number" value={cartProduct.amount}
            onInput={(e: FormEvent<FormControl & HTMLInputElement>) =>
                updateAmount(parseInt(e.currentTarget.value))} />;
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Body>
                <Card.Title>{cartProduct.product.name}</Card.Title>
                <Card.Text>{cartProduct.product.description}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroupItem><Button onClick={removeProduct}>REMOVE</Button></ListGroupItem>
                <ListGroupItem>
                    <Form>
                        {input}
                    </Form>
                </ListGroupItem>
            </ListGroup>
        </Card>
    );
}

export default CartProduct;