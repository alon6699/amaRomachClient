import React, { useState } from 'react';
import { Modal, Button, Container, Row } from 'react-bootstrap';
import CartProduct from './cart-product/cart-product';
import { ProductProps } from '../models/product.model';

type propsType = { products: ProductProps[], removeProduct: (id: string) => void };

function Cart({ products, removeProduct }: propsType) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const cartProducts = products.map(product =>
        <CartProduct product={product} removeProduct={removeProduct}></CartProduct>);
        
    return (
        <>
            <Button variant="primary" onClick={handleShow}>cart</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            {cartProducts}
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
            </Button>
                    <Button variant="primary" onClick={handleClose}>
                        checkout
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Cart;