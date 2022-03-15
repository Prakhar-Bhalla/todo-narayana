import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer as TodosReducer } from "../features/Todos/reducer";

const rootReducer = combineReducers({
    todosState : TodosReducer
});

export const store = createStore(rootReducer, compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__()));