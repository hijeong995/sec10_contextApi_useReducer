//172강 주석 import { useState } from 'react';

import Header from './components/Header.jsx';
import Shop from './components/Shop.jsx';
import Product from './components/Product.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';
// 172강 주석 import { CartContext } from './store/shopping-cart-context.jsx';
import CartContextProvider from './store/shopping-cart-context.jsx';

function App() {
/* 172강 해당 내용 shopping-cart-context의 CartContextProvider 함수로 이동
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    //items 배열과 addItemToCart 함수를 함꼐 공유하고자 한다.
    //상태 items 배열이 된다.
    items: shoppingCart.items,
    //addItemToCart 라는 속성인데 장바구니에 새로운 물건을 담아주는 기능이여야 한다.
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity
  };
*/

  return (
    /* 172강 주석  <CartContext.Provider value={ctxValue}>*/
      <CartContextProvider>
      <Header
        /* 171강 Header 속성 삭제
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
        */
      />
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
            <li key={product.id}>
              <Product {...product} /* 171강 속성 삭제 onAddToCart={handleAddItemToCart}*/ />
            </li>
        ))}
      </Shop>
      </CartContextProvider>
    /* 172강 주석 </CartContext.Provider>*/
  );
}

export default App;
