import { DataActions, DataActionTypes, dataState } from '../../types/data';

const initialState: dataState = {
    dataObjects: [],
    page: 1,
    error: null,
    size: 20,
    loading: false,
    count: 1,
};

export const dataReducer = (state = initialState, action: DataActions): dataState => {
    switch (action.type) {
        case DataActionTypes.FETCH_DATA:
            return { ...state, loading: true };
        case DataActionTypes.FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                dataObjects: action.payload.dataObjects,
                count: action.payload.count,
            };
        case DataActionTypes.FETCH_DATA_ERROR:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};
