import { Dispatch } from 'redux';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { TicketManagementType } from '../types/ticketManagementType';

export const FETCH_TICKETMANAGEMENT_REQUEST = 'FETCH_TICKETMANAGEMENT_REQUEST';
export const FETCH_TICKETMANAGEMENT_SUCCESS = 'FETCH_TICKETMANAGEMENT_SUCCESS';
export const FETCH_TICKETMANAGEMENT_FAILURE = 'FETCH_TICKETMANAGEMENT_FAILURE';

export const fetchTicketManagement = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_TICKETMANAGEMENT_REQUEST });

    try {
      const querySnapshot = await getDocs(collection(firestore, 'ticketsmanagement'));
      const ticketsManagement: TicketManagementType[] = querySnapshot.docs.map(
        doc => doc.data() as TicketManagementType,
      );

      dispatch({ type: FETCH_TICKETMANAGEMENT_SUCCESS, payload: ticketsManagement });
    } catch (error: any) {
      dispatch({ type: FETCH_TICKETMANAGEMENT_FAILURE, payload: error.message });
    }
  };
};

export {};
