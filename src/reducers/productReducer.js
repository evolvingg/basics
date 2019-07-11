import { FETCH_PRODUCTS ,FILTER_PRODUCTS_BY_SIZE ,SORT_PRODUCTS} from "../actions/types";

const initialState = {items: [] , filteredItems:[] , size:'' };
export default function(state = initialState , action) {
    switch(action.type) {
        case FETCH_PRODUCTS:
            console.log('state in red fetch:',state,action.payload);
            return {...state , items:action.payload ,filteredItems: action.payload};
        case FILTER_PRODUCTS_BY_SIZE:
                console.log('state in red filter:',state,action.payload);
            return {...state , filteredItems: action.payload.items ,size: action.payload.size};
        case SORT_PRODUCTS:
                console.log('state in red sort:',state,action.payload);
            return {...state , filteredItems: action.payload.items ,sort: action.payload.sort};
        default:
            console.log('default::',state);
            return state;
    }
}