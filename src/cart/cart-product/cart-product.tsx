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
    if (!cartProduct.product.limit) {
        input = <Form.Control type="number" value={cartProduct.amount}
            onInput={(e: FormEvent<FormControl & HTMLInputElement>) =>
                updateAmount(e.currentTarget.value as any)} />;
    } else {
        const options = Array.from({ length: cartProduct.product.limit }, ((v, index) =>
            <option key={index + 1} value={index + 1} onChange={() => updateAmount(index + 1)}>{index + 1}</option>));
        input = <Form.Control value={cartProduct.amount} as="select"
            onChange={(e: FormEvent<HTMLSelectElement>) => updateAmount(e.currentTarget.value as any)}>
            {options}
        </Form.Control>;
    }

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="holder.js/100px180" />
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