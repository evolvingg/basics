import { FETCH_PRODUCTS ,FILTER_PRODUCTS_BY_SIZE ,SORT_PRODUCTS} from "../actions/types";

const initialState = {items: [] , filteredItems:[] , size:'' };
export default function(state = initialState , action) {
    switch(action.type) {
        case FETCH_PRODUCTS:
            return {...state , items:action.payload ,filteredItems: action.payload};
        case FILTER_PRODUCTS_BY_SIZE:
            return {...state , filteredItems: action.payload.items ,size: action.payload.size};
        case SORT_PRODUCTS:
            return {...state , filteredItems: action.payload.items ,sort: action.payload.sort};
        default:
            return state;
    }
}