import { ADD_TODO_SUCCESS, CHANGE_STATUS, GET_TODO_SUCCESS, REMOVE_TODO } from "./actionType.js"

 export const addTodoSuccess = (data) => ({
    type : ADD_TODO_SUCCESS, 
    payload : data
 });

 export const getTodoSuccess = (data) => ({
    type : GET_TODO_SUCCESS, 
    payload : data
 });
 
 export const removeTodo = (id) => ({
     type : REMOVE_TODO, 
     payload : id
  });

  export const getData = () => async(dispatch) => {
        dispatch(getTodoSuccess());
  }

  export const addData = (text) => async(dispatch) => {
        dispatch(addTodoSuccess(text));
        dispatch(getData());
  }

  export const changeStatus = (id) => ({
    type : CHANGE_STATUS, 
    payload : id
  })

  export const deleteTask = (id) => ({
    type : REMOVE_TODO, 
    payload : id
  })