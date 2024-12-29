import {createContext, /* 174강 주석 useState,*/ useReducer} from "react";
import {DUMMY_PRODUCTS} from "../dummy-products.js";

export const CartContext = createContext({
    items : [],
    addItemToCart: () => {},
    updateItemQuantity: () => {},
});

//173강 추가
function shoppingCartReducer(state, action) {
    if(action.type === "ADD_ITEM"){
        /* handleAddItemToCart 함수의 상태 업데이트용 로직을 복사함 */
        const updatedItems = [...state.items];

        const existingCartItemIndex = updatedItems.findIndex(
            (cartItem) => cartItem.id === action.payload
        );
        const existingCartItem = updatedItems[existingCartItemIndex];

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
            updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
            });
        }

        return {
            ...state,
            /*우리는 상태에 하나의 값만 읶기 때문이 이것이 필요하지는 않지만
            좀 더 복잡한 상태 객체라면 데이터를 잃지 않도록 이것을 추가해 두는 것이 좋다.*/
            items: updatedItems,
        };
    }

    if(action.type === 'UPDATE_ITEM'){
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
        );

        const updatedItem = {
            ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

        if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
        } else {
            updatedItems[updatedItemIndex] = updatedItem;
        }

        return {
            ...state,
            items: updatedItems,
        };
    }

    return state;
}
export default function CartContextProvider({children}) {
    const [ shoppingCartState, shoppingCartDispatch ] = useReducer(shoppingCartReducer, {
        items: []
    });

    /* 174강 주석
    const [shoppingCart, setShoppingCart] = useState({
        items: [],
    });
    */

    function handleAddItemToCart(id) {
        shoppingCartDispatch({
            type: 'ADD_ITEM',
            payload: id
        });
        /* 174강 주석
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
       */
    }

    function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispatch({
            type: 'UPDATE_ITEM',
            payload: {
                productId,
                amount
            }
        })
    /* 174강 주석
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
    */
    }

    const ctxValue = {
        //items 배열과 addItemToCart 함수를 함꼐 공유하고자 한다.
        //상태 items 배열이 된다.
        //173강 주석 items: shoppingCart.items,
        items: shoppingCartState.items,
        //addItemToCart 라는 속성인데 장바구니에 새로운 물건을 담아주는 기능이여야 한다.
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity
    };

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}