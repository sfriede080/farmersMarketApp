
import { getProducts, deleteProductByID } from "../api/services/productService";


export default function productReducer(state, action) {
    
    switch(action.type) {
        case "ADD_PRODUCT": 
            return {...state, products: [...state?.products || [], action.payload]};
        case "UPDATE_PRODUCT": 
            return {
                ...state,
                 products: state.products.map( product => 
                    product.id === action.payload.id ? action.payload : product
            )};
        case "DELETE_PRODUCT":
            deleteProductByID(action.payload.id).then((result) => {
                return {
                    ...state,
                    products: state.products.filter( product => 
                        product.id !== action.payload.id
                )};
            })
            .catch(err => {
                console.log(err);
            });
            
        case "SET_EDITING_PRODUCT":
            return {
                ...state, editingTicket: action.payload
            }; 
        case "CLEAR_EDITING_PRODUCT":
            return {
                ...state, editingTicket: null
            }; 
        default:
            return state;

    }

}
