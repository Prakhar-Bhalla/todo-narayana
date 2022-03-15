import {ADD_TODO_SUCCESS, CHANGE_STATUS, GET_TODO_SUCCESS, REMOVE_TODO} from "./actionType.js"

export const reducer = (state = {todos : []}, {type,payload}) => {
    switch(type) {
        case ADD_TODO_SUCCESS : return {...state, todos : [...state?.todos, payload]}
        case GET_TODO_SUCCESS : return state
        case REMOVE_TODO : 
        let todo = state.todos.filter(t => {
            return t.id !== payload
        })
        return {todos : todo}
        case CHANGE_STATUS : 
        let to = state.todos.map(t => {
            if(t.id === payload)
            {
                let x = t.status;
                return {...t, status : !x}
            }
            return t;
        })
        return {todos : to};
        default : return state
    }
}