export const actionType = {
  SET_USER: 'SET_USER',
  SET_FOODS: 'SET_FOODS',
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

    default:
      return state;
  }
};

export default reducer;
