import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth")).token;
    axios.defaults.headers.common["Authorization"] = token;
    const fn = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/cart`
      );
      console.log({ data: res.data });
      setCart(res.data.cart);
    };
    fn();
  }, []);

  const clearCart = async () => {};

  return (
    <CartContext.Provider value={[cart, setCart, clearCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
