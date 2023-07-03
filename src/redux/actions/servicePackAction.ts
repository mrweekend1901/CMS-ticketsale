import { Dispatch } from 'redux';
import { collection, getDocs, addDoc, updateDoc, doc, query, where } from 'firebase/firestore';
import { firestore } from '../../firebase/firebase';
import { ServicePackType } from '../types/servicePackType';

export const FETCH_SERVICEPACK_REQUEST = 'FETCH_SERVICEPACK_REQUEST';
export const FETCH_SERVICEPACK_SUCCESS = 'FETCH_SERVICEPACK_SUCCESS';
export const FETCH_SERVICEPACK_FAILURE = 'FETCH_SERVICEPACK_FAILURE';
export const ADD_SERVICEPACK_REQUEST = 'ADD_SERVICEPACK_REQUEST';
export const ADD_SERVICEPACK_SUCCESS = 'ADD_SERVICEPACK_SUCCESS';
export const ADD_SERVICEPACK_FAILURE = 'ADD_SERVICEPACK_FAILURE';
export const UPDATE_SERVICEPACK_REQUEST = 'UPDATE_SERVICEPACK_REQUEST';
export const UPDATE_SERVICEPACK_SUCCESS = 'UPDATE_SERVICEPACK_SUCCESS';
export const UPDATE_SERVICEPACK_FAILURE = 'UPDATE_SERVICEPACK_FAILURE';

export const fetchServicePack = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: FETCH_SERVICEPACK_REQUEST });

    try {
      const querySnapshot = await getDocs(collection(firestore, 'servicepack'));
      const servicePacks: ServicePackType[] = querySnapshot.docs.map(
        doc => doc.data() as ServicePackType,
      );

      dispatch({ type: FETCH_SERVICEPACK_SUCCESS, payload: servicePacks });
    } catch (error: any) {
      dispatch({ type: FETCH_SERVICEPACK_FAILURE, payload: error.message });
    }
  };
};

export const addServicePack = (servicePack: ServicePackType) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: ADD_SERVICEPACK_REQUEST });

    try {
      const docRef = await addDoc(collection(firestore, 'servicepack'), servicePack);
      const addedServicePack = { ...servicePack, id: docRef.id };

      dispatch({ type: ADD_SERVICEPACK_SUCCESS, payload: addedServicePack });
    } catch (error: any) {
      dispatch({ type: ADD_SERVICEPACK_FAILURE, payload: error.message });
    }
  };
};

export const updateServicePack = (servicePack: ServicePackType) => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: UPDATE_SERVICEPACK_REQUEST });

    try {
      const { packID } = servicePack;

      // Tạo truy vấn để tìm document theo deviceName
      const q = query(collection(firestore, 'servicepack'), where('packID', '==', packID));

      // Thực hiện truy vấn
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Lấy document đầu tiên tìm thấy
        const documentSnapshot = querySnapshot.docs[0];
        const documentRef = doc(firestore, 'servicepack', documentSnapshot.id);

        // Cập nhật document
        await updateDoc(documentRef, {
          packID: servicePack.packID,
          packName: servicePack.packName,
          packStatus: servicePack.packStatus,
          dayMFG: servicePack.dayMFG,
          dayEXP: servicePack.dayEXP,
          timeMFG: servicePack.timeMFG,
          timeEXP: servicePack.timeEXP,
          price: servicePack.price,
          priceCombo: servicePack.priceCombo,
          ticketNum: servicePack.ticketNum,
        }); // Thay đổi thành giá trị mới cần cập nhật
      }

      dispatch({ type: UPDATE_SERVICEPACK_SUCCESS, payload: servicePack });
    } catch (error: any) {
      dispatch({ type: UPDATE_SERVICEPACK_FAILURE, payload: error.message });
    }
  };
};
