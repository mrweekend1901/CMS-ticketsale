import { Dispatch } from 'redux';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { TicketControlType } from '../types/ticketControlType';

export const FETCH_TICKETCONTROL_REQUEST = 'FETCH_TICKETCONTROL_REQUEST';
export const FETCH_TICKETCONTROL_SUCCESS = 'FETCH_TICKETCONTROL_SUCCESS';
export const FETCH_TICKETCONTROL_FAILURE = 'FETCH_TICKETCONTROL_FAILURE';

export const fetchTicketControl = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_TICKETCONTROL_REQUEST });

    try {
      const querySnapshot = await getDocs(collection(firestore, 'ticketscontrol'));
      const ticketsControl: TicketControlType[] = querySnapshot.docs.map(
        doc => doc.data() as TicketControlType,
      );

      dispatch({ type: FETCH_TICKETCONTROL_SUCCESS, payload: ticketsControl });
    } catch (error: any) {
      dispatch({ type: FETCH_TICKETCONTROL_FAILURE, payload: error.message });
    }
  };
};

export {};
