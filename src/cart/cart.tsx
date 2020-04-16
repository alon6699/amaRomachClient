import React, { useState } from 'react';
import { Modal, Button, Container, Row } from 'react-bootstrap';
import CartProduct from './cart-product/cart-product';
import { CartProductProp } from '../models/card-product.model';

interface propsType {
    cartProducts: CartProductProp[];
    removeProduct: (id: string) => void;
    updateAmount: (id: string, amount: number) => void;
    checkout: () => void;
};

const Cart: React.FunctionComponent<propsType> = ({ cartProducts, removeProduct, updateAmount, checkout }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const products = cartProducts.map(cartProduct =>
        <CartProduct key={cartProduct.product._id}
            cartProduct={cartProduct} removeProduct={() => removeProduct(cartProduct.product._id)}
            updateAmount={(amount: number) => updateAmount(cartProduct.product._id, amount)}>
        </CartProduct>);

    return (
        <>
            <Button variant="primary" onClick={handleShow} size="lg" block>cart</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            {products}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={() => { handleClose(); checkout(); }}>
                        checkout
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Cart;