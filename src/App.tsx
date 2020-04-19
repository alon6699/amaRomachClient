import React, { useState, useEffect, useReducer } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './App.scss';
import Products from './products/products';
import Cart from './cart/cart';
import { ProductProp } from './models/product.model';
import { ShopProduct } from './models/shop-product.model';
import { CartProductProp } from './models/card-product.model';
import { reducer } from './products/products.reducer';
import { initWebSocket, manageCartItem, emitCheckout } from './web-socket';

const GET_PRODUCTS_URL = 'http://localhost:3001/products/';
const WEB_SOCKET_URL = 'ws://localhost:3001/';

const App: React.FunctionComponent<any> = () => {
  const [products, dispatch] = useReducer(reducer, []);
  const [cart, setCart] = useState<Record<string, number>>({});

  const updateAmount = (id: string, amount: number) => {
    manageCartItem(id, amount);
    setCart({ ...cart, [id]: amount });
  };

  const onCartAction = (id: string) => {
    if (cart[id]) {
      const newCart = { ...cart };
      delete newCart[id];
      manageCartItem(id, 0);
      setCart(newCart);
    } else {
      updateAmount(id, 1);
    }
  };

  useEffect(() => {
    fetch(GET_PRODUCTS_URL)
      .then(res => res.json())
      .then(products => {
        dispatch({ type: 'products', payload: products });
        initWebSocket(WEB_SOCKET_URL, {
          'productChanges': (product: ProductProp) =>
            dispatch({ type: 'productChange', payload: product }),
          'checkout': (error) => {setCart({}); if(error) {console.error(error)}}
        })
      }).catch(console.error);
  }, []);

  const shopProducts = (): ShopProduct[] =>
    products.map((product: ProductProp) => ({ product, isInCart: !!cart[product._id] }));

  const cartProducts = (): CartProductProp[] =>
    Object.keys(cart).map(id =>
      ({ product: products.find((product: ProductProp) => product._id === id), amount: cart[id] }));

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
            checkout={emitCheckout}
          ></Cart>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
