import { Dispatch } from 'redux';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { User } from '../types/userTypes';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export const fetchUsers = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_USERS_REQUEST });

    try {
      const querySnapshot = await getDocs(collection(firestore, 'ticketsmanagement'));
      const users: User[] = querySnapshot.docs.map(doc => doc.data() as User);

      dispatch({ type: FETCH_USERS_SUCCESS, payload: users });
    } catch (error: any) {
      dispatch({ type: FETCH_USERS_FAILURE, payload: error.message });
    }
  };
};

export {};
