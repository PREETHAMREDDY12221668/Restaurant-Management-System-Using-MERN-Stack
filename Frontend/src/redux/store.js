// import {legacy_createStore as createstore,combineReducers} from "redux"
// import { cartReducer } from "./guddu/cartRedux/CartReducer"



// const rootReducer = combineReducers({cartdata:cartReducer})

// export const store = createstore(rootReducer)
import { legacy_createStore as createstore, combineReducers } from "redux";
import { cartReducer } from "./guddu/cartRedux/CartReducer";

const rootReducer = combineReducers({
  cartdata: cartReducer, // We use the cart reducer here
});

export const store = createstore(rootReducer);
