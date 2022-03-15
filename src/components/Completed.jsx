import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, getData, deleteTask } from "../features/Todos/actions";
import "./Todos.css";

export const Completed = () => {
    const [isUpdated, setIsUpdated] = useState(false);
    const [flag,setFlag] = useState(false);
    const [isComplete, setIsComplete] = useState();
    const [id, setId] = useState();
    const {loading, todos, error} = useSelector(({todosState}) => {return {...todosState}}, function(prev,curr) {
        if(prev.loading === curr.loading && prev.error === curr.error)
        {
            if(prev.todos.length === curr.todos.length)
            {
                for(let i = 0; i<prev.todos.length; i++)
                {
                    if(prev.todos[i] !== curr.todos[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    });

    const dispatch = useDispatch();

    const handleStatus = () => {
        dispatch(changeStatus(id)); 
        setIsUpdated(false)
    }
    
    const handleDeletion = () => {
        dispatch(deleteTask(id)); 
        setIsUpdated(false)
    }
    const openDiv = (el) => {
        setIsUpdated(true)
        setId(el.id);
        setIsComplete(el.status);
    }

    useEffect(() => {
        dispatch(getData());
    },[]);

    let completedTodos = todos.filter(t => {
        return t.status
    })

    return loading ? (<div>Loading....</div>) : error ? (<div>Something went wrong!</div>) : (<div id="container">
    <div id="taskBox">
    {completedTodos.map((el) => {
        return <div key={el.id} className="taskCard">
        <span style={{color : "crimson"}}>{el.Task}</span>
        <br/>
        <button disabled={isUpdated} className="cardButton" onClick={() => {openDiv(el)}}>
        Change Status
        </button> 
        {isUpdated && (<div className="changeStatus">
        <button onClick={handleStatus}>Pending</button> 
        <button onClick={handleDeletion}>Delete</button></div>)}
        </div>
    })}
    </div>

    </div>)
}