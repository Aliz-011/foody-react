import { fetchCart, fetchUser } from '../utils/fetchLocalstorageData';

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
  user: userInfo,
  foods: null,
  cartShow: false,
  cartItems: cartInfo,
};
