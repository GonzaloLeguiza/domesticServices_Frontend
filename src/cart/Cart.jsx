import { useState } from "react";
import style from "./Cart.module.css";
import { useEffect } from "react";
import { getCart } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../redux/actions";
import Pasarela from "../components/Pasarela/Pasarela";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Login from "../components/Login/Login";

const promiseStripe = loadStripe(
  "pk_test_51NBQA0BpeRt7rcmet7zt0iDB39vFiEWAF1fC9g0mXU9UWuG5E50VE5j5o8AgcsZkeUv9iD4fWK4cUu9kKOqwhzKn00aWDy85Vh"
);

const Cart = () => {
  const dispatch = useDispatch();
  const cartRedux = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.currentUserIdLoggedIn);

  const [login, setLogin] = useState(false);
  const [payActive, setPayActive] = useState(false);

  const [cartItems, setCartItems] = useState(() => {
    const localStorageData = window.localStorage.getItem("cart");
    if (localStorageData) {
      return JSON.parse(localStorageData);
    } else {
      return [];
    }
  });

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    const data = cartRedux;

    if (data.length === 0) {
      const localStorage = JSON.parse(window.localStorage.getItem("cart"));
      setCartItems(localStorage);
    } else {
      setCartItems(data);
    }
  }, [cartRedux]);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems, payActive]);

  const handleCleanCart = () => {
    window.localStorage.removeItem("cart");
    window.location.reload();
  };

  const handleIncrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }
      return item;
    });
    console.log(updatedCartItems, "updatedCartItems");

    setCartItems(updatedCartItems);
    window.localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    dispatch(updateCart(updatedCartItems));
  };

  const handleDecrement = (itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId && item.quantity > 1) {
        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }
      return item;
    });

    setCartItems(updatedCartItems);
    window.localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    dispatch(updateCart(updatedCartItems));
  };

  const handleChange = (e, itemId) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: parseInt(e.target.value, 10),
        };
      }
      return item;
    });
    setCartItems(updatedCartItems);
    window.localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    dispatch(updateCart(updatedCartItems));
  };

  const handleRemoveItem = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    window.localStorage.setItem("cart", JSON.stringify(updatedCartItems));
    dispatch(updateCart(updatedCartItems));
  };

  const calculateSubTotal = (item) => {
    return item.pricePerHour * (item.quantity || 1);
  };

  const calculateTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += calculateSubTotal(item);
    });
    return total;
  };

  const handleLogin = () => {
    setLogin(!login);
  };

  const handlePay = () => {
    setPayActive(!payActive);
  };

  const handlePopupClick = (e) => {
    const popUpContainer = document.querySelector(`.${style.popUp}`);
    const pasarelaContainer = document.querySelector(`.${style.pasarela}`);
    if (
      !popUpContainer.contains(e.target) ||
      pasarelaContainer.contains(e.target)
    ) {
      return;
    }
    setPayActive(false);
  };

  return (
    <div className={style.container}>
      <div>
        <h1 className={style.title}>My Cart</h1>
        <button onClick={handleCleanCart}>Clean Cart</button>
      </div>
      <div className={style.containerService}>
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div className={style.containerCart} key={item.id}>
              <div>
                <h1>{item.nameService}</h1>
                <h3>Price Per Hour: ${item.pricePerHour}</h3>
              </div>
              <div>
                <button onClick={() => handleDecrement(item.id)}>-</button>
                <input
                  type="number"
                  value={item.quantity || 1}
                  onChange={(e) => handleChange(e, item.id)}
                />
                <button onClick={() => handleIncrement(item.id)}>+</button>
              </div>
              <div>
                <h2>Sub Total: ${calculateSubTotal(item)}</h2>
              </div>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      <div className={style.totalContainer}>
        <h2>Total: ${calculateTotal()}</h2>
        {userId ? (
          <button onClick={handlePay}>Pay</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
      </div>
      {login && (
        <div>
          <Login />
        </div>
      )}
      {payActive && (
        <div className={style.popUp} onClick={handlePopupClick}>
          <div className={style.pasarela}>
            <Elements stripe={promiseStripe}>
              <Pasarela
                userId={userId}
                cartItems={cartItems}
                totalPay={calculateTotal()}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
