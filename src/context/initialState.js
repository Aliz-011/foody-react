import { fetchUser } from '../utils/fetchLocalstorageData';

const userInfo = fetchUser();

export const initialState = {
  user: userInfo,
};
