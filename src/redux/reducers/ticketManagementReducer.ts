import {
  FETCH_TICKETMANAGEMENT_REQUEST,
  FETCH_TICKETMANAGEMENT_SUCCESS,
  FETCH_TICKETMANAGEMENT_FAILURE,
} from '../actions/ticketManagementAction';
import { TicketManagementType } from '../types/ticketManagementType';

interface TicketManagementState {
  ticketsManagement: TicketManagementType[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketManagementState = {
  ticketsManagement: [],
  loading: false,
  error: null,
};

const ticketManagementReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TICKETMANAGEMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TICKETMANAGEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        ticketsManagement: action.payload,
      };
    case FETCH_TICKETMANAGEMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ticketManagementReducer;
