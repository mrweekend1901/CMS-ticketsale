import {
  FETCH_TICKETCONTROL_REQUEST,
  FETCH_TICKETCONTROL_SUCCESS,
  FETCH_TICKETCONTROL_FAILURE,
} from '../actions/ticketControlAction';
import { TicketControlType } from '../types/ticketControlType';

interface TicketControlState {
  ticketsControl: TicketControlType[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketControlState = {
  ticketsControl: [],
  loading: false,
  error: null,
};

const ticketControlReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_TICKETCONTROL_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_TICKETCONTROL_SUCCESS:
      return {
        ...state,
        loading: false,
        ticketsControl: action.payload,
      };
    case FETCH_TICKETCONTROL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ticketControlReducer;
