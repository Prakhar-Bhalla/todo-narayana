import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addData, changeStatus, getData, deleteTask } from "../features/Todos/actions";
import { nanoid } from 'nanoid'
import "./Todos.css";

export const Todos = () => {
    const [text,setText] = useState({Task : "", date : "", time : ""});
    const [isUpdated, setIsUpdated] = useState(false);
    const [flag,setFlag] = useState(false);
    const [isComplete, setIsComplete] = useState();
    const [id, setId] = useState();
    const {todos} = useSelector(({todosState}) => {return {...todosState}}, function(prev,curr) {
            if(prev?.todos?.length === curr?.todos?.length)
            {
                for(let i = 0; i<prev?.todos?.length; i++)
                {
                    if(prev?.todos[i] !== curr?.todos[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        return false;
    });

    const dispatch = useDispatch();

    const handleChange = (event) => {
        let {name, value} = event.target;
        setText({
            ...text,
            [name] : value
        });
    }

    const addTodosList = () => {
       if(text.Task.length !== 0 && text.date.length !== 0 && text.time.length !== 0)
       {
           dispatch(addData({...text, id : nanoid(6)}));
           setText({Task : "", date : "", time : ""});
           if(flag)
           {
            setFlag(false);
           }
       }
       else
       {
           if(!flag)
           {
            setFlag(true);
           }
       }
    }

    const sendToForm = (el) => {
        text.Task = el.Task;
        text.date = el.date;
        text.time = el.time;
        dispatch(deleteTask(el.id)); 
        setIsUpdated(false)
    }

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

    let activeTodos = todos?.filter(t => {
        return !t.status
    })

    return (<div id="container">
    {flag && <p style={{color : "red"}}>Input feilds can't be empty</p>} 
    <input disabled={isUpdated} value={text.Task} name="Task" placeholder="Enter task" onChange={handleChange}/>
    <input disabled={isUpdated} value={text.date} type="date" name="date" onChange={handleChange}/>
    <input disabled={isUpdated} value={text.time} type="time" name="time" onChange={handleChange}/>
    <button disabled={isUpdated} id="addme" onClick={addTodosList}>ADD TASK</button>
    
    <div id="taskBox">
    {activeTodos?.map((el) => {
        return <div key={el.id} className="taskCard">
        <span style={{color : "crimson"}}>{el.Task}</span>
        <br/>
        <span>Scheduled date : <span style={{color : "crimson"}}>{el.date}</span></span>
        <br/>
        <span>Scheduled time : <span style={{color : "crimson"}}>{el.time}</span></span>
        <br/>
        <button disabled={isUpdated} className="cardButton" onClick={() => {openDiv(el)}}>
        Change Status
        </button> 
        <button disabled={isUpdated} className="cardButton" onClick={() => {sendToForm(el)}}>Edit Task</button>
        {isUpdated && (<div className="changeStatus">
        <button onClick={handleStatus}>Completed</button> 
        <button onClick={handleDeletion}>Delete</button></div>)}
        </div>
    })}
    </div>
    </div>)
}