import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as taskActions from '../../store/tasks';
import { useParams } from "react-router-dom";


function EditTaskCard() {



    const dispatch = useDispatch();

    const taskIn = useSelector((state) => state.tasks.currentTask);
    let task;
    if (taskIn.length) {
        task = taskIn[0]
    }

    console.log('FromTaskTheNameIs:', task?.name);

    let [id, setId] = useState(task?.id);
    let [list_id, setListId] = useState(task?.list_id);
    let [name, setName] = useState(task?.name);
    let [description, setDescription] = useState(task?.description);
    let [due_date, setDueDate] = useState(task?.due_date);
    let [completed, setCompleted] = useState(task?.completed);
    let [priority, setPriority] = useState(task?.priority);
    let [isChecked, setIsChecked] = useState(task?.completed);


    useEffect(() => {
        setId(task?.id)
        setListId(task?.list_id)
        setName(task?.name)
        setDescription(task?.description)
        setDueDate(task?.due_date)
        setCompleted(task?.completed)
        setPriority(task?.priority)
        setIsChecked(task?.completed)
        setErrors([]);
    }, [task?.id, task?.list_id, task?.name, task?.description, task?.due_date, task?.completed, task?.priority]);


    // let task;

    // if (taskIn) {
    //     console.log(taskIn.length)
    //     if (taskIn.length) {
    //         task = taskIn[0]
    //         console.log("taskName:", taskIn[0].name)
    //     }

    // }

    // console.log('THIS TASK NOW:', task);

    // let id;
    // let list_id;
    // let name;
    // let description;
    // let due_date;
    // let completed;
    // let priority;




    // useEffect(() => {
    //     if (taskIn.length) {
    //         setId(task.id)
    //         setListId(task.list_id)
    //         setName(task.name)
    //     }
    // }, []);



    // const [id, setId] = useState('');
    // const [list_id, setListId] = useState(null);
    // const [name, setName] = useState('');
    // const [description, setDescription] = useState('');
    // const [due_date, setDueDate] = useState('');
    // const [completed, setCompleted] = useState(null);
    // const [priority, setPriority] = useState(null);

    // useEffect(() => {
    //     // setId(id || task.id)
    //     setListId(list_id || task.list_id)
    //     setName(name || task.name)
    //     setDescription(description || task.description)
    //     setDueDate(due_date || task.due_date)
    //     setCompleted(completed || task.completed)
    //     setPriority(priority || task.priority)
    // }, [id]);

    // let [isChecked, setIsChecked] = useState(false);

    let [errors, setErrors] = useState([]);


    const { listId } = useParams();

    // =========


    useEffect(() => {
        dispatch(taskActions.getListTasksThunk(listId));
    }, [dispatch, listId]);

    const allLists = useSelector((state) => state.lists.allLists);
    const arrLists = Object.values(allLists);

    // =========

    function handleCloseRight() {

        window.showHideTaskbar('hide')
        // console.log('THEID', id)
    }

    // =========

    const handleCompleted = (e) => {
        setIsChecked(!isChecked);
        setCompleted(!isChecked);
    };


    const handleEditTask = async (e) => {
        e.preventDefault();

        const data = await dispatch(taskActions.editTaskThunk(id, name, list_id, description, due_date, completed, priority));
        if (data) {
            setErrors(data);
            return
        }
    };

    const handleDeleteTask = async (e) => {
        e.preventDefault();

        const data = await dispatch(taskActions.deleteTaskThunk(id));


        if (data) {
            setErrors(data);
            return
        }

        window.showHideTaskbar('hide')
    };

    // =========


    return (
        <>


            <button style={{ float: "right" }} onClick={() => { handleCloseRight() }}>X</button>
            Task ID: {id}

            <form onSubmit={handleEditTask}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    {errors.length > 0 &&
                        <div style={{ paddingTop: '20px', paddingLeft: '20px', color: 'red', display: 'block', fontSize: '14px' }}>
                            {errors.map((error, idx) => <li key={idx}>{error.substr(7)}</li>)}
                        </div >
                    }

                    <input className="popup-input-field" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                    <textarea className="popup-input-field" type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    <input className="popup-input-field" type="date" value={due_date} onChange={(e) => setDueDate(e.target.value)} />

                    <select value={list_id} onChange={(e) => setListId(e.target.value)}>
                        {arrLists?.map(({ id, name }) => (

                            <option key={id} value={id}>{name}</option>

                        ))
                        }
                    </select>


                    {/* <input className="popup-input-field" type="checkbox" checked={completed !== null ? completed : thisTask[0].completed} value={completed ? completed : thisTask[0].completed} onChange={(e) => setCompleted(e.target.value)} /> */}
                    <input className="popup-input-field" type="checkbox" checked={isChecked} onChange={(e) => handleCompleted(e.target.value)} />



                    <select value={priority} onChange={(e) => setPriority(e.target.value)}>


                        <option key={1} value={1}>High</option>
                        <option key={2} value={2}>Medium</option>
                        <option key={3} value={3}>Low</option>


                    </select>



                    <button className="popup-input-submit" type="submit">Change Task</button>

                </div>
            </form>

            <form onSubmit={handleDeleteTask}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

                    <button className="popup-input-submit" type="submit">Delete Task</button>

                </div>
            </form>

            {/* <div>{id}</div>
            <div>{name}</div>
            <div>{description}</div>
            <div>{due_date}</div>
            <div>{priority}</div>
            <div>{`${completed}`}</div>
            <div>{list_id}</div> */}







        </>
    );
}

export default EditTaskCard;
