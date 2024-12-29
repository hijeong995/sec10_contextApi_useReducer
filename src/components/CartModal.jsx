import { forwardRef, useImperativeHandle, useRef/*, useContext */} from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart.jsx';
//import { CartContext } from '../store/shopping-cart-context.jsx';

const CartModal = forwardRef(function Modal(
  { /* 171강 주석 cartItems, onUpdateCartItemQuantity, */ title, actions },
  ref
) {
    const dialog = useRef();

    //const { items, updateItemQuantity } = useContext(CartContext);

    useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
    };
    });

    return createPortal(
        <dialog id="modal" ref={dialog}>
          <h2>{title}</h2>
          <Cart /* 171강 주석 items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity}*/ />
          <form method="dialog" id="modal-actions">
            {actions}
          </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default CartModal;
