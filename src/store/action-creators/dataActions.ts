import { Dispatch } from 'redux';
import axios from 'axios';
import { DataActions, DataActionTypes } from '../../types/data';

export const fetchData = (
    page: number = 1,
    size: number = 20,
    search: string = '',
    sortByName: string = '',
    sortByCode: string = ''
) => {
    return async (dispatch: Dispatch<DataActions>) => {
        try {
            dispatch({ type: DataActionTypes.FETCH_DATA });
            const response = await axios.get(`${process.env.REACT_APP_API}/orders/researches-with-prices`, {
                params: {
                    page: page,
                    size: size,
                    code: search ? search : null,
                    'sort[0].key': 'name',
                    'sort[0].value': sortByName,
                    'sort[1].key': 'code',
                    'sort[1].value': sortByCode,
                },
            });
            dispatch({
                type: DataActionTypes.FETCH_DATA_SUCCESS,
                payload: response.data,
                count: response.data,
            });
        } catch (e) {
            dispatch({
                type: DataActionTypes.FETCH_DATA_ERROR,
                payload: 'Произошла ошибка при загрузке ',
            });
        }
    };
};
