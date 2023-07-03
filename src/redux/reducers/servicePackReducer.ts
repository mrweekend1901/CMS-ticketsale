import {
  FETCH_SERVICEPACK_REQUEST,
  FETCH_SERVICEPACK_SUCCESS,
  FETCH_SERVICEPACK_FAILURE,
  ADD_SERVICEPACK_FAILURE,
  ADD_SERVICEPACK_REQUEST,
  ADD_SERVICEPACK_SUCCESS,
  UPDATE_SERVICEPACK_FAILURE,
  UPDATE_SERVICEPACK_REQUEST,
  UPDATE_SERVICEPACK_SUCCESS,
} from '../actions/servicePackAction';
import { ServicePackType } from '../types/servicePackType';

interface ServicePackState {
  servicePacks: ServicePackType[];
  loading: boolean;
  error: string | null;
}

const initialState: ServicePackState = {
  servicePacks: [],
  loading: false,
  error: null,
};

const servicePackReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case FETCH_SERVICEPACK_REQUEST:
    case ADD_SERVICEPACK_REQUEST:
    case UPDATE_SERVICEPACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_SERVICEPACK_SUCCESS:
      return {
        ...state,
        loading: false,
        servicePacks: action.payload,
      };

    case ADD_SERVICEPACK_SUCCESS:
      return {
        ...state,
        servicePacks: [...state.servicePacks, action.payload],
        loading: false,
        error: null,
      };

    case UPDATE_SERVICEPACK_SUCCESS:
      // Tìm và cập nhật service pack đã được chỉnh sửa
      const updatedServicePacks = state.servicePacks.map(servicePack =>
        servicePack.packID === action.payload.packID ? action.payload : servicePack,
      );
      return {
        ...state,
        loading: false,
        servicePacks: updatedServicePacks,
        error: null,
      };

    case FETCH_SERVICEPACK_FAILURE:
    case ADD_SERVICEPACK_FAILURE:
    case UPDATE_SERVICEPACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default servicePackReducer;
