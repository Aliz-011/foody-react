import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardBackspace } from 'react-icons/md';
import { RiRefreshFill } from 'react-icons/ri';
import { motion } from 'framer-motion';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import EmptyCart from '../img/emptyCart.svg';
import CartItem from './CartItem';
import Base64 from 'base-64';
import { toast, ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';

const CartContainer = () => {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [flag, setFlag] = useState(1);
  const [tot, setTot] = useState(0);

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag]);

  const createToken = async () => {
    const res = await fetch('http://localhost:3080/api/payment', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: new Base64.encode(
          'SB-Mid-server-YB3Miv4SkM_iDrrfq_TvQVyA' + ':'
        ),
      },
      body: JSON.stringify({
        transaction_details: {
          order_id: 'dinistore-id-' + Math.round(new Date().getTime() / 1000),
          gross_amount: tot + 15000,
        },
        item_details: {
          id: Date.now() + Math.round(new Date().getTime() / 1000),
          price: tot + 15000,
          quantity: 1,
          name: 'your oder',
          merchant_name: 'Dini Abhsari',
        },
        customer_details: {
          first_name: user.displayName,
          email: user.email,
        },
        enabled_payments: [
          'credit_card',
          'cimb_clicks',
          'bca_klikbca',
          'bca_klikpay',
          'bri_epay',
          'echannel',
          'permata_va',
          'bca_va',
          'bni_va',
          'bri_va',
          'other_va',
          'gopay',
          'indomaret',
          'danamon_online',
          'akulaku',
          'shopeepay',
          'kredivo',
          'uob_ezpay',
        ],
      }),
    });
    return res.json();
  };

  const checkout = async () => {
    const data = await createToken();
    let tokenTransaction = data.token;
    snap.pay(tokenTransaction, {
      onSuccess: async function (result) {
        toast.success(result.status_message);
        localStorage.removeItem('cartItems');
      },
      onPending: function (result) {
        toast.info(result.status_message);
      },
      onError: function (result) {
        toast.error(result.status_message);
      },
      onClose: function () {
        toast.warning('Ada yang ingin kamu tambahkan?');
      },
      gopayMode: 'qr',
    });
  };

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: [],
    });

    localStorage.setItem('cartItems', JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[100]"
    >
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          <MdOutlineKeyboardBackspace className="text-textColor text-3xl" />
        </motion.div>
        <p className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p
          onClick={clearCart}
          whileTap={{ scale: 0.75 }}
          className="text-textColor text-lg font-semibold flex items-center justify-center py-1 px-2 gap-2 bg-gray-100 rounded-md cursor-pointer"
        >
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartItems &&
              cartItems.map((item) => (
                <CartItem
                  item={item}
                  key={item.id}
                  setFlag={setFlag}
                  flag={flag}
                />
              ))}
          </div>

          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Subtotal</p>
              <p className="text-gray-400 text-lg">Rp. {tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delivery</p>
              <p className="text-gray-400 text-lg">Rp.15000</p>
            </div>

            <div className="w-full border-b border-gray-600 my-2" />

            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-xl font-semibold">Total</p>
              <p className="text-gray-400 text-xl font-semibold">
                Rp.{tot + 15000}
              </p>
            </div>

            {user ? (
              <motion.button
                onClick={checkout}
                whileTap={{ scale: 0.8 }}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Checkout
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                className="w-full p-2 rounded-full bg-gradient-to-tr from-blue-300 to-blue-600 text-gray-50 text-lg my-2 hover:shadow-lg"
              >
                Login untuk checkout
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w-300" alt="" />
          <p className="text-xl text-textColor font-semibold">Go shopping</p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
