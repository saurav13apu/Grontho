import React from "react";
import Layout from "./../Components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const currency = "INR";
  const receipt = "qwsaq1";
  const poisa = 229;
  const [cart, setCart, clearCart] = useCart();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });

      if (cart.length > 0) {
        total = total + 59;
      }
      if (cart.length > 4) {
        total = total + 59;
      }
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //payment
  const paymentHandler = async (e) => {
    try {
      let amount = 0;
      cart.map((i) => {
        amount += i.price;
      });
      if (cart.length > 0) {
        amount = amount + 59;
      }
      if (cart.length > 4) {
        amount = amount + 59;
      }
      amount = amount * 100;
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/razorpay/payment`,
        { amount, currency, receipt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const order = res.data;

      var options = {
        key: "rzp_test_pll8LNr8oMbUmt", // Enter the Key ID generated from the Dashboard
        amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency,
        name: "Grontho.in", //your business name
        description: "Test Transaction",
        image: "client/src/image/logo.jpg",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

        handler: async function (response) {
          const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
            response;

          const body = {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            cart,
            poisa,
          };

          try {
            const validateRes = await axios.post(
              `${process.env.REACT_APP_API}/api/v1/products/razorpay/validate`,
              body
            );

            const jsonRes = validateRes.data;
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
          } catch (error) {
            console.error(error);
          }
        },
        prefill: {
          //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
          name: "Gaurav Kumar", //your customer's name
          email: "gaurav.kumar@example.com",
          contact: "9000090000", //Provide the customer's phone number for better conversion rates
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
      e.preventDefault();
    } catch (error) {
      console.log(error);
    }
  };

  //remove item
  const removeCartItem = async (product) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/remove-from-cart`,
        {
          productId: product._id,
        }
      );
      if (res.data?.success) {
        toast.success(res.data.message);
        window.location.reload();
      }
      console.log({ data: res.data });
    } catch (error) {
      console.log(error);
      toast.error("Error Removing Object From Cart");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
              <p className="text-center">
                {cart?.length
                  ? `You Have ${cart.length} items in your cart ${
                      auth?.token ? "" : "please login to checkout !"
                    }`
                  : " Your Cart Is Empty"}
              </p>
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {cart?.map((p) => (
              <div className="row mb-2 p-3 card flex-row">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="70px"
                    height={"150px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price: {p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeCartItem(p)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <p>(Including Delivery Charge: 59/-)</p>
            <hr />
            <h4>Total : {totalPrice()} /-</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-warning"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Plase Login to checkout
                  </button>
                )}
              </div>
            )}
            <div className="mt-2">
              <button
                className="btn btn-primary"
                onClick={paymentHandler}
                disabled={!auth?.user?.address}
              >
                MAKE PAYMENT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
