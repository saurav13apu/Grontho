import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const temp = JSON.parse(localStorage.getItem("auth"));
    if (temp) {
      const token = temp.token;
      axios.defaults.headers.common["Authorization"] = token;
      const fn = async () => {
        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/cart`
        );
        setCart(res.data.cart);
      };
      fn();
    }
  }, []);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

//custom hook
const useCart = () => useContext(CartContext);

export { useCart, CartProvider };
