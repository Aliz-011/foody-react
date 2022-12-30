import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
import { database } from '../firebase';

export const saveItems = async (data) => {
  await setDoc(doc(database, 'food', `${Date.now()}`), data, { merge: true });
};

export const getAllFoods = async () => {
  const foods = await getDocs(
    query(collection(database, 'food'), orderBy('id', 'desc'))
  );
  return foods.docs.map((doc) => doc.data());
};
