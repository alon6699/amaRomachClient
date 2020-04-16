import React, { useState, useEffect } from 'react';
import './App.scss';
import Products from './products/products';
import Cart from './cart/cart';
import { ProductProp } from './models/product.model';
import { ShopProduct } from './models/shop-product.model';
import { CartProductProp } from './models/card-product.model';
import { Container, Row, Col } from 'react-bootstrap';

const App: React.FunctionComponent<any> = () => {
  const [products, setProducts] = useState<ProductProp[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});

  const onCartAction = (id: string) => {
    if (cart[id]) {
      const newCart = { ...cart };
      delete newCart[id];
      setCart(newCart);
    } else {
      setCart({ ...cart, [id]: 1 });
    }
  }

  const updateAmount = (id: string, amount: number) => {
    setCart({ ...cart, [id]: amount });
  }

  const checkout = () => {
    setCart({});
  }

  useEffect(() => {
    fetch('http://localhost:3000/products/')
      .then(res => res.json())
      .then(result => {
        setProducts(result);
      }).catch(console.error);
  }, [])

  const shopProducts = (): ShopProduct[] =>
    products.map(product => ({ product, isInCart: !!cart[product._id] }));

  const cartProducts = (): CartProductProp[] =>
    Object.keys(cart).map(id =>
      ({ product: products.find(product => product._id === id) as ProductProp, amount: cart[id] }));

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Products products={shopProducts()} onCartAction={onCartAction}></Products>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col>
          <Cart cartProducts={cartProducts()}
            removeProduct={onCartAction}
            updateAmount={updateAmount}
            checkout={checkout}
          ></Cart>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
