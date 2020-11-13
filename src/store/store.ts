import { homeReducer } from "./homePage/homeReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ homeState: homeReducer });

type RootReducer = typeof rootReducer;
export type RootState = ReturnType<RootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

console.log(store.getState());
