export const actionType = {
  SET_USER: 'SET_USER',
  SET_FOODS: 'SET_FOODS',
  SET_CART_SHOW: 'SET_CART_SHOW',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionType.SET_FOODS:
      return {
        ...state,
        foods: action.foods,
      };
    case actionType.SET_CART_ITEMS:
      return {
        ...state,
        cartItems: action.cartItems,
      };
    case actionType.SET_CART_SHOW:
      return {
        ...state,
        cartShow: action.cartShow,
      };

    default:
      return state;
  }
};

export default reducer;
