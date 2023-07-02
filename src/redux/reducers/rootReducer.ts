import { combineReducers } from 'redux';
import ticketManagementReducer from './ticketManagementReducer';
import ticketControlReducer from './ticketControlReducer';

const rootReducer = combineReducers({
  ticketControl: ticketControlReducer,
  ticketManagement: ticketManagementReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
