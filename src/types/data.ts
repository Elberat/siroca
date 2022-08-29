export interface dataState {
    count: number;
    dataObjects: IData[];
    loading: boolean;
    error: null | string;
    page: number;
    size: number;
}

export interface IData {
    reactKey?: any;
    biomaterialId: null | string;
    biomaterialName: string;
    code: string;
    currencyId: number;
    currencyName: string;
    id: number;
    name: string;
    price: number;
    priceEntityId: number;
    researchId: number;
    researchName: number | string;
    researchPriceId: number;
}

export enum DataActionTypes {
    FETCH_DATA = 'FETCH_DATA',
    FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS',
    FETCH_DATA_ERROR = 'FETCH_DATA_ERROR',
}
interface FetchDataAction {
    type: DataActionTypes.FETCH_DATA;
}
interface FetchDataSuccessAction {
    type: DataActionTypes.FETCH_DATA_SUCCESS;
    payload: dataState;
}
interface FetchDataErrorAction {
    type: DataActionTypes.FETCH_DATA_ERROR;
    payload: string;
}

export type DataActions = FetchDataAction | FetchDataSuccessAction | FetchDataErrorAction;
