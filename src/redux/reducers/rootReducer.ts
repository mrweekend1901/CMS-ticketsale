import { combineReducers } from 'redux';
import ticketManagementReducer from './ticketManagementReducer';
import ticketControlReducer from './ticketControlReducer';
import servicePackReducer from './servicePackReducer';

const rootReducer = combineReducers({
  ticketControl: ticketControlReducer,
  ticketManagement: ticketManagementReducer,
  servicePack: servicePackReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
