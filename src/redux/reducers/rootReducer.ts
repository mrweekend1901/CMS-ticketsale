import { combineReducers } from 'redux';
import userReducer from './userReducer';
import ticketManagementReducer from './ticketManagementReducer';

const rootReducer = combineReducers({
  user: userReducer,
  ticketManagement: ticketManagementReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
