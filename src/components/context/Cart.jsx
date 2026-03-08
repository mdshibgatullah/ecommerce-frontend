import { createContext, useEffect, useState } from "react";
import { apiUrl } from "../common/http";

export const CartContext = createContext();

export const CartProvider = ({children}) =>{

    const [cartData, setCartData] = useState(
        JSON.parse(localStorage.getItem('cart') || "[]")
    );

    const [shippingCost, setShippingCost] = useState(0);


    const addToCart = (product, size = null) => {

    let updateCart = [...cartData];

    const existingIndex = updateCart.findIndex(
        item =>
            item.product_id === product.id &&
            item.size === size
    );

    if (existingIndex > -1) {
        // same product + same size → increase qty
        updateCart[existingIndex].qty += 1;
    } else {
        // new item
        updateCart.push({
            id: `${product.id}-${Date.now()}`,
            product_id: product.id,
            size: size,
            title: product.title,
            price: Number(product.price),
            qty: 1,
            image_url: product.image_url
        });
    }

    setCartData(updateCart);
    localStorage.setItem('cart', JSON.stringify(updateCart));
};



    const shipping = ()=> {
        shippingCost
        let shippingAmount = 0;
        cartData.map(item => {
            shippingAmount += item.qty * shippingCost;
        })
        return shippingAmount;
    }

    const subTotal = ()=> {
        let subtotal = 0;
        cartData.map(item => {
            subtotal += item.qty * item.price;
        })

        return subtotal;
    }


    const grandTotal = () => {
        return subTotal() + shipping()
    }


    const updateCartItem = (itemId, newQty) => {
        let updatedCart = [...cartData];
        updatedCart = updatedCart.map(item =>
            (item.id == itemId) ? {...item, qty: newQty}
                                : item
        )
        setCartData(updatedCart)
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
    
    const deleteCartItem = (itemId) =>{
        const newCartData = cartData.filter(item => item.id != itemId)
        setCartData(newCartData)
        localStorage.setItem('cart', JSON.stringify(newCartData));
    }

    const getQty = ()=> {
        let qty = 0;
        cartData.map(item=> {
            qty += parseInt(item.qty)
        })
        return qty;
    }


    useEffect(()=>{
        fetch(`${apiUrl}/get_front_shipping`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
            }).then(res => res.json())
            .then(result => {
                if(result.status == 200){
                    setShippingCost(result.data.shipping_charge)
                }else{
                    setShippingCost(0)
                }
            })
    })


    return (
        
        <CartContext.Provider value={{addToCart, cartData, grandTotal, subTotal, shipping, updateCartItem, deleteCartItem, getQty}}>
            {children}
        </CartContext.Provider>
    )
}