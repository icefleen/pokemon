import { mainReducer } from "./mainPage/mainReducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({ mainState: mainReducer });

type RootReducer = typeof rootReducer;
export type RootState = ReturnType<RootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunk));

console.log(store.getState());
